<template>
  <div class='AddNote'>

    <h2>Add Note:</h2>

    <div class="AddNote__form form">

      <transition name="fade">
        <div v-if="message" :class="messageClass" class="AddNote__message message">{{ message }}</div>
      </transition>

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

export default {
  name: 'AddNote',
  data () {
    return {
      note: {},
      message: undefined,
      messageClass: undefined
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
          this.setMessage("Note saved.", "success");
          this.emitEvent("NOTE_SAVED", noteSaved.data);
        })
        .catch((e) => {
          console.log(e);
          this.setMessage(e.response.data.message, "error");
        });

    },
    setMessage(message, messageClass) {
      this.message = message;
      this.messageClass = messageClass;

      setTimeout(() => {
        this.message = undefined;
        this.messageClass = undefined;
      }, 2000);

    },
    emitEvent(name, data) {
      EventsBus.$emit(name, data);
      console.log("AddNote: emit event " + name);
    }
  }
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
