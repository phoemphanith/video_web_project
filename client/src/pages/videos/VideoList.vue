<template>
  <div>
    <the-header></the-header>
    <section>
      <div class="container-sm">
        <div class="filter-btn">
          <button class="btn btn-primary" @click="fetchVideos">All</button>
          <div v-for="category in getCategories" :key="category._id">
            <button
              class="btn btn-primary"
              @click="filterCategories(category.name)"
            >
              {{ category.name }}
            </button>
          </div>
        </div>
        <div class="row-box">
          <div class="col-box" v-for="video in getVideos" :key="video._id">
            <router-link
              :to="`/videos/${video._id}`"
              v-on:click="increaseView(video._id, video.view)"
            >
              <video width="200" preload="metadata">
                <source :src="`${video.video_file}#t=0.5`" type="video/mp4" />
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
import axios from 'axios';

export default {
  name: 'Videos',
  data() {
    return {
      filterCategory: ''
    };
  },
  components: {
    TheHeader
  },
  methods: {
    ...mapActions([
      'fetchVideos',
      'fetchUsers',
      'fetchCategories',
      'filterCategories'
    ]),
    async increaseView(id, videoView) {
      await axios.patch(`http://localhost:5000/api/videos/${id}`, {
        view: videoView + 1
      });
    }
  },
  computed: {
    ...mapGetters(['getVideos', 'getUsers', 'getCategories'])
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
  max-width: 300px;
}
.row-box {
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.col-box {
  display: grid;
}
.filter-btn {
  display: flex;
  margin: 2rem 0%;
}

button {
  margin: 0 1rem 0 0;
}
</style>
