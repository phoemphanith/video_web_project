<template>
  <div>
    <the-header></the-header>
    <Checkout v-if="isActive"></Checkout>
    <div class="container mt-4 mb-5">
      <div class="row">
        <div
          class="col-3 col-sm-6 col-md-4"
          v-for="reward in getRewards"
          :key="reward._id"
        >
          <div class="my-card">
            <div
              class="coin-card"
              :style="`border-color: ${reward.border_color};`"
            >
              <i class="fas fa-fan"> {{ reward.rewardPoint }}</i>
            </div>
            <div class="card-block p-3">
              <h4 class="card-title">{{ reward.rewardPoint }} Coins</h4>
              <p>{{ reward.name }}</p>
              <p class="card-text">Price: {{ reward.price }}$</p>
              <button
                class="btn btn-primary"
                @click="buyCoin(reward.rewardPoint)"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="loginAlert" v-if="active">
      <p>Please Sign In to make your opinion count.</p>
      <div class="alert-action">
        <button class="cancel" @click="cancel">CANCEL</button>
        <a href="/login" class="signin" @click="goToSignin">SING IN</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import TheHeader from '../../components/layout/TheHeader.vue';
import Checkout from './checkout.vue';
export default {
  name: 'shop',
  components: {
    TheHeader,
    Checkout
  },
  data() {
    return {
      active: false,
      isActive: false
    };
  },
  methods: {
    ...mapActions(['fetchUsers', 'userBuy', 'fetchRewards']),
    buyCoin: function(myCoin) {
      if (this.isAuth) {
        this.active = false;
        var currentPoint = this.getUser.rewardPoint + myCoin;
        console.log(currentPoint);
        this.userBuy({ id: this.getUser._id, point: currentPoint }).then(() => {
          this.isActive = true;
        });
      } else {
        this.active = true;
      }
    },
    cancel: function() {
      this.active = !this.active;
    }
  },
  computed: {
    ...mapGetters(['getUser', 'isAuth', 'getRewards'])
  },
  created() {
    this.fetchRewards();
  }
};
</script>

<style scoped>
a {
  text-align: center;
}

img {
  height: 365.58px;
  width: 348px;
}

button {
  text-align: center;
}

.my-card {
  width: 100%;

  margin: 2rem 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}
.my-card::before {
  content: '';
  background-image: url('../../../public/PinClipart.com_money-stack-clipart_5665420.png');
  background-repeat: no-repeat;
  background-size: 35%;
  background-position: center;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  opacity: 0.1;
  height: 200px;
  z-index: -2;
}

.loginAlert {
  background-color: rgb(243, 243, 243);
  border-radius: 7px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 20;
  transform: translateX(-50%);
  padding: 20px 40px;
}
.loginAlert p {
  font-size: 1.5rem;
  font-weight: 600;
}
.loginAlert button,
.loginAlert a {
  font-size: 1.4rem;
  font-weight: 600;
  border: none;
  background-color: #5302bd;
  padding: 5px 15px;
  margin: 5px;
  color: white;
  border-radius: 10px;
}
.alert-action {
  display: flex;
  justify-content: flex-end;
}
a.signin {
  color: red;
  text-decoration: none;
}
.btn-primary {
  margin-top: 5px;
  width: 100px;
}
.coin-card {
  border: 3px solid;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}

@media only screen and (min-width: 768px) {
  .border-md-left {
    border-left: 1px solid #dee2e6 !important;
  }
}
@media (max-width: 768px) {
  .title-container {
    display: block;
  }
  .reward-options {
    justify-content: space-around;
  }
}
</style>
