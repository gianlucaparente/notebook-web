<template>
  <div class='NoteItem'>
    <div class='title'>{{ note.title }}</div>
    <div class='date'>{{ new Date(note.date).toLocaleDateString() }}</div>
    <div class='address'>{{ note.address }}</div>
    <div class='contact'>
      <div class='name'>{{ note.contact.name }}</div>
      <div class='telephone'>{{ note.contact.telephone1 }} - {{ note.contact.telephone2 }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoteItem',
  props: ['note']
}
</script>

<style scoped>
  .NoteItem {
    display: flex;
    justify-content: flex-start;
  }
  .NoteItem div {
    margin-right: 15px;
  }
</style>
