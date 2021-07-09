<template>
  <div>
    <hr />
    <p>Dashboard/</p>
    <hr />
    <div class="channel-analytics">
      <h3>Channel Analytics</h3>
      <p>Summary at {{ summaryDate }}</p>
      <table>
        <tbody>
          <tr>
            <td>Videos Among</td>
            <td>{{ getUserVideos.length }} videos</td>
          </tr>
          <tr>
            <td>Views each Videos</td>
            <td>{{ getViews }} views</td>
          </tr>
          <tr>
            <td>Reward</td>
            <td>{{ getRewards }} coins</td>
          </tr>
          <tr>
            <td>Get Paid 0.025$ per 1 view</td>
            <td>{{ getViews * 0.025 }}$</td>
          </tr>
        </tbody>
      </table>
      <hr />
    </div>
    <div class="video-analytics">
      <h3>Video Analytics</h3>
      <div class="vidList-container">
        <div
          class="vidCard-single"
          v-for="video in getUserVideos"
          :key="video._id"
        >
          <video class="video-res">
            <source :src="video.video_file" type="video/mp4" />
          </video>
          <div class="card-detail">
            <h4>{{ video.name }}</h4>
            <p>
              {{
                `${video.view} views, ${video.like} like, ${video.dislike} dislike, ${video.rewardPoint} coin`
              }}
            </p>
            <a :href="`/videos/${video._id}`">Watch Video</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'Dashboard',
  data() {
    return {
      summaryDate: '',
      paids: 0
    };
  },
  methods: {
    ...mapActions(['fetchVideoByUser'])
  },
  computed: {
    ...mapGetters(['getUserVideos', 'getUser']),
    getViews() {
      let a = 0;
      this.getUserVideos.forEach(vid => {
        a = a + vid.view;
      });
      return a;
    },
    getRewards() {
      let a = 0;
      this.getUserVideos.forEach(vid => {
        a = a + vid.rewardPoint;
      });
      return a;
    }
  },
  created() {
    this.fetchVideoByUser(this.getUser._id);
    const option = { year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    this.summaryDate = today.toLocaleDateString('en-US', option);
  }
};
</script>

<style scoped>
.channel-analytics p {
  color: rgb(110, 110, 110);
}
table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
}

table tr {
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  padding: 0.35em;
}

table td {
  padding: 0.625em 3em;
  text-align: left;
  font-size: 1.5rem;
}

/* //VIDEO List */
.vidList-container {
  margin: 16px 0;
}
.vidCard-single {
  display: flex;
  border: none;
  border-bottom: 1px solid rgba(80, 80, 80, 0.2);
  margin: 1rem 0;
  padding-bottom: 1rem;
}
.video-res {
  width: 200px;
  margin: 5px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
  border-radius: 2px;
}
.card-detail {
  margin: 0 20px;
}
</style>
