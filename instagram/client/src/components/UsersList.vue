<template>
  <div>
    <div class="form-group row">
      <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
      <div class="col-sm-10">
        <input type="email" class="form-control" placeholder="Email" v-model="filterUserEmail" />
      </div>
    </div>
    <table class="table">
      <tr>
        <th>ID</th>
        <th>Email</th>
        <th>Name</th>
        <th>Display Name</th>
      </tr>
      <tr v-for="user in filterList" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.display_name }}</td>
        <td>
          <button @click.prevent="editUser(user.id)" type="button" class="btn btn-primary">Edit</button>
        </td>
      </tr>
    </table>

    <UserModal :user="edittingUser" v-if="edittingUser"></UserModal>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
const $ = require("jquery");

import UserModal from "./UserModal";

export default {
  components: {
    UserModal
  },
  data: function() {
    return {
      users: [],
      filterList: [],
      showModal: false,
      filterUserEmail: "",
      edittingUser: null
    };
  },
  created: function() {
    this.fetchUsersList();

    this.$on('UPDATE_USER', function(data) {
      let needToUpdateUserIndex = this.users.findIndex(u => u.id == data.id);
      this.$set(this.users, needToUpdateUserIndex, data);
    })
  },
  methods: {
    fetchUsersList: function() {
      const self = this;

      axios.get("http://localhost:3000/users").then(function(res) {
        self.users = res.data;
        self.filterList = res.data;
      });
    },
    editUser: async function(id) {

      const res = await axios.get(`http://localhost:3000/users/${id}`)
      this.edittingUser = res.data;

      $("#userModal").modal();
    }
  },
  watch: {
    filterUserEmail: _.debounce(function(value) {
      const self = this;

      axios
        .get("http://localhost:3000/users", {
          params: {
            email: value
          }
        })
        .then(function(res) {
          self.users = res.data;
          self.filterList = res.data;
        });
    }, 300)
    // filter cac users da co trong danh sach
    // filterUserEmail: function(value) {
    //   this.filterList = this.users.filter(
    //     e => e.email.toLowerCase().includes(value)
    //   )
    // }
  }
};
</script>

<style>
</style>