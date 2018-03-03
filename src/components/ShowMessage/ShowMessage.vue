<template>
  <transition name="fade">
    <div v-if="message && showMessage" :class="message.type" class="message">
      <img :src="getIcon()">
      <span>{{ message.text }}</span>
    </div>
  </transition>
</template>

<script type="text/babel">
  export default {
    name: "ShowMessage",
    props: [
      'message'
    ],
    data() {
      return {
        showMessage: true,
        icon: "stop"
      }
    },
    watch: {
      message: function(newVal, oldVal) {

        this.showMessage = true;
        setTimeout(() => {
          this.showMessage = false;
        }, 2000);

      }
    },
    methods: {
      getIcon() {
        return require("../../assets/svg/" + this.message.type + ".svg");
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">

  @import "../../style/main";

  $messages-radius: 5px;

  %message-shared {
    @include border-radius($messages-radius);
    border: 1px solid $blue;
    background-color: $blue-light;
    color: $blue;
    padding: 10px;
    margin: 10px 5px;
  }

  .message {
    @extend %message-shared;
    display: flex;
    align-items: center;

    img {
      width: 15px;
      margin-right: 5px;
    }

  }

  .success {
    @extend %message-shared;
    color: $green;
    border-color: $green;
    background-color: $green-light;
  }

  .error {
    @extend %message-shared;
    color: $red;
    border-color: $red;
    background-color: $red-light;
  }

  .warning {
    @extend %message-shared;
    color: $yellow;
    border-color: $yellow;
    background-color: $yellow-light;
  }

</style>
