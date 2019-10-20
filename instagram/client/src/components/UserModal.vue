<template>
  <div
    class="modal fade"
    id="userModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group row">
            <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
              {{ userData.email }}
            </div>
          </div>

          <div class="form-group row">
            <label for="inputPassword3" class="col-sm-2 col-form-label">Name</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                placeholder="Name"
                v-model="userData.name"
              />
            </div>
          </div>

          <div class="form-group row">
            <label for="inputPassword3" class="col-sm-2 col-form-label">Display Name</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                placeholder="Display Name"
                v-model="userData.display_name"
              />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click.prevent="saveUser">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data: function() {
    return {
      userData: this.user
    };
  },
  methods: {
    saveUser: async function() {
      await axios.put(`http://localhost:3000/users/${this.userData.id}`, {
        user: this.userData
      })

      alert('saved');

      this.$parent.$emit('UPDATE_USER', this.userData)
      $('#userModal').modal('toggle');

    }
  }
};
</script>

<style>
</style>