<template>
  <div class='NoteList'>
    <note-item v-if="haveNotes" v-for='note in calculatedNotes' v-bind:note='note' v-bind:key='note.id'></note-item>
    <div v-if="!haveNotes">No have notes.</div>
  </div>
</template>

<script type="text/babel">
import NoteItem from '@/components/NoteItem/NoteItem'
export default {
  name: 'NoteList',
  props: ['notes', 'expired'],
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

  .NoteList {

  }

</style>
