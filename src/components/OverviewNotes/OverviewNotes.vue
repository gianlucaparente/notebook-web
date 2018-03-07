<template>
  <div class='OverviewNotes'>
    <h2>Overview</h2>
    <flat-pickr
      v-model="dateSelected"
      :config="config"
      :events="myEvents"
      @on-day-create="onDayCreate"></flat-pickr>
  </div>
</template>

<script type="text/babel">
  import FlatPickr from '@lib/vue-flatpickr-component/dist/vue-flatpickr.js';
  import '@lib/flatpickr/dist/flatpickr.css';
  import moment from '@lib/moment/moment.js';
  import Axios from 'axios';

  export default {
    name: 'OverviewNotes',
    props: [
      'notes'
    ],
    data () {
      return {
        config: {
          inline: true,
          static: true,
          altInputClass: "'flatPickrOverviewNotes'"
        },
        dateSelected: moment().toDate(),
        myEvents: [
          'onChange',
          'onClose',
          'onDestroy',
          'onKeyDown',
          'onMonthChange',
          'onOpen',
          'onYearChange',
          'onValueUpdate',
          'onDayCreate',
          'onParseConfig',
          'onReady',
          'onPreCalendarPosition'
        ]
      }
    },
    components: {FlatPickr},
    mounted: function () {},
    methods: {
      onDayCreate(dObj, dStr, fp, dayElem) {
        if (moment(dObj[0]) === new Date()) {
          dayElem.innerHTML += "<span class='flatpickr-event'></span>";
        }
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
      margin: 5px;

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
