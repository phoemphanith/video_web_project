import axios from 'axios';
export default {
  state() {
    return {
      users: []
    };
  },
  mutations: {
    setUsers(state, payload) {
      state.users = payload;
    }
  },
  actions: {
    async fetchUsers(context) {
      const res = await axios.get('http://localhost:5000/api/user');
      context.commit('setUsers', res.data);
    }
  },
  getters: {
    getUsers(state) {
      return state.users;
    }
  }
};
