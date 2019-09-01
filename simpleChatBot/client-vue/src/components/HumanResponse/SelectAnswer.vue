<template>
  <div>
    <select v-model="answer">
      <option
        v-for="option in message.options"
        :value="option.value"
        :key="option.value"
      >{{ option.label }}</option>
    </select>
    <button @click="submit">Submit</button>
  </div>
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
      answer: 0
    };
  },
  methods: {
    submit: function() {
      this.$parent.$parent.submit({
        content: this.answer,
        type: 2
      });
    }
  }
};
</script>