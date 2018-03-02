<template>
  <div class='NoteList' v-if="haveNotes || emptyMessage">
    <h2>{{ title }}</h2>
    <note-item v-if="haveNotes" v-for='note in notes' v-bind:note='note' v-bind:key='note.id'></note-item>
    <div v-if="!haveNotes">{{ emptyMessage }}</div>
  </div>
</template>

<script type="text/babel">
import NoteItem from '@/components/NoteItem/NoteItem';
import EventsBus from '@/services/EventsBus';
import Axios from 'axios';

export default {
  name: 'NoteList',
  props: [
    'expired',
    'title',
    'emptyMessage'
  ],
  data() {
    return {
      notes: []
    }
  },
  mounted () {

    EventsBus.$on('NOTE_SAVED', (note) => {
      if (note.expired === this.expired) {
        console.log("NoteList: event received",  note);
        this.getNotes(this.expired);
      }
    });

    EventsBus.$on('NOTE_DELETED', (note) => {
      if (note.expired === this.expired) {
        console.log("NoteList: event received",  note);
        this.getNotes(this.expired);
      }
    });

    this.getNotes(this.expired);

  },
  computed: {
      haveNotes:  function() {
        return this.notes.length > 0;
      }
  },
  methods: {
    getNotes(expired) {

      Axios.get("http://localhost:8080/notes/expired/" + expired)
        .then((response) => {
          this.notes = response.data;
          console.log("NotebookApp: Data retrieved correctly.");
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
