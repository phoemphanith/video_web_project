<template>
  <div>
    <TheHeaderVue />
    <main class="form-signin">
      <form @submit.prevent="submit">
        <h1>Login to VideoWeb</h1>
        <p class="message" v-show="getErr">{{ getErr }}</p>
        <div class="formCrtl">
          <label for="email">Email</label>
          <input
            type="email"
            v-model="form.email"
            placeholder="Enter email address"
            required
          />
        </div>
        <div class="formCrtl">
          <label for="password">Password</label>
          <input
            type="password"
            v-model="form.password"
            placeholder="Enter your password"
            required
          />
        </div>

        <button class="btn-submit" type="submit">Login</button>
        <p class="option">
          Don’t have an account? <router-link to="/signup">Sign Up</router-link>
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
        email: '',
        password: ''
      }
    };
  },
  components: {
    TheHeaderVue
  },
  methods: {
    ...mapActions(['SignIn']),
    async submit() {
      if (this.form) {
        try {
          this.SignIn(this.form).then(() => {
            this.$router.push('/');
          });
        } catch (error) {
          console.log(error);
        }
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
.form-signin {
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
