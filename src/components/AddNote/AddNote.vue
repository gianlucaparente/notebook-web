<template>
  <div class='AddNote'>

    <h2>Add Note:</h2>

    <show-message v-bind:message="message"></show-message>

    <div class="AddNote__form form">

      <label for="title">Title <span class="required">*</span></label>
      <input id="title" type="text" v-model="note.title">
      <label for="description">Description</label>
      <textarea id="description" v-model="note.description"></textarea>
      <label for="date">Date</label>
      <input id="date" type="text" v-model="note.date">
      <label for="address">Address</label>
      <input id="address" type="text" v-model="note.address">

      <input type="button" value="Save" @click="addNote">

    </div>

  </div>
</template>

<script type="text/babel">
import Vue from 'vue';
import Axios from 'axios';
import EventsBus from '@/services/EventsBus';
import MessageFactory from '@/components/ShowMessage/MessageFactory';
import ShowMessage from '@/components/ShowMessage/ShowMessage';

export default {
  name: 'AddNote',
  data () {
    return {
      note: {},
      message: undefined
    }
  },
  mounted() {

  },
  methods: {
    addNote() {

      // add validation

      Axios.post("http://localhost:8080/notes/note", this.note)
        .then((noteSaved) => {
          console.log("AddNote: Note saved correctly.", noteSaved.data);
          this.message = MessageFactory.getMessage("Note saved.", MessageFactory.MESSAGE_CLASSES.success)
          this.emitEvent("NOTE_SAVED", noteSaved.data);
        })
        .catch((e) => {
          console.log(e);
          this.message = MessageFactory.getMessage("Save note failed.", MessageFactory.MESSAGE_CLASSES.error)
        });

    },
    emitEvent(name, data) {
      EventsBus.$emit(name, data);
      console.log("AddNote: emit event " + name);
    }
  },
  components: { ShowMessage }
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

    }

  }

</style>
