<template>
  <div class='Notebook'>

    <div class="loader" :class="state"></div>

    <div class='Notebook__sidebar'>
      <overview-notes v-bind:notes="notesToCalendar"></overview-notes>
      <add-note></add-note>
    </div>

    <div class='Notebook__content'>
      <note-list v-bind:notes='notes' :title="'Your Notes:'" :empty-message="'You don\'t have notes.'"></note-list>
      <note-list v-bind:notes='notesExpired' :title="'Expired Notes:'"></note-list>
    </div>

  </div>
</template>

<script type="text/babel">
  import NoteList from '@src/components/NoteList/NoteList';
  import OverviewNotes from '@src/components/OverviewNotes/OverviewNotes';
  import AddNote from '@src/components/AddNote/AddNote';
  import EventsBus from '@src/services/EventsBus';
  import Entities from '@src/entities.js';
  import Axios from 'axios';

  export default {
    name: 'Notebook',
    data () {
      return {
        state: 'loading',
        notes: [],
        notesExpired: [],
        notesToCalendar: []
      }
    },
    components: {OverviewNotes, NoteList, AddNote},
    mounted: function () {

      let self = this;

      EventsBus.$on(
        [
          Entities.EventsNames.NOTE_SAVED,
          Entities.EventsNames.NOTE_DELETED
        ], function (note, message) {
          self.getNotes(note.expired);
        });

      self.getAllNotes();

    },
    methods: {
      calculateCalendarNotes(notes) {

        let notesToCalendar = [];

        notes.forEach((note) => {
          if (note.date) {
            notesToCalendar.push(note.date);
          }
        });

        this.notesToCalendar = notesToCalendar.slice(0);
        console.log("Notebook: Notes to calendar calculated.", this.notesToCalendar);
        EventsBus.$emit(Entities.EventsNames.NOTES_LOADED);
        this.state = 'ready';

      },
      getAllNotes() {

        let self = this;
        self.state = 'loading';
        let httpRequests = [];
        httpRequests.push(Axios.get("http://localhost:8080/notes/expired/false"));
        httpRequests.push(Axios.get("http://localhost:8080/notes/expired/true"));

        Axios.all(httpRequests)
          .then(Axios.spread(function (notes, notesExpired) {

            self.notes = notes.data;
            self.notesExpired = notesExpired.data;
            console.log("Notebook: Data retrieved correctly.");

            self.calculateCalendarNotes(self.notes.concat(self.notesExpired));

          }))
          .catch((e) => {
            console.log(e);
          });

      },
      getNotes(expired) {

        let self = this;

        Axios.get("http://localhost:8080/notes/expired/" + expired)
          .then(function (notes) {

            if (expired) {
              self.notesExpired = notes.data;
            } else {
              self.notes = notes.data;
            }

            console.log("Notebook: Data retrieved correctly.");

            self.calculateCalendarNotes(self.notes.concat(self.notesExpired));

          })
          .catch((e) => {
            console.log(e);
          });

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">

  @import "../../style/main";

  .Notebook {
    display: flex;

    &__sidebar {
      flex-grow: 0;
      flex-direction: column;
      margin-right: 10px;
      width: 318px;
    }

    &__content {
      flex-grow: 1;
    }

  }

</style>
