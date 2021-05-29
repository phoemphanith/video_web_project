<template>
  <div>
    <hr />
    <p>Dashboard/</p>
    <hr />
    <section id="container">
      <div class="thecontainer">
        <div class="theheader">
          <h3>Category List</h3>
          <button @click="fetchCategories">
            <i class="fas fa-sync-alt"></i> Refreash
          </button>
        </div>

        <hr />
        <form @submit.prevent="addNewCate" class="add-form">
          <input type="text" v-model="name" placeholder="ex. Animal.." />
          <input type="submit" value="Add Category" />
        </form>
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Create Date</th>
          </tr>
          <tr v-for="(d, index) in getCategories" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ d.name }}</td>
            <td>{{ new Date(d.created_on).toLocaleDateString() }}</td>
            <td>
              <button class="btn-delete" @click="deleteCategory(d._id)">
                <i class="fas fa-trash"></i> Delete
              </button>
            </td>
          </tr>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Categories',
  data() {
    return {
      name: ''
    };
  },
  methods: {
    ...mapActions(['fetchCategories', 'addNewCategory', 'deleteCategory']),
    addNewCate() {
      this.addNewCategory(this.name);
      this.name = '';
    }
  },
  computed: {
    ...mapGetters(['getCategories'])
  },
  created() {
    this.fetchCategories();
  }
};
</script>

<style scoped>
#container {
  display: flex;
  justify-content: center;
}
.theheader {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.thecontainer {
  width: 100%;
  max-width: 900px;
  border: 1px solid rgb(172, 171, 171);
  padding: 15px 10px;
}
form {
  display: grid;
  grid-template-columns: 1fr minmax(120px, 10%);
}
form input[type='text'] {
  padding: 10px 10px;
  font-size: 1.5rem;
  border: 1px solid rgb(158, 157, 157);
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}
input:focus {
  outline: none;
}
form input[type='submit'] {
  border: none;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: #e1e5ea;
  margin-left: 3px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
}
form input[type='submit']:active {
  transform: scale(0.98);
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin: 1rem 0;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
tr:nth-child(even) {
  background-color: #dddddd;
}
.btn-delete,
.btn-edit {
  border: none;
  background: none;
  cursor: pointer;
}
.btn-delete:hover {
  color: red;
}
.btn-edit:hover {
  color: green;
}
</style>
