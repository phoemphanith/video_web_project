<template>
  <div>
    <the-header></the-header>
    <section>
      <div class="container-sm">
        <section class="row-box" style="background-color: red">
          FILTER
        </section>
        <div class="row-box">
          <div class="col-box" v-for="video in getVideos" :key="video._id">
            <router-link :to="`/videos/${video._id}`" v-on:click="video.view++">
              <video width="200">
                <source :src="video.video_file" type="video/mp4" />
                Your browser does not support HTML video.
              </video>
            </router-link>
            <h3>{{ video.name }} ({{ video.category }})</h3>
            <h4>
              {{ getUsers.find(user => user._id === video.user).name }}
            </h4>
            <p>
              {{ video.view }} views | Post on
              {{ new Date(video.publicDate).toLocaleDateString() }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TheHeader from '../../components/layout/TheHeader.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Videos',
  components: {
    TheHeader
  },
  methods: {
    ...mapActions(['fetchVideos', 'fetchUsers', 'fetchCategories'])
  },
  computed: {
    ...mapGetters(['getVideos', 'getUsers', 'getCategories'])
    // filteredVideos() {
    //   return this.$store.getters['videos/videos'];
    // },
    // hasVideos() {
    //   return this.$store.getters['videos/hasVideos'];
    // }
  },
  created() {
    this.fetchUsers();
    this.fetchVideos();
    this.fetchCategories();
  }
};
</script>

<style scoped>
section {
  margin: 2% 5%;
}
video {
  width: 100%;
}
.row-box {
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.col-box {
  display: grid;
}
</style>
