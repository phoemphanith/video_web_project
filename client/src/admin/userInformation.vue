<template>
  <section>
    <div class="card">
      <div class="header">
        <div
          class="user-profile"
          :style="`background-image: url(${getUser.img})`"
        >
          <button>Edit</button>
        </div>

        <h1>{{ getUser.name }}</h1>
      </div>
      <div class="body">
        <p>Email: {{ getUser.email }}</p>
        <p>Reward: {{ getUser.rewardPoint }} Coin</p>
        <p>Role: {{ getUser.isAdmin ? 'Admin' : 'Member' }}</p>
        <button @click="sigout">Logout</button>
      </div>
    </div>
    <!-- TODO: 
      1. when click edit upload pop up
      2. style edit profile form
     -->
    <form @submit.prevent="editProfile">
      <input
        type="file"
        accept="image/png, image/jpeg"
        @change="selectFile"
        ref="file"
        class="file-input"
      />
      <button class="button is-info">UPLOAD</button>
    </form>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';
export default {
  name: 'UserDetail',
  data() {
    return {
      file: ''
    };
  },
  methods: {
    ...mapActions(['SignOut']),
    sigout() {
      this.SignOut().then(() => {
        this.$router.replace({ name: 'Home' });
      });
    },
    selectFile() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },
    async editProfile() {
      const formData = new FormData();
      formData.append('file', this.file);
      await axios.patch(
        `http://localhost:5000/api/user/${this.getUser._id}/update`,
        formData
      );
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  }
};
</script>

<style scoped>
.card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);
}
.header {
  background-color: cornflowerblue;
  display: flex;
  padding: 2rem 3rem;
  color: #fff;
}
.user-profile {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid #fff;
  margin-right: 15px;
  overflow: hidden;
  position: relative;
}
.user-profile button {
  position: absolute;
  top: -20%;
  width: 100%;
  height: 100%;
  opacity: 0;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  font-size: 1.5rem;
  font-weight: 600;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.user-profile:hover button {
  opacity: 100%;
  top: 0;
}
.body {
  padding: 2rem 3rem;
}
.body p {
  font-size: 2rem;
}
.body button {
  background-color: rgb(255, 32, 32);
  color: #fff;
  font-size: 1.5rem;
  font-weight: 600;
  border: none;
  padding: 5px 20px;
  border-radius: 10px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}
.body button:active {
  transform: scale(0.98);
}
.body button:hover {
  opacity: 0.9;
}
</style>
