<template>
  <div class="checkout-container" v-if="active">
    <div class="checkout">
      <button @click="cancel" class="cancel">
        <i class="fas fa-times"></i>
      </button>
      <form @submit.prevent="cancel">
        <div class="payment-types">
          <div class="payment">
            <input type="checkbox" />
            <img
              src="../../../public/payment/Mastercard-logo.png"
              alt="master-card"
            />
          </div>
          <div class="payment">
            <input type="checkbox" />
            <img src="../../../public/payment/visa_logo.png" alt="Visa-card" />
          </div>
          <div class="payment">
            <input type="checkbox" />
            <img src="../../../public/payment/paypal.png" alt="paypal-card" />
          </div>
        </div>
        <div class="card-number">
          <label>Card Number* </label>
          <input type="number" />
        </div>
        <div class="expire-date">
          <label>Expire Date* </label>
          <input type="number" placeholder="Month" />
          <input type="number" placeholder="Year" />
        </div>
        <div class="cvc">
          <label>CVC* </label>
          <input type="number" />
        </div>
        <hr />
        <div class="sumary">
          <div class="detail">
            <p>Gold</p>
            <p>100 coins</p>
          </div>
          <div class="amount">
            <h3>AMOUNT</h3>
            <h3>$10.3</h3>
          </div>
        </div>
        <hr />
        <button>Checkout</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Checkout',
  data() {
    return {
      active: true
    };
  },
  methods: {
    cancel() {
      alert('Checkout Successfully');
      this.active = false;
    }
  }
};
</script>

<style scoped>
.checkout {
  background-color: #fff;
  padding: 5rem 3rem;
  width: 90%;
  max-width: 600px;
  border-radius: 5px;
  position: relative;
}
.payment-types {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
}
.payment {
  margin: 10px;
}
.payment img {
  max-width: 100px;
  min-width: 60px;
  margin-left: 10px;
}
.card-number,
.expire-date,
.cvc {
  margin: 7px 0;
}
label {
  margin-right: 10px;
}

.card-number input {
  width: 100%;
}
.expire-date input {
  width: 100px;
  margin-right: 10px;
}
.cvc input {
  width: 100px;
}
.sumary {
  background-color: #e1e8eb;
  border-radius: 8px;
  padding: 10px 2rem;
}
.sumary div {
  display: flex;
  justify-content: space-between;
}
.detail p {
  font-size: 1.6rem;
  color: rgb(100, 100, 100);
}
.amount h3 {
  font-size: 2rem;
}
form button {
  font-size: 1.5rem;
  font-weight: 600;
  padding: 10px 30px;
  border: none;
  background-color: #185adb;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
}
form button:hover {
  opacity: 0.9;
}
form button:active {
  transform: scale(0.98);
}
.checkout .cancel {
  position: absolute;
  top: 20px;
  right: 20px;
  border: none;
  background: none;
  font-size: 2rem;
}
.checkout .cancel:active {
  transform: scale(0.96);
}
.checkout .cancel:hover {
  color: red;
}
.checkout-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
