<template>
  <div id="app">

    <header class="Header">
      <img width="100" height="100" src="./assets/logo.png">
      <h1 class="Header__title">{{ welcome }}</h1>
    </header>

    <content>
      <router-view/>
    </content>
    <footer>

    </footer>
  </div>

</template>

<script type="text/babel">
  export default {
    name: 'App',
    data() {
      return {
        welcome: "Welcome to your Notebook!"
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">

  body {

    background-color: #fafafa;

  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;

    .Header {
      display: flex;
      height: 100px;
      align-items: center;

      &__title {
        margin: 0 0 0 10px;
        font-size: 32px;
      }

      img {  }

    }

  }

</style>
