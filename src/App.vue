<template>
  <div id="app">

    <header class="Header">
      <img width="100" height="100" src="./assets/logo.png">
      <h1 class="Header__title">{{ welcome }}</h1>
      <show-message class="Header__message" v-bind:message="message"></show-message>
    </header>

    <content>
      <router-view/>
    </content>
    <footer>

    </footer>
  </div>

</template>

<script type="text/babel">

  import ShowMessage from '@src/components/ShowMessage/ShowMessage';
  import Entities from '@src/entities.js';
  import EventsBus from '@src/services/EventsBus';

  export default {
    name: 'App',
    components: {ShowMessage},
    data() {
      return {
        welcome: "Welcome to your Notebook!",
        message: undefined
      }
    },
    mounted() {

      let self = this;

      EventsBus.$on([
        Entities.EventsNames.NOTE_SAVED,
        Entities.EventsNames.NOTE_DELETED
      ], function (note, message) {
        self.message = message;
      });

      EventsBus.$on([Entities.EventsNames.ERROR], function (message) {
        self.message = message;
      });

    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">

  @import "./style/main";

  body {
    background-color: $grey-light;
  }

  h1 {
    font-size: 36px;
  }

  h2 {
    font-size: 24px;
  }

  h3 {
    font-size: 18px;
    margin: 0;
  }

  div, span, p, a {
    font-size: 16px;
  }

  #app {
    font-family: "Comic Sans MS", "Lucida Sans Unicode", "Lucida Grande", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;

    .Header {
      display: flex;
      height: 100px;
      align-items: center;

      &__title {
        margin: 0 0 0 10px;
      }

      img {
      }

      &__message {
        position: absolute;
        right: 10px;
        top: 10px;
      }

    }

  }

</style>
