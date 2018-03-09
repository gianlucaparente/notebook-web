<template>
  <div class='NoteList' v-if="haveNotes || emptyMessage">
    <div class="loader" :class="state"></div>
    <h2>{{ title }}</h2>
    <note-item v-if="haveNotes" v-for='note in notes' v-bind:note='note' v-bind:key='note.id'></note-item>
    <div v-if="!haveNotes">{{ emptyMessage }}</div>
  </div>
</template>

<script type="text/babel">
  import NoteItem from '@src/components/NoteItem/NoteItem';
  import EventsBus from '@src/services/EventsBus';
  import Axios from 'axios';
  import Entities from '@src/entities';

  export default {
    name: 'NoteList',
    props: [
      'expired',
      'title',
      'emptyMessage'
    ],
    data() {
      return {
        notes: [],
        state: 'loading'
      }
    },
    mounted () {

      let self = this;

      EventsBus.$on(
        [
          Entities.EventsNames.NOTE_SAVED,
          Entities.EventsNames.NOTE_DELETED
        ], function (note, message) {
          if (self.expired === note.expired) {
            self.getNotes(self.expired);
          }
        });

      EventsBus.$on(Entities.EventsNames.DATE_SELECTED, function (dateSelected) {
        self.getNotes(self.expired, dateSelected);
      });

      this.getNotes(this.expired);

    },
    computed: {
      haveNotes: function() {
        return this.notes.length > 0;
      }
    },
    methods: {
      getNotes(expired, dateSelected) {

        let self = this;
        self.state = 'loading';

        let params = "";

        if (expired !== undefined) {
          params += "/expired/" + expired;
        }

        if (dateSelected) {
          params += "/date/" + new Date(dateSelected.getTime() - (dateSelected.getTimezoneOffset() * 60000)).toISOString();
        }

        Axios.get("http://localhost:8080/notes" + params)
          .then(function (notes) {

            self.notes = notes.data;
            console.log("Notebook: Notes retrieved correctly.", notes);
            self.state = 'ready';

          })
          .catch((e) => {
            console.log(e);
          });

      }
    },
    components: { NoteItem }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">

  @import "../../style/main";

  .NoteList {

    h2 {
      border-bottom: 1px solid $grey;
    }

  }

</style>
