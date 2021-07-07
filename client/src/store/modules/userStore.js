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
    },
    async isBanned(context, status) {
      await axios.patch(`http://localhost:5000/api/user/${status.id}`, {
        status: status.isActive
      });
    }
  },
  getters: {
    getUsers(state) {
      return state.users;
    }
  }
};
