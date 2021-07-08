// import mutations from './mutations.js';
// import actions from './actions.js';
// import getters from './getters.js';

import axios from 'axios';

export default {
  state() {
    return {
      videos: [],
      video: null,
      comments: [],
      userVideos: []
    };
  },
  mutations: {
    setVideos(state, payload) {
      state.videos = payload;
    },
    setVideo(state, payload) {
      state.video = payload;
    },
    removeVideo(state, payload) {
      state.videos = state.videos.filter(video => video._id !== payload);
    },
    setComments(state, payload) {
      state.comments = payload.comments;
    },
    setUserVideos(state, payload) {
      state.userVideos = payload;
    }
  },
  actions: {
    async fetchVideos(context) {
      const res = await axios.get('http://localhost:5000/api/videos');
      context.commit('setVideos', res.data);
    },
    async fetchVideo(context, id) {
      const res = await axios.get(`http://localhost:5000/api/videos/${id}`);

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
    async filterCategories(context, payload) {
      const res = await axios.get(
        `http://localhost:5000/api/videos/category/${payload}`
      );
      context.commit('setVideos', res.data);
    },
    async fetchComments(context, id) {
      const res = await axios.get(`http://localhost:5000/api/comment/${id}`);
      context.commit('setComments', res.data);
    },
    async uploadComment(context, data) {
      await axios.patch(
        `http://localhost:5000/api/videos/${data.videoid}/comment`,
        {
          userid: data.userid,
          comment: data.comment
        }
      );
    },
    async fetchVideoByUser(context, id) {
      const res = await axios.get(
        `http://localhost:5000/api/videos/user/${id}`
      );
      context.commit('setUserVideos', res.data);
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
    getOneVideo(state) {
      return state.video;
    },
    getComments(state) {
      return state.comments;
    },
    getUserVideos(state) {
      return state.userVideos;
    }
  }
};
