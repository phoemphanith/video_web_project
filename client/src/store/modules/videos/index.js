// import mutations from './mutations.js';
// import actions from './actions.js';
// import getters from './getters.js';

import axios from 'axios';

export default {
  state() {
    return {
      videos: [],
      vidoe: null,
      categories: []
    };
  },
  mutations: {
    setVideos(state, payload) {
      state.videos = payload;
    },
    setVideo(state, payload) {
      state.video = payload;
    },
    setCategories(state, payload) {
      state.categories = payload;
    },
    removeVideo(state, payload) {
      state.videos = state.videos.filter(video => video._id !== payload);
    }
  },
  actions: {
    async fetchVideos(context) {
      const res = await axios.get('http://localhost:5000/api/videos');
      context.commit('setVideos', res.data);
    },
    async fetchVideo(context, id) {
      const res = await axios.get(`http://localhost:5000/api/videos/${id}`);
      console.log(res.data);
      context.commit('setVideo', res.data);
    },
    async updateVideo(context, obj) {
      await axios.patch(`http://localhost:5000/api/videos/${obj._id}`, {
        name: obj.name,
        category: obj.category,
        description: obj.description
      });
    },
    async deleteVideo(context, id) {
      await axios.delete(`http://localhost:5000/api/videos/${id}`);

      context.commit('removeVideo', id);
    },
    async fetchCategories(context) {
      const res = await axios.get('http://localhost:5000/api/categories');
      context.commit('setCategories', res.data);
    }
    // async fetchVideo(context) {
    //   const res = await axios.get('http://localhost:5000/api/videos/:id');
    //   console.log(res.data);
    //   context.commit('setVideos', res.data);
    // }
  },
  getters: {
    getVideos(state) {
      return state.videos;
    },
    getVideo(state) {
      return state.video;
    },
    getCategories(state) {
      return state.categories;
    }
    // getVideo(state) {
    //   return state.video._id;
    // }
    // hasVideos(state) {
    //   return state.videos && state.videos.length > 0;
    // }
  }
};
