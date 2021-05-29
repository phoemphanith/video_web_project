import { createRouter, createWebHistory } from 'vue-router';

import videos from './pages/videos/VideoList.vue';
import videosDetail from './pages/videos/VideoDetail.vue';
import login from './pages/login/Login.vue';

import Admin from './admin/admin.vue';
import Dashboard from './admin/dashboard.vue';
import VideosAdmin from './admin/videos.vue';
import Reward from './admin/reward.vue';
import User from './admin/user.vue';
import Categories from './admin/categories.vue';

//video component
import UploadVideo from './admin/components/uploadVideo.vue';
import editVideo from './admin/components/editVideo.vue';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/videos' },
    { path: '/videos', component: videos },
    { path: '/videos/:id', component: videosDetail, props: true },
    { path: '/login', component: login },
    {
      path: '/admin',
      component: Admin,
      redirect: '/admin/dashboard',
      children: [
        { path: 'dashboard', component: Dashboard },
        {
          path: 'videos',
          component: VideosAdmin
        },
        { path: 'upload', component: UploadVideo },
        { path: 'edit/:id', component: editVideo },
        { path: 'categories', component: Categories },
        { path: 'reward', component: Reward },
        { path: 'user', component: User }
      ]
    }
  ]
});

export default router;
