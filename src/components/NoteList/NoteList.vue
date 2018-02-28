<template>
  <div class='NoteList' v-if="haveNotes || emptyMessage">
    <h2>{{ title }}</h2>
    <note-item v-if="haveNotes" v-for='note in calculatedNotes' v-bind:note='note' v-bind:key='note.id'></note-item>
    <div v-if="!haveNotes">{{ emptyMessage }}</div>
  </div>
</template>

<script type="text/babel">
import NoteItem from '@/components/NoteItem/NoteItem'
export default {
  name: 'NoteList',
  props: [
    'notes',
    'expired',
    'title',
    'emptyMessage'
  ],
  computed: {
      calculatedNotes: function() {
        return this.filterNoteList(this.expired);
      },
      haveNotes:  function() {
        return this.calculatedNotes.length > 0;
      }
  },
  methods: {
    filterNoteList: function (expired) {

      console.log("filterNoteList called");

      if (expired === undefined) {
        return this.notes;
      }

      return this.notes.filter(function (note) {
        return note.expired === expired;
      });

    }
  },
  components: { NoteItem }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">

  @import "../../style/colors";

  .NoteList {

    h2 {
      border-bottom: 1px solid $border-color;
    }

  }

</style>
