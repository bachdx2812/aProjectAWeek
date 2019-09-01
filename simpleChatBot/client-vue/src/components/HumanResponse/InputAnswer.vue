<template>
  <input type="text" v-model="answer" v-on:keyup.enter="submit" />
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  data: function() {
    return {
      answer: ""
    };
  },
  methods: {
    submit: function() {
      this.$parent.$parent.submit({
        content: this.answer,
        type: 1 // name question
      });
    }
  }
};
</script>

<style>
</style>