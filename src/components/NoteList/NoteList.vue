<template>
  <div class='NoteList' v-if="haveNotes || emptyMessage">
    <h2>{{ title }}</h2>
    <show-message v-bind:message="message"></show-message>
    <note-item v-if="haveNotes" v-for='note in notes' v-bind:note='note' v-bind:key='note.id'></note-item>
    <div v-if="!haveNotes">{{ emptyMessage }}</div>
  </div>
</template>

<script type="text/babel">
  import NoteItem from '@src/components/NoteItem/NoteItem';
  import EventsBus from '@src/services/EventsBus';
  import MessageFactory from '@src/components/ShowMessage/MessageFactory';
  import ShowMessage from '@src/components/ShowMessage/ShowMessage';
  import Axios from 'axios';

  export default {
    name: 'NoteList',
    props: [
      'notes',
      'title',
      'emptyMessage'
    ],
    data() {
      return {
        message: undefined
      }
    },
    mounted () {

      let self = this;

      EventsBus.$on('NOTE_DELETED', function (note) {
        console.log("NoteList: event received", note);
        self.message = MessageFactory.getMessage("Note '" + note.title + "' removed.", MessageFactory.MESSAGE_CLASSES.success);
      });

    },
    computed: {
      haveNotes: function() {
        return this.notes.length > 0;
      }
    },
    methods: {},
    components: {NoteItem, ShowMessage}
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
