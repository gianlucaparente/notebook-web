<template>
  <div class='Notebook'>

    <div class='Notebook__content'>
      <note-list v-bind:expired='false' v-bind:title="'Your Notes:'" v-bind:empty-message="'You don\'t have notes.'"></note-list>
      <note-list v-bind:expired='true' v-bind:title="'Expired Notes:'"></note-list>
    </div>

    <div class='Notebook__sidebar'>
      <add-note></add-note>
    </div>

  </div>
</template>

<script type="text/babel">
import NoteList from '@src/components/NoteList/NoteList';
import AddNote from '@src/components/AddNote/AddNote';

import Axios from 'axios';

export default {
  name: 'Notebook',
  data () {
    return {}
  },
  components: { NoteList, AddNote },
  mounted: function () {
    this.retrieveData(Axios);
  },
  methods: {
    retrieveData(Axios) {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">

  @import "../../style/main";

  .Notebook {

    display: flex;

    &__content {
      width: 100% * 2/3;
      margin-right: 8px;
    }

    &__sidebar {
      width: 100% * 1/3;
    }

  }

</style>
