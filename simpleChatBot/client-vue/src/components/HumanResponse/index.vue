<template>
  <div>
    <InputAnswer v-if="message.type == 1" :message="message"></InputAnswer>
    <SelectAnswer v-if="message.type == 2" :message="message"></SelectAnswer>
  </div>
</template>

<script>
import InputAnswer from './InputAnswer';
import SelectAnswer from './SelectAnswer';

export default {
  components: {
    InputAnswer,
    SelectAnswer
  },
  props: {
    message: {
      type: Object,
      required: true
    }
  },
}
</script>

<style>
</style>