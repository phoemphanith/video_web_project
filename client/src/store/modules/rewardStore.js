import axios from 'axios';

export default {
  state() {
    return {
      rewards: []
    };
  },
  mutations: {
    setRewards(state, payload) {
      state.rewards = payload;
    },
    removeReward(state, payload) {
      state.rewards = state.rewards.filter(reward => reward._id !== payload);
    }
  },
  actions: {
    async fetchRewards(context) {
      const res = await axios.get('http://localhost:5000/api/reward');
      console.log(res.data);
      context.commit('setRewards', res.data);
    },
    async addNewReward(context, obj) {
      await axios.post('http://localhost:5000/api/reward', {
        name: obj.name,
        color: obj.border_color,
        coin: obj.rewardPoint
      });
    },
    async deleteReward(context, id) {
      await axios.delete(`http://localhost:5000/api/reward/${id}`);

      context.commit('removeReward', id);
    }
  },
  getters: {
    getRewards(state) {
      return state.rewards;
    }
  }
};
