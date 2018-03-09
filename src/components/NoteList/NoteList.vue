<template>
  <div class='NoteList' v-if="haveNotes || emptyMessage">

    <div class="loader" :class="state"></div>

    <h2>

      {{ title }}

      <div class="NoteList__filters" v-if="haveFilters">
        <div v-for="filter in filters" class="NoteList__filters__filter" v-bind:key='filter'>{{filter}}</div>
      </div>

    </h2>

    <note-item v-if="haveNotes" v-for='note in notes' v-bind:note='note' v-bind:key='note.id'></note-item>

    <div v-if="!haveNotes">{{ emptyMessage }}</div>

  </div>
</template>

<script type="text/babel">
  import NoteItem from '@src/components/NoteItem/NoteItem';
  import EventsBus from '@src/services/EventsBus';
  import Axios from 'axios';
  import Entities from '@src/entities';
  import moment from '@lib/moment/moment.js';

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
        state: 'loading',
        filters: []
      }
    },
    mounted () {

      let self = this;

      EventsBus.$on(Entities.EventsNames.DATE_SELECTED, function (dateSelected) {
        self.getNotes(self.expired, dateSelected);
      });

      this.getNotes(this.expired);

    },
    computed: {
      haveNotes: function () {
        return this.notes.length > 0;
      },
      haveFilters: function () {
        return this.filters.length > 0;
      }
    },
    methods: {
      getNotes(expired, dateSelected) {

        let self = this;
        self.state = 'loading';
        self.filters = [];

        let params = "";

        if (expired !== undefined) {
//          self.filters.push((expired) ? "expired" : "not expired");
          params += "/expired/" + expired;
        }

        if (dateSelected) {
          self.filters.push("on " + moment(dateSelected).format("DD MMMM YYYY"));
          params += "/date/" + new Date(dateSelected.getTime() - (dateSelected.getTimezoneOffset() * 60000)).toISOString();
        }

        Axios.get("http://localhost:8080/notes" + params)
          .then(function (notes) {

            self.notes = notes.data;
            console.log("NoteList: Notes retrieved correctly.", notes.data);
            self.state = 'ready';

          })
          .catch((e) => {
            console.log(e);
          });

      }
    },
    components: {NoteItem}
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">

  @import "../../style/main";

  .NoteList {

    h2 {
      border-bottom: 1px solid $grey;
      position: relative;
    }

    &__filters {
      display: flex;
      flex-direction: row-reverse;
      position: absolute;
      right: 0;
      bottom: 0;
      font-weight: normal;

      &__filter {
        margin-left: 5px;
      }

    }
  }

</style>
