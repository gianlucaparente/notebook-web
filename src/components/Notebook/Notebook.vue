<template>
  <div class='Notebook'>

    <div class='Notebook__sidebar'>
      <overview-notes></overview-notes>
      <add-note></add-note>
    </div>

    <div class='Notebook__content'>
      <note-list v-bind:expired='false' :title="'Your Notes:'" :empty-message="'You don\'t have notes.'"></note-list>
      <note-list v-bind:expired='true' :title="'Expired Notes:'"></note-list>
    </div>

  </div>
</template>

<script type="text/babel">
  import NoteList from '@src/components/NoteList/NoteList';
  import OverviewNotes from '@src/components/OverviewNotes/OverviewNotes';
  import AddNote from '@src/components/AddNote/AddNote';

  export default {
    name: 'Notebook',
    components: {OverviewNotes, NoteList, AddNote}
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
