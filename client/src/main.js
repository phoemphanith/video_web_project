import { createApp } from 'vue';

import router from './router.js';
import store from './store/index.js';
import App from './App.vue';
import axios from 'axios';

store.subscribe(mutation => {
  switch (mutation.type) {
    case 'set_token':
      if (mutation.payload) {
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${mutation.payload}`;
        localStorage.setItem('TOKEN', mutation.payload);
      } else {
        axios.defaults.headers.common['Authorization'] = null;
        localStorage.removeItem('TOKEN');
      }
      break;
  }
});

store.dispatch('Attempt', localStorage.getItem('TOKEN')).then(() => {
  const app = createApp(App);

  app.use(router);
  app.use(store);

  app.mount('#app');
});
