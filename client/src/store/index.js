import { createStore } from 'vuex';
import categoryModule from './modules/categoryStore.js';
import videosModule from './modules/videos/index.js';
import userModule from './modules/userStore.js';
import rewardModule from './modules/rewardStore.js';

const store = createStore({
  modules: {
    videos: videosModule,
    categories: categoryModule,
    users: userModule,
    rewards: rewardModule
  }
});

export default store;
