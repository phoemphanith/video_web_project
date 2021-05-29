import axios from 'axios';
export default {
  state() {
    return {
      categories: []
    };
  },
  mutations: {
    setCategories(state, payload) {
      state.categories = payload;
    },
    addCategory(state, category) {
      state.categories.unshift(category);
    },
    removeCategory(state, id) {
      state.categories = state.categories.filter(cat => cat._id !== id);
    }
  },
  actions: {
    async fetchCategories(context) {
      const res = await axios.get('http://localhost:5000/api/categories');
      context.commit('setCategories', res.data);
    },
    async addNewCategory(context, name) {
      const res = await axios.post(
        'http://localhost:5000/api/categories/add-new-category',
        { name }
      );
      context.commit('addCategory', res.data);
    },
    async deleteCategory(context, id) {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      context.commit('removeCategory', id);
    }
  },
  getters: {
    getCategories(state) {
      return state.categories;
    }
  }
};
