<template>
  <div class='NoteList' v-if="haveNotes || emptyMessage">

    <div class="loader" :class="state"></div>

    <h2>{{ title }}</h2>

    <div class="NoteList__filters" v-if="haveFilters">
      <div v-for="filter in filters" class="NoteList__filters__filter" v-bind:key='filter.name' @click="removeFilter(filter)">
        <icon name="remove"></icon>
        <span>{{filter.value}}</span>
      </div>
    </div>

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
  import '@lib/vue-awesome/icons/remove';
  import Icon from '@lib/vue-awesome/components/Icon';

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
      removeFilter(filter) {

        if (filter.name === "date") {
          this.getNotes(this.expired);
          EventsBus.$emit(Entities.EventsNames.FILTER_DATE_REMOVED);
        }

      },
      getNotes(expired, dateSelected) {

        let self = this;
        self.state = 'loading';
        self.filters = [];

        let params = "";

        if (expired !== undefined) {
//          self.filters.push({
//            name: "expired",
//            value: (expired) ? "expired" : "not expired"
//          });
          params += "/expired/" + expired;
        }

        if (dateSelected) {
          self.filters.push({
            name: "date",
            value: moment(dateSelected).format("DD MMMM YYYY")
          });
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
    components: {NoteItem,Icon}
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
      margin-bottom: 10px;

      &__filter {
        color: white;
        background-color: #569ff7;
        @include border-radius(20px);
        margin: 0 5px;
        border: 1px solid;
        padding: 5px 15px;
        font-size: 14px;
        display: flex;
        align-items: center;
        -webkit-justify-content: center;
        justify-content: center;
        cursor: pointer;

        span {
          margin-left: 5px;
        }
      }

    }
  }

</style>
