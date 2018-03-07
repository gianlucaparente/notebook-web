<template>
  <div id="OverviewNotes" class='OverviewNotes'>
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

  export default {
    name: 'OverviewNotes',
    props: [
      'notes'
    ],
    data () {
      let self = this;
      return {
        calendar: undefined,
        dataReady: false,
        config: {
          inline: true,
          static: true,
          altInputClass: "'flatPickrOverviewNotes'",
          onDayCreate: function(dObj, dStr, fp, dayElem) {

            let date = dayElem.dateObj;

            self.notes.forEach(function (noteDate) {

              if (sameDay(date, new Date(noteDate))) {
                dayElem.innerHTML += "<span class='flatpickr-event'></span>";
              }

            });

            function sameDay(d1, d2) {
              return d1.getFullYear() === d2.getFullYear() &&
                d1.getMonth() === d2.getMonth() &&
                d1.getDate() === d2.getDate();
            }

          }
        }
      }
    },
    components: {},
    mounted: function () {

      let self = this;

      EventsBus.$on('NOTES_LOADED', function () {

        if (!self.calendar) {
          self.calendar = flatpickr('#flatpickr', self.config);
        } else {
          self.calendar.redraw();
        }

      });

    },
    methods: {}
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
