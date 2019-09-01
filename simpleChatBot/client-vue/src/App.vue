<template>
  <div id="app">
    <MainChat ref="mainChat"></MainChat>
  </div>
</template>

<script>
import MainChat from './components/MainChat';

export default {
  name: 'app',
  components: {
    MainChat
  }
}
</script>