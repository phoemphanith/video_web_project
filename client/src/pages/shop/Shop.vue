<template>
  <div>
    <the-header></the-header>
    <div class="container mt-4 mb-5">
      <div class="row">
        <div class="col-md-4">
          <div class="card">
            <img
              class="card-img-top"
              src="../../../public/PinClipart.com_falling-coins-clipart_5335734.png"
              alt="Card image cap"
            />
            <div class="card-block p-3">
              <h4 class="card-title">50 Coins</h4>
              <p class="card-text">Price: 1$</p>
              <button class="btn btn-primary" @click="buyCoin(50)">
                Buy now
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <img
              class="card-img-top"
              src="../../../public/PinClipart.com_gold-coins-clip-art_5614978.png"
              alt="Card image cap"
            />
            <div class="card-block p-3">
              <h4 class="card-title">150 Coins</h4>
              <p class="card-text">Price: 2$</p>
              <button class="btn btn-primary" @click="buyCoin(150)">
                Buy now
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <img
              class="card-img-top"
              src="../../../public/PinClipart.com_money-stack-clipart_5665420.png"
              alt="Card image cap"
            />
            <div class="card-block p-3">
              <h4 class="card-title">500 Coins</h4>
              <p class="card-text">Price: 5$</p>
              <button class="btn btn-primary" @click="buyCoin(500)">
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
export default {
  name: 'shop',
  components: {
    TheHeader
  },
  data() {
    return {
      active: false
    };
  },
  methods: {
    ...mapActions(['fetchUsers', 'userBuy']),
    buyCoin: function(myCoin) {
      if (this.isAuth) {
        this.active = false;
        var currentPoint = this.getUser.rewardPoint + myCoin;
        console.log(currentPoint);
        this.userBuy(myCoin);
      } else {
        this.active = true;
      }
    },
    cancel: function() {
      this.active = !this.active;
    }
  },
  computed: {
    ...mapGetters(['getUser', 'isAuth'])
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

.card {
  border: purple solid 1px;
  margin: 5% 0 0 0;
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
