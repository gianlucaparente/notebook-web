<template>
  <div class='AddNote'>

    <h2>Add Note:</h2>

    <show-message v-bind:message="message"></show-message>

    <div class="AddNote__form form">

      <label for="title">Title <span class="required">*</span></label>
      <input id="title" type="text" v-model="note.title">
      <label for="description">Description</label>
      <textarea id="description" v-model="note.description"></textarea>

      <div class="AddNote__form__date">
        <input id="enableDate" type="checkbox" v-model="enableDate"/>
        <label for="enableDate">Add a Date</label>
        <flat-pickr id="flatPickr" v-model="note.date" :config="faltPickrConfig"></flat-pickr>
      </div>

      <div class="AddNote__form__address">
        <input id="enableAddress" type="checkbox" v-model="enableAddress"/>
        <label for="enableAddress">Add a Address</label>
        <input id="address" type="text" v-model="note.address">
      </div>

      <input type="button" value="Save" @click="addNote">

    </div>

  </div>
</template>

<script type="text/babel">
  import Vue from 'vue';
  import Axios from 'axios';
  import moment from '@lib/moment/moment.js';
  import EventsBus from '@src/services/EventsBus';
  import MessageFactory from '@src/components/ShowMessage/MessageFactory';
  import ShowMessage from '@src/components/ShowMessage/ShowMessage';
  import FlatPickr from '@lib/vue-flatpickr-component/dist/vue-flatpickr.js';
  import '@lib/flatpickr/dist/flatpickr.css';

  export default {
    name: 'AddNote',
    data () {
      return {
        note: {},
        message: undefined,
        enableDate: false,
        enableAddress: false,
        faltPickrConfig: {
          dateFormat: 'Y-m-d H:i',
          enableTime: true,
          minDate: moment().subtract(1, 'days').toDate()
        }
      }
    },
    mounted() {

      this.enableDate = !!this.note.date;
      this.enableAddress = !!this.note.address;

    },
    watch: {
      enableDate: function (newObj, oldObj) {

        if (newObj) {
          this.note.date = moment().toDate();
        } else {
          this.note.date = undefined;
        }

      },
      enableAddress: function (newObj, oldObj) {

        if (newObj) {
          this.note.address = "";
        } else {
          delete this.note.address;
        }

      }
    },
    methods: {
      addNote() {

        if (!this.note.title || this.note.title === "") {
          this.message = MessageFactory.getMessage("Field Title is not correct.", MessageFactory.MESSAGE_CLASSES.error);
          return;
        }

        if (this.enableDate) {
          this.note.date = moment(this.note.date).toISOString();
        }

        if (this.enableAddress && (!this.note.address || this.note.address === "")) {
          this.message = MessageFactory.getMessage("Field Address is not correct.", MessageFactory.MESSAGE_CLASSES.error);
          return;
        }

        Axios.post("http://localhost:8080/notes/note", this.note)
          .then((noteSaved) => {
            console.log("AddNote: Note saved correctly.", noteSaved.data);
            this.message = MessageFactory.getMessage("Note saved.", MessageFactory.MESSAGE_CLASSES.success);
            this.emitEvent("NOTE_SAVED", noteSaved.data);
          })
          .catch((e) => {
            console.log(e);
            this.message = MessageFactory.getMessage("Save note failed.", MessageFactory.MESSAGE_CLASSES.error);
          });

      },
      emitEvent(name, data) {
        EventsBus.$emit(name, data);
        console.log("AddNote: emit event " + name);
      }
    },
    components: { ShowMessage, FlatPickr }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">

  @import "../../style/main";

  .AddNote {

    h2 {
      border-bottom: 1px solid $grey;
    }

    &__form {
      margin: 5px;

      input[type=text], textarea {
        margin-bottom: 10px;
      }

      &__date {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        /*margin-bottom: 10px;*/

        label {
          flex-grow: 1;
        }

        #flatPickr {
          display: none;
          width: 250px;
          flex-grow: 0;
          margin: 0;

          input {
            margin: 0;
          }
        }

        #enableDate:checked ~ #flatPickr {
          display: block;
        }

      }

      &__address {
        display: flex;
        align-items: center;
        -webkit-justify-content: center;
        height: 37px;
        margin-bottom: 10px;

        label {
          flex-grow: 1;
        }

        #address {
          display: none;
          width: 250px;
          flex-grow: 0;
          margin: 0;
        }

        #enableAddress:checked ~ #address {
          display: block;
        }

      }

    }

  }

</style>
