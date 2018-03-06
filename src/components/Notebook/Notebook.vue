<template>
  <div class='Notebook'>

    <div class='Notebook__content'>
      <overview-notes></overview-notes>
    </div>

    <div class='Notebook__sidebar'>
      <note-list v-bind:expired='false' v-bind:title="'Your Notes:'" v-bind:empty-message="'You don\'t have notes.'"></note-list>
      <note-list v-bind:expired='true' v-bind:title="'Expired Notes:'"></note-list>
    </div>

  </div>
</template>

<script type="text/babel">
import NoteList from '@src/components/NoteList/NoteList';
import OverviewNotes from '@src/components/OverviewNotes/OverviewNotes';

import Axios from 'axios';

export default {
  name: 'Notebook',
  data () {
    return {}
  },
  components: { OverviewNotes, NoteList },
  mounted: function () {},
  methods: {}
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
