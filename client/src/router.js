import { createRouter, createWebHistory } from 'vue-router';

import videos from './pages/videos/VideoList.vue';
import videosDetail from './pages/videos/VideoDetail.vue';
import login from './pages/auth/Login.vue';
import SignUp from './pages/auth/register.vue';
import Shop from './pages/shop/Shop.vue';

import Admin from './admin/admin.vue';
import Dashboard from './admin/dashboard.vue';
import VideosAdmin from './admin/videos.vue';
import Reward from './admin/reward.vue';
import User from './admin/user.vue';
import Categories from './admin/categories.vue';
import UserInfo from './admin/userInformation.vue';

//video component
import UploadVideo from './admin/components/uploadVideo.vue';
import editVideo from './admin/components/editVideo.vue';

import store from '@/store';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', redirect: '/videos' },
    { path: '/videos', component: videos },
    { path: '/videos/:id', component: videosDetail, props: true },
    { path: '/login', name: 'Login', component: login },
    { path: '/signup', component: SignUp },
    { path: '/shop', component: Shop },
    {
      path: '/admin',
      component: Admin,
      beforeEnter: (to, from, next) => {
        if (!store.getters['isAuth']) {
          return next({ name: 'Login' });
        }
        next();
      },
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
        { path: 'user', component: User },
        { path: 'details', component: UserInfo }
      ]
    }
  ]
});

export default router;
