<template>
  <TheHeaderVue />
  <main class="form-signin">
    <form>
      <h1>Login to VideoWeb</h1>

      <div class="formCrtl">
        <label for="email">Email</label>
        <input type="email" name="email" placeholder="Email" required />
      </div>
      <div class="formCrtl">
        <label for="password">Password</label>
        <input type="password" name="password" placeholder="Password" />
      </div>

      <button class="btn-submit" type="submit">Login</button>
      <p>Don’t have an account? <a href="">Sign Up</a></p>
    </form>
  </main>
</template>

<script>
import TheHeaderVue from '../../components/layout/TheHeader.vue';

export default {
  name: 'Login',
  components: {
    TheHeaderVue
  }
};
</script>

<style scoped>
h1 {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}
.form-signin {
  height: 80vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
form {
  background-color: rgba(230, 230, 230, 0.548);
  width: 90vw;
  max-width: 500px;
  padding: 2rem 3.5rem;
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
}
.formCrtl input:focus {
  outline: none;
}
.formCrtl label {
  font-size: 1.3rem;
}
.btn-submit {
  margin: 1rem auto;
  width: 100%;
  padding: 10px 0;
  font-size: 1.2rem;
  font-family: inherit;
  border: none;
  border-radius: 10px;
  background-color: rgba(30, 128, 255, 0.801);
  cursor: pointer;
}

.btn-submit:hover {
  background-color: rgba(30, 128, 255, 0.479);
}

.btn-submit:active {
  outline: none;
  transform: scale(0.98);
}
</style>
