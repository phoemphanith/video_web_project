<template>
  <div>
    <form
      @submit.prevent="updVideo($route.params.id)"
      enctype="multipart/form-data"
    >
      <h1>Video Update</h1>
      <p class="message" v-show="isCompleted">
        Upload is Completed
        <router-link to="/admin/videos">/Go to video list</router-link>
      </p>
      <label>Video Title</label>
      <input type="text" v-model="title" placeholder="Title ..." />
      <label>Category</label>
      <select v-model="category">
        <option value="" disabled>--Select Video Category--</option>
        <option v-for="cat in getCategories" :key="cat._id" :value="cat.name">
          {{ cat.name }}
        </option>
      </select>
      <label>Video Description</label>
      <input type="text" v-model="description" placeholder="Description ..." />
      <button class="button is-info">UPDATE</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'uploadVideo',
  data() {
    return {
      title: '',
      category: '',
      description: '',
      isCompleted: false
    };
  },
  methods: {
    ...mapActions(['fetchCategories', 'updateVideo']),
    updVideo(id) {
      const dataobj = {
        _id: id,
        name: this.title,
        category: this.category,
        description: this.description
      };
      this.isCompleted = true;
      this.updateVideo(dataobj);
    }
  },
  computed: {
    ...mapGetters(['getCategories', 'getVideos'])
  },
  created() {
    this.fetchCategories();
    const videoId = this.$route.params.id;
    const singleVideo = this.getVideos.find(video => video._id === videoId);

    this.title = singleVideo.name;
    this.description = singleVideo.description;
    this.category = singleVideo.category;
  }
};
</script>

<style scoped>
h1 {
  font-size: 2.5rem;
  text-align: center;
  margin: 10px 0 30px 0;
}
.message {
  background-color: #caf7e3;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
  padding: 5px 0;
  margin-bottom: 20px;
}
input[type='text'],
select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.file-input {
  margin: 10px 0;
}

.button {
  margin: 20px 0;
  width: 100%;
  background-color: #0a81ab;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 7px;
  padding: 10px 0;
  cursor: pointer;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
}
.button:hover {
  opacity: 0.9;
}
.button:active {
  transform: scale(0.98);
}

form {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
}

div {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
