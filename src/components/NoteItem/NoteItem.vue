<template>
  <div class="NoteItem">

    <div class="NoteItem__header">
      <h3 class="NoteItem__header__title">{{ note.title }}</h3>
      <div class="NoteItem__header__date" v-if="note.date">{{ new Date(note.date).toLocaleString() }}</div>
    </div>

    <div class="NoteItem__content">

      <div class="NoteItem__content__description">{{ note.description || "No description" }}</div>

      <div class="NoteItem__content__sidebar">

          <div class="NoteItem__content__sidebar__address" v-if="note.address">
            <h3 class="NoteItem__content__sidebar__address__title">Address:</h3>
            <div>{{ note.address }}</div>
          </div>

          <div class="NoteItem__content__sidebar__contact" v-if="note.contact">
            <h3 class="NoteItem__content__sidebar__contact__title">Contact:</h3>
            <div class="NoteItem__content__sidebar__contact__name">{{ note.contact.name }}</div>
            <div class="NoteItem__content__sidebar__contact__telephone1">{{ note.contact.telephone1 }}</div>
            <div class="NoteItem__content__sidebar__contact__telephone2">{{ note.contact.telephone2 }}</div>
          </div>

      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'NoteItem',
  props: ['note']
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">

  @import "../../style/main";

  .NoteItem {
    background-color: white;
    border: 1px solid $grey;
    margin: 5px;
    padding: 10px;

    &__header {
      border-bottom: 1px solid $grey;
      padding: 0 5px 5px 5px;
      display: flex;
      justify-content: space-between;

      &__title {
        font-weight: bold;
      }

      &__date { }

    }

    &__content {
      display: flex;
      justify-content: space-between;

      &__description {
        padding: 5px;
      }

      &__sidebar {
        padding: 5px;
        border-left: 1px solid $grey;
        width: 250px;

        &__address {
          margin-bottom: 5px;

          &__title {
            font-weight: bold;
          }

        }

        &__contact {

          &__title {
            font-weight: bold;
          }

        }

      }

    }

  }

</style>
