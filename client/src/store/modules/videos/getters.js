export default {
  videos(state) {
    return state.videos;
  },
  hasVideos(state) {
    return state.videos && state.videos.length > 0;
  }
};