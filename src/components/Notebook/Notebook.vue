<template>
  <div class='Notebook'>

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

      this.getNotes();

    },
    methods: {
      getNotes(expired) {

        this.notesToCalendar = [];

        let httpRequests = [];
        if (!!expired) {
          httpRequests.push(Axios.get("http://localhost:8080/notes/expired/" + expired));
        } else {
          httpRequests.push(Axios.get("http://localhost:8080/notes/expired/false"));
          httpRequests.push(Axios.get("http://localhost:8080/notes/expired/true"));
        }

        let self = this;

        Axios.all(httpRequests)
          .then(Axios.spread(function (notes, notesExpired) {

            if (!!expired) {

              if (expired) {
                self.notesExpired = notes.data;
              } else {
                self.notes = notes.data;
              }

            } else {
              self.notes = notes.data;
              self.notesExpired = notesExpired.data;
            }

            console.log("Notebook: Data retrieved correctly.");

            self.notes.concat(self.notesExpired).forEach(function (note) {
              if (note.date) {
                self.notesToCalendar.push(note.date);
              }
            });

            console.log("Notebook: Notes to calendar calculated.");
            EventsBus.$emit(Entities.EventsNames.NOTES_LOADED);

          }))
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
    }

    &__content {
      flex-grow: 1;
    }

  }

</style>
