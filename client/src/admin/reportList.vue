<template>
  <div class="body">
    <h1>Report List</h1>
    <hr />
    <div class="mycontainer">
      <div v-for="video in getUserVideos" :key="video._id">
        <ReportComponent
          :id="video._id"
          :url="video.video_file"
          :name="video.name"
          :date="new Date(video.publicDate).toLocaleDateString()"
        ></ReportComponent>
      </div>
    </div>
  </div>
</template>
<script>
import ReportComponent from './components/reportComponent.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'Report_List',
  components: {
    ReportComponent
  },
  methods: {
    ...mapActions(['fetchVideoByUser'])
  },
  computed: {
    ...mapGetters(['getUserVideos', 'getUser'])
  },
  created() {
    this.fetchVideoByUser(this.getUser._id);
  }
};
</script>

<style scoped></style>
