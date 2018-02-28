<template>
  <div class="NoteItem">

    <div class="NoteItem__header">
      <div class="NoteItem__header__title">{{ note.title }}</div>
      <div class="NoteItem__header__date">{{ new Date(note.date).toLocaleString() }}</div>
    </div>

    <div class="NoteItem__content">

      <div class="NoteItem__content__description">{{ note.description || "No description" }}</div>

      <div class="NoteItem__content__sidebar">

          <div class="NoteItem__content__sidebar__address" v-if="note.address">
            <div class="NoteItem__content__sidebar__address__title">Address:</div>
            <div>{{ note.address }}</div>
          </div>

          <div class="NoteItem__content__sidebar__contact" v-if="note.contact">
            <div class="NoteItem__content__sidebar__contact__title">Contact:</div>
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

  @import "../../style/colors";

  .NoteItem {
    background-color: white;
    border: 1px solid $border-color;
    margin-bottom: 10px;
    padding: 10px;

    &__header {
      border-bottom: 1px solid $border-color;
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
        border-left: 1px solid $border-color;
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
