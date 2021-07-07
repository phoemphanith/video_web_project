import axios from 'axios';

export default {
  state() {
    return {
      token: null,
      userData: null,
      errmessage: null,
      isActive: true
    };
  },
  getters: {
    getUser(state) {
      return state.userData;
    },
    getErr(state) {
      return state.errmessage;
    },
    isAuth(state) {
      return state.token && state.userData;
    },
    checkActive(state) {
      return state.isActive;
    }
  },
  mutations: {
    set_token(state, payload) {
      state.token = payload;
    },
    set_user(state, payload) {
      state.userData = payload;
    },
    set_err(state, payload) {
      state.errmessage = payload;
    },
    set_active(state, payload) {
      state.isActive = payload;
    }
  },
  actions: {
    async SignIn(context, formData) {
      try {
        const res = await axios.post(
          'http://localhost:5000/api/user/login',
          formData
        );
        context.dispatch('Attempt', res.data.token);
        context.commit('set_active', res.data.isActive);
        context.commit('set_err', null);
      } catch (error) {
        context.commit('set_err', error.response.data.message);
      }
    },
    async Attempt({ commit, state }, token) {
      if (token) {
        commit('set_token', token);
      }

      if (!state.token) {
        return;
      }

      try {
        const res = await axios.get('http://localhost:5000/api/user/profile');
        commit('set_user', res.data);
        commit('set_active', res.data.isActive);
      } catch (error) {
        commit('set_token', null);
        commit('set_user', null);
      }
    },
    SignOut({ commit }) {
      commit('set_token', null);
      commit('set_user', null);
    },
    async signUp(context, data) {
      try {
        const res = await axios.post('http://localhost:5000/api/user', data);
        context.dispatch('Attempt', res.data.token);
        context.commit('set_err', null);
      } catch (error) {
        context.commit('set_err', error.response.data.message);
      }
    },
    async userBuy(context, data) {
      await axios.patch(`http://localhost:5000/api/user/${data.id}/userbuy`, {
        rewardPoint: data.point
      });
    }
  }
};
