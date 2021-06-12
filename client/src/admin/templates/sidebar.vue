<template>
  <div class="sidenav" :class="showActive ? 'active' : ''">
    <router-link to="/admin/dashboard"><h2>Dashboard</h2></router-link>
    <hr />
    <router-link to="/admin/videos">
      <i class="fas fa-file-video"></i> Videos
    </router-link>
    <template v-if="getUser.isAdmin">
      <router-link to="/admin/Categories">
        <i class="fas fa-tags"></i> Categories
      </router-link>
      <router-link to="/admin/reward">
        <i class="fas fa-donate"></i> Reward
      </router-link>
      <router-link to="/admin/user">
        <i class="fas fa-users"></i> User
      </router-link>
    </template>

    <router-link to="/admin/details">
      <i class="fas fa-user"></i> User Details
    </router-link>
    <button class="btn-sideMenu" @click="btnShowActive">
      <i
        class="fas"
        :class="showActive ? 'fa-chevron-left' : 'fa-chevron-right'"
      ></i>
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Sidebar',
  data() {
    return {
      showActive: false
    };
  },
  methods: {
    btnShowActive() {
      this.showActive = !this.showActive;
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  }
};
</script>
