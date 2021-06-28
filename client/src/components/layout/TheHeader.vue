<template>
  <header>
    <nav>
      <h1>
        <router-link to="/">VideoWeb</router-link>
      </h1>
      <ul>
        <li>
          <router-link to="/shop">Shop</router-link>
        </li>
        <li v-if="isAuth" class="list-container">
          <button class="dropdown" v-on:click="show = !show">
            {{ getUser.name }} <i class="fas fa-angle-down"></i>
          </button>
          <div v-if="show" class="user-list">
            <router-link to="/admin">Dasboard</router-link>
            <div class="line"></div>
            <button class="logout" @click="SignOut">Logout</button>
          </div>
        </li>
        <li v-else>
          <router-link to="/login">Login</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'TheHeader',
  data() {
    return {
      show: false
    };
  },
  methods: {
    ...mapActions(['SignOut'])
  },
  computed: {
    ...mapGetters(['isAuth', 'getUser'])
  }
};
</script>

<style scoped>
.dropdown {
  background: none;
  border: 1px solid rgba(0, 0, 0, 0);
  color: #fff;
  padding: 0.75rem 1.5rem;
}
.dropdown:hover {
  border: 1px solid #fff;
  border-radius: 15px;
}
.dropdown:active {
  transform: scale(0.98);
}
header {
  width: 100%;
  background-color: #3d008d;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #fff;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover {
  color: rgb(216, 216, 216);
  border: 1px solid #fff;
  border-radius: 15px;
}

h1 {
  font-size: 2.7rem;
  padding: 10px 0;
}

h1,
a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
.list-container {
  position: relative;
  min-width: 100px;
  z-index: 10;
}
.user-list {
  position: absolute;
  left: 0;
  bottom: 0;
  transform: translateY(100%);
  padding: 2rem 1.5rem;
  background-color: #3d008d;
  border-radius: 5px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.5);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.user-list a {
  border: none;
  padding: 0;
}
.user-list a:hover {
  border: none;
}
.line {
  height: 1px;
  width: 100%;
  background-color: #fff;
  margin: 10px 0;
}
.logout {
  width: 100%;
}
</style>
