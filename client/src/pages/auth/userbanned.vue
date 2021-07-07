<template>
  <div>
    <the-header></the-header>
    <section>
      <div id="card">
        <div class="signwarming">
          <div class="circle">
            <p><i class="fas fa-ban fa-7x"></i></p>
            <p>User had banned</p>
          </div>
        </div>
        <div class="mycontent">
          <h1>Sorry!</h1>
          <h4>YOU HAVE BEEN BANNED</h4>
          <p>
            You do not allow to access videos page. If you want to get unbanned,
            you could try to request. Otherwise, you can log out and watching
            without like or comment.
          </p>
          <button @click="triggerBtn">REQUEST UNBAN</button>
        </div>
      </div>
    </section>
    <div class="shadow" v-show="active">
      <div class="mycontainer">
        <button @click="triggerBtn"><i class="fas fa-times fa-2x"></i></button>

        <form @submit.prevent="sendEmail">
          <label>Name</label>
          <input
            type="text"
            v-model="name"
            name="name"
            placeholder="Your Name"
          />
          <label>Email</label>
          <input
            type="email"
            v-model="email"
            name="email"
            placeholder="Your Email"
          />
          <label>Message</label>
          <textarea
            name="message"
            v-model="message"
            cols="30"
            rows="5"
            placeholder="Message"
          >
          </textarea>

          <input type="submit" value="SEND" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from '../../components/layout/TheHeader.vue';
import emailjs from 'emailjs-com';
export default {
  components: { TheHeader },
  name: 'warming',
  data() {
    return {
      name: '',
      email: '',
      message: '',
      active: false
    };
  },
  methods: {
    triggerBtn() {
      this.active = !this.active;
    },
    sendEmail(e) {
      try {
        emailjs.sendForm(
          'service_itgp25r',
          'template_8rs7wnh',
          e.target,
          'user_wgAnTHqRLmDU7a8gpvos2',
          {
            name: this.name,
            email: this.email,
            message: this.message
          }
        );
      } catch (error) {
        console.log({ message: error });
      }
      // Reset form field
      this.name = '';
      this.email = '';
      this.message = '';
    }
  }
};
</script>

<style scoped>
i {
  color: rgb(110, 110, 110);
  opacity: 0.6;
}
section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  width: 100vw;
  overflow-x: hidden;
}
#card {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 70%;
  background-color: #f0d9e7;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.4);
}
.signwarming {
  width: 50%;
  min-width: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.circle {
  background-color: rgb(236, 236, 236);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 250px;
  border-radius: 50%;
}
.signwarming p:last-child {
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(110, 110, 110);
  opacity: 0.6;
}
.mycontent {
  width: 50%;
  min-width: 250px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.mycontent h1 {
  font-weight: 600;
  color: #ff6b6b;
}
.mycontent h4 {
  font-size: 1.6rem;
  font-weight: 600;
}
.mycontent p {
  font-size: 1.4rem;
  color: rgb(141, 135, 135);
  margin: 3rem 0;
}
.mycontent button {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.4);
}
.mycontent button:hover {
  opacity: 0.9;
}
.mycontent button:active {
  transform: scale(0.98);
}
.shadow {
  background-color: rgba(0, 0, 0, 0.4);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  transition: display 0.5s ease-in;
}
.mycontainer {
  display: block;
  margin: auto;
  text-align: center;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  width: 50%;
  position: relative;
}
.mycontainer button {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  background: none;
  border: none;
}
.mycontainer button:hover .fas {
  color: red;
}

label:first-child {
  margin-top: 25px;
}
label {
  float: left;
}

input[type='text'],
[type='email'],
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type='submit'] {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

input[type='submit']:hover {
  background-color: #45a049;
}
</style>
