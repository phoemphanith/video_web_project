<template>
  <div>
    <hr />
    <p>Reward/</p>
    <hr />
    <section id="container">
      <div class="thecontainer">
        <div class="theheader">
          <h3>Reward</h3>
          <button class="btn" v-on:click="showCreateReward">
            {{ showAddReward ? 'Close' : 'Create Reward' }}
          </button>
        </div>
        <hr />
        <form @submit.prevent="addReward" v-show="showAddReward">
          <div class="form-ctr">
            <label>Name</label>
            <input type="text" v-model="name" />
          </div>
          <div class="form-ctr">
            <label>Color</label>
            <input type="text" v-model="border_color" />
          </div>
          <div class="form-ctr">
            <label>Coin : {{ valueCoin }}</label>
            <input type="range" v-model="valueCoin" min="10" max="100" />
          </div>
          <button class="btn" type="submit">Save Reward</button>
        </form>

        <div class="reward-list">
          <table>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
            <tr v-for="reward in getRewards" :key="reward._id">
              <td>
                <div
                  class="coin-card"
                  :style="`border-color: ${reward.border_color};`"
                >
                  <i class="fas fa-fan"> {{ reward.rewardPoint }}</i>
                </div>
              </td>
              <td>{{ reward.name }}</td>
              <td>{{ reward.price }}$</td>
              <td>
                <button class="btn-delete" @click="deleteReward(reward._id)">
                  <i class="fas fa-trash"></i> Delete
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'reward',
  data() {
    return {
      name: '',
      border_color: '',
      valueCoin: 10,
      showAddReward: false
    };
  },
  methods: {
    ...mapActions(['fetchRewards', 'addNewReward', 'deleteReward']),
    showCreateReward() {
      this.showAddReward = !this.showAddReward;
    },
    addReward() {
      const newReward = {
        name: this.name,
        border_color: this.border_color,
        rewardPoint: this.valueCoin,
        price: this.valueCoin * 0.05
      };
      this.getRewards.push(newReward);
      this.addNewReward(newReward);
      this.showAddReward = false;
    }
  },
  computed: {
    ...mapGetters(['getRewards'])
  },
  created() {
    this.fetchRewards();
  }
};
</script>

<style scoped>
#container {
  display: flex;
  justify-content: center;
}
.btn {
  background-color: #e1e5ea;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
}
.btn:hover {
  opacity: 0.8;
}
.thecontainer {
  width: 100%;
  max-width: 900px;
  border: 1px solid rgb(172, 171, 171);
  padding: 15px 10px;
  border-radius: 5px;
}
.theheader {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
form {
  background-color: #faf3f3;
  border-radius: 10px;
  padding-top: 15px;
  margin: 0 10px;
  padding: 10px 20px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  transition: all 0.4s ease-in-out;
}
.form-ctr:nth-last-child(1) {
  display: flex;
}
.form-ctr {
  margin: 5px;
}
.form-ctr label {
  margin-right: 5px;
}
form button {
  width: 100%;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
}
input {
  width: 100%;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin: 3rem 0;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
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

.coin-card {
  border: 3px solid;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1px auto;
}
</style>
