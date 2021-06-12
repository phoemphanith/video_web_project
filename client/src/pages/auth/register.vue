<template>
  <div>
    <TheHeaderVue />
    <main class="form-signup">
      <form @submit.prevent="registerUser">
        <h1>SignUp to VideoWeb</h1>
        <div class="formCrtl">
          <label>Username</label>
          <input
            type="text"
            v-model="form.name"
            placeholder="Enter your username"
            required
          />
          <p class="message" v-show="uservalid">
            Username must have at less 3 charaters, start with letter
          </p>
        </div>
        <div class="formCrtl">
          <label for="email">Email</label>
          <input
            type="email"
            v-model="form.email"
            placeholder="Enter email address"
            required
          />
          <p class="message" v-show="getErr">* {{ getErr }}</p>
        </div>
        <div class="formCrtl">
          <label for="password">Password</label>
          <input
            type="password"
            v-model="form.password"
            placeholder="Enter password"
            required
          />
          <p class="message" v-show="passwordvalid">
            * Invalid password, at less 8 characters with lowercase, uppercase,
            and number
          </p>
        </div>
        <div class="formCrtl">
          <label>Comfirm Password</label>
          <input
            type="password"
            v-model="passwordcomfirm"
            placeholder="Enter comfirm password"
            required
          />
          <p class="message" v-show="passwordmatch">
            * Password not match
          </p>
        </div>

        <button class="btn-submit" type="submit">SignUp</button>
        <p class="option">
          You have an account? <router-link to="/login">Login</router-link>
        </p>
      </form>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import TheHeaderVue from '../../components/layout/TheHeader.vue';

export default {
  name: 'Login',
  data() {
    return {
      form: {
        name: null,
        email: null,
        password: null
      },
      passwordcomfirm: null,
      uservalid: false,
      emailvalid: false,
      passwordvalid: false,
      passwordmatch: false
    };
  },
  components: {
    TheHeaderVue
  },
  methods: {
    ...mapActions(['signUp']),
    checkName(d) {
      if (d.length < 3 || d.match(/^\d/)) {
        this.uservalid = true;
        return false;
      }
      this.uservalid = false;
      return true;
    },
    checkPassword(d) {
      if (
        d.length > 8 &&
        d.match(/[A-Z]/g) &&
        d.match(/[a-z]/g) &&
        d.match(/[0-9]/g)
      ) {
        this.passwordvalid = false;
        return true;
      }
      this.passwordvalid = true;
      return false;
    },
    checkComfirmPass(p1, p2) {
      if (p1 === p2) {
        this.passwordmatch = false;
        return true;
      }
      this.passwordmatch = true;
      return false;
    },
    registerUser() {
      if (
        this.checkName(this.form.name) &&
        this.checkPassword(this.form.password) &&
        this.checkComfirmPass(this.form.password, this.passwordcomfirm)
      ) {
        this.signUp(this.form).then(() => {
          this.$router.replace({ name: 'Home' });
        });
      } else {
        console.log('Fail');
      }
    }
  },
  computed: {
    ...mapGetters(['getErr'])
  }
};
</script>

<style scoped>
h1 {
  font-size: 2rem;
  margin-bottom: 25px;
  text-align: center;
  font-weight: 600;
  color: #333;
}
p.option {
  text-align: center;
}
.message {
  color: red;
}
.form-signup {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5rem 0;
  overflow-x: hidden;
}
form {
  background-color: #004ab80a;
  width: 90vw;
  max-width: 500px;
  padding: 3rem 3.5rem;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.226);
}
.formCrtl {
  margin-top: 1.2rem;
}
.formCrtl input {
  width: 100%;
  font-size: 1.2rem;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1.3rem;
}
.formCrtl input:focus {
  outline: none;
}
.formCrtl label {
  font-size: 1.3rem;
}
.btn-submit {
  margin: 2rem auto;
  width: 100%;
  padding: 10px 0;
  font-size: 1.5rem;
  font-family: inherit;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  background-color: #3b14a7;
  color: #fff;
  cursor: pointer;
  transition: opacity 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.btn-submit:hover {
  opacity: 0.8;
}

.btn-submit:active {
  outline: none;
  transform: scale(0.98);
}
</style>
