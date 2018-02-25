<template>
  <div id="app">
    <header>
      <img src="./assets/logo.png">
      <h1>{{ welcome }}</h1>
    </header>
    <content>
      <router-view/>
    </content>
    <footer>

    </footer>
  </div>

</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        welcome: "Welcome to your Notebook!"
      }
    }
  }
</script>

<style>
  header {
    display: flex;
  }

  header #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  header #app img {
    width: 100px;
  }
</style>
