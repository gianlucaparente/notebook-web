<template>
  <div id="OverviewNotes" class='OverviewNotes'>
    <div class="loader" :class="state"></div>
    <h2>Overview</h2>
    <div id="flatpickr"></div>
  </div>
</template>

<script type="text/babel">
  import flatpickr from '@lib/flatpickr/dist/flatpickr.js';
  import '@lib/flatpickr/dist/flatpickr.css';
  import moment from '@lib/moment/moment.js';
  import Axios from 'axios';
  import EventsBus from '@src/services/EventsBus';
  import Entities from '@src/entities.js';

  export default {
    name: 'OverviewNotes',
    props: [],
    data () {
      return {
        state: 'loading',
        calendar: undefined,
        notes: [],
        config: {
          inline: true,
          static: true,
          altInputClass: "'flatPickrOverviewNotes'",
          onDayCreate: this.onDayCreate,
          onChange: this.onChange
        }
      };
    },
    components: {},
    mounted: function () {

      let self = this;

      EventsBus.$on(Entities.EventsNames.NOTE_SAVED, function (note, message) {
        self.calendar.setDate(note.date, true);
        self.getNotes();
      });

      EventsBus.$on(Entities.EventsNames.NOTE_DELETED, function (note, message) {
        self.calendar.setDate(self.calendar.selectedDates[0], true);
        self.getNotes();
      });

      this.getNotes();
    },
    methods: {
      getNotes() {

        let self = this;
        self.state = 'loading';

        Axios.get("http://localhost:8080/notes")
          .then((notes) => {

            self.notes = notes.data;
            console.log("OverviewNotes: Notes retrieved correctly.", self.notes);

            if (!self.calendar) {
              self.calendar = flatpickr('#flatpickr', self.config);
              console.info("OverviewNotes: Overview calendar created.");
            } else {
              self.calendar.redraw();
              console.info("OverviewNotes: Overview calendar redraw.");
            }

            self.state = 'ready';

          })
          .catch((e) => {
            console.log(e);
          });

      },
      onDayCreate(dObj, dStr, fp, dayElem) {

        let date = dayElem.dateObj;

        console.info("Create day: " + date);

        this.notes.forEach(function (note) {

          // console.info("Check: " + date + " - " + new Date(note.date) + " = " + sameDay(date, new Date(note.date)));

          if (sameDay(date, new Date(note.date))) {
            dayElem.innerHTML += "<span class='flatpickr-event'></span>";
            console.info("OverviewNotes: Add note to day: " + date);
          }

        });

        function sameDay(d1, d2) {
          return d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate();
        }

      },
      onChange(selectedDates, dateStr, instance) {
        console.info("OverviewNotes: Select date: ", selectedDates[0]);
        EventsBus.$emit(Entities.EventsNames.DATE_SELECTED, selectedDates[0]);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">

  @import "../../style/main";

  .OverviewNotes {

    h2 {
      border-bottom: 1px solid $grey;
    }

    .flatpickr-wrapper {
      margin: 0 5px;

      .flatpickr-input {
        display: none;
      }

      .flatpickr-event {
        width: 100%;
        height: 100%;
        background-color: $red-light;
        position: absolute;
        left: 0;
        z-index: -1;
        -webkit-box-shadow: none;
        box-shadow: none;
        border-radius: 150px;
      }

    }

  }

</style>
