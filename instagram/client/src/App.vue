<template>
  <div id="app" class="container">
    <UsersList></UsersList>
  </div>
</template>

<script>
import UsersList from "./components/UsersList.vue";

export default {
  name: "app",
  components: {
    UsersList,
  }
};
</script>