<template>
  <div class='NoteList'>
    <note-item v-for='note in filterNoteList(expired)' v-bind:note='note' v-bind:key='note.id'></note-item>
  </div>
</template>

<script>
import NoteItem from '@/components/NoteItem/NoteItem'
export default {
  name: 'NoteList',
  props: ['notes', 'expired'],
  methods: {
    filterNoteList: function (expired) {

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
