<template>
  <div class="NoteItem">

    <div class="NoteItem__header">
      <h3 class="NoteItem__header__title">{{ note.title }}</h3>
      <div class="NoteItem__header__date" v-if="note.date">{{ new Date(note.date).toLocaleString() }}</div>
      <div class="NoteItem__header__actions">
        <div class="NoteItem__header__actions__action">
          <img src="../../assets/svg/edit.svg">
        </div>
        <div class="NoteItem__header__actions__action" @click="subNote">
          <img src="../../assets/svg/trash.svg">
        </div>
      </div>
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

<script type="text/babel">

import Axios from 'axios';
import EventsBus from '@/services/EventsBus';

export default {
  name: 'NoteItem',
  props: ['note'],
  methods: {
    subNote() {

      Axios.delete("http://localhost:8080/notes/note/" + this.note.id)
        .then(() => {
          EventsBus.$emit('NOTE_DELETED', this.note);
          console.log("NotebookApp: Note deleted correctly.");
        })
        .catch((e) => {
          console.log(e);
        });

    }
  }
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
        flex-grow: 1;
      }

      &__date {
        flex-grow: 1;
        text-align: right;
      }

      &__actions {
        flex-grow: 0;
        display: flex;
        border-left: 1px solid $grey;
        padding-left: 5px;
        margin-left: 10px;

        &__action {
          margin-left: 5px;
          display: flex;
          align-items: center;
          -webkit-justify-content: center;
          justify-content: center;

          img {
            width: 15px;
          }


        }

      }

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
