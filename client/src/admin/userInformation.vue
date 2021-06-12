<template>
  <section>
    <div>
      <h1>{{ getUser.name }}</h1>
      <p>Email: {{ getUser.email }}</p>
      <p>Role: {{ getUser.isAdmin ? 'Admin' : 'Member' }}</p>
      <button @click="sigout">Logout</button>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'UserDetail',
  methods: {
    ...mapActions(['SignOut']),
    sigout() {
      this.SignOut().then(() => {
        this.$router.replace({ name: 'Home' });
      });
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  }
};
</script>

<style scoped>
section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
div {
  background-color: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
  margin: 10px;
  overflow: hidden;
}
h1 {
  background-color: rgb(79, 52, 255);
  margin: 0;
  padding: 2rem 5rem;
  color: #fff;
}
p {
  margin: 20px 0;
  padding: 0 5rem;
  font-size: 1.8rem;
}
button {
  margin: 0 5rem;
  margin-bottom: 25px;
  border: 1px solid #fb3640;
  background: none;
  color: #fb3640;
  border-radius: 15px;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 5px 20px;
}
button:hover {
  opacity: 0.8;
}
button:active {
  transform: scale(0.98);
}
</style>
