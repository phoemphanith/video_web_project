<template>
  <div>
    <hr />
    <p>Videos/</p>
    <hr />
    <h3>User Lists</h3>
    <table>
      <thead>
        <tr>
          <th scope="col">&#8470;</th>
          <th>Email</th>
          <th scope="col">Name</th>
          <th scope="col">Registered</th>
          <th scope="col">Role</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(user, index) in getUsers"
          :key="index"
          :class="`${user.isActive ? '' : 'banned'}`"
        >
          <td data-label="Id">{{ index + 1 }}</td>
          <td data-lable="Email">{{ user.email }}</td>
          <td data-label="Name">{{ user.name }}</td>
          <td data-label="Registered">
            {{ new Date(user.createdAt).toLocaleDateString() }}
          </td>
          <td data-label="Role">{{ user.isAdmin ? 'Admin' : 'Member' }}</td>
          <td data-label="Status">
            {{ user.isActive ? 'Active' : 'Banned' }}
            <button class="btn-active" @click="changeStatus(user._id, true)">
              <i class="fas fa-check-circle"></i>
            </button>
            <button class="btn-ban" @click="changeStatus(user._id, false)">
              <i class="fas fa-ban"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'User',
  methods: {
    ...mapActions(['fetchUsers', 'isBanned']),
    changeStatus(i, status) {
      this.isBanned({ id: i, isActive: status }).then(() => {
        this.$router.go();
      });
    }
  },
  computed: {
    ...mapGetters(['getUsers'])
  },
  created() {
    this.fetchUsers();
  }
};
</script>

<style scoped>
table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
}

table caption {
  font-size: 1.5em;
  margin: 0.5em 0 0.75em;
}

table tr {
  background-color: #e4e4e4;
  border: 1px solid rgb(236, 236, 236);
  padding: 0.35em;
}

table tr.banned {
  opacity: 0.9;
  background-color: #f8f8f8;
}

table th,
table td {
  padding: 0.625em;
  text-align: center;
}

table th {
  font-size: 0.85em;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.btn-active,
.btn-ban {
  border: none;
  background: none;
  padding: 0;
  font-size: 17px;
}
.btn-active {
  margin-right: 3px;
  color: rgb(151, 252, 0);
}
.btn-active:hover,
.btn-ban:hover {
  color: black;
}
.btn-ban {
  color: red;
}

@media screen and (max-width: 600px) {
  table {
    border: 0;
  }

  table caption {
    font-size: 1.3em;
  }

  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: 0.625em;
  }

  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: 0.8em;
    text-align: right;
  }

  table td::before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }

  table td:last-child {
    border-bottom: 0;
  }
}
</style>
