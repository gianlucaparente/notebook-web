<template>
  <div class='Notebook'>
    <p>Your Notes:</p>
    <note-list v-bind:notes='notes' v-bind:expired="false"></note-list>
    <p>Expired Notes:</p>
    <note-list v-bind:notes='notes' v-bind:expired="true"></note-list>
  </div>
</template>

<script>
import NoteList from '@/components/NoteList/NoteList';
import NoteItem from '@/components/NoteItem/NoteItem';
import Axios from 'axios';

export default {
  name: 'Notebook',
  data () {
    return {
      notes: []
    }
  },
  components: { NoteList },
  mounted: function () {
    this.retrieveData(Axios);
  },
  methods: {
    retrieveData(Axios) {

      Axios.get("http://localhost:8080/notes")
        .then((response) => {
          this.notes = response.data;
          console.log("NotebookApp: Data retrieved correctly.");
        })
        .catch((e) => {
            console.log(e);
        });

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
