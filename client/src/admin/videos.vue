<template>
  <div>
    <hr />
    <p>Videos/</p>
    <hr />
    <h3>Current {{ getUserVideos.length }} videos</h3>
    <table>
      <tr>
        <th>Thumnail</th>
        <th>Title</th>
        <th>Description</th>
        <th>Category</th>
      </tr>
      <tr v-for="video in getUserVideos" :key="video._id">
        <td>
          <video style="max-width: 150px">
            <source :src="video.video_file" type="video/mp4" />
          </video>
        </td>
        <td>{{ video.name }}</td>
        <td>
          {{ video.description.slice(0, 100) }}
          {{ video.description.length > 100 ? '... More' : null }}
        </td>
        <td>{{ video.category }}</td>
        <td>
          <button class="btn-delete" @click="deleteOne(video._id)">
            <i class="fas fa-trash"></i>
          </button>
          <router-link :to="`/admin/edit/${video._id}`" class="btn-edit">
            <i class="fas fa-edit"></i>
          </router-link>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'VideoAdmin',
  methods: {
    ...mapActions(['deleteVideo', 'fetchVideoByUser']),
    deleteOne: function(id) {
      this.deleteVideo(id).then(() => {
        this.$router.go();
      });
    }
  },
  computed: {
    ...mapGetters(['getUserVideos', 'getUser'])
  },
  created() {
    this.fetchVideoByUser(this.getUser._id);
  }
};
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin: 3rem 0;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

.btn-delete,
.btn-edit {
  border: none;
  background: none;
  cursor: pointer;
  color: #333;
}
.btn-delete:hover {
  color: red;
}
.btn-edit:hover {
  color: green;
}
</style>
