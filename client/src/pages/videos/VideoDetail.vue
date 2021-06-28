<template>
  <div>
    <the-header></the-header>
    <body class="p-4">
      <div class="container-sm bg-white rounded-lg overflow-hidden shadow">
        <div class="row">
          <div class="col-md-9 col-12">
            <div class="row">
              <div class="col-12 p-0">
                <video class="w-100" controls>
                  <source :src="selectedVideo.video_file" type="video/mp4" />
                </video>
              </div>
            </div>
            <div class="row pt-2 pb-3">
              <div class="col-12">
                <div class="title-container">
                  <div class="title-date">
                    <h4 class="font-weight-bold">{{ selectedVideo.name }}</h4>
                    <p class="text-muted">
                      {{ selectedVideo.view }} views -
                      {{ selectedVideo.rewardPoint }} Coins -
                      {{
                        new Date(selectedVideo.publicDate).toLocaleDateString()
                      }}
                    </p>
                  </div>

                  <div class="reward-options">
                    <button
                      v-bind:class="{
                        whiteLike: clickedLike,
                        blueLike: !clickedLike
                      }"
                      v-on:click="increaseLike(clickedLike)"
                    >
                      <i class="far fa-thumbs-up"></i>
                      {{ selectedVideo.like }} likes
                    </button>

                    <button
                      v-bind:class="{
                        white: clickedDislike,
                        blue: !clickedDislike
                      }"
                      v-on:click="increaseDislike(clickedDislike)"
                    >
                      <i class="far fa-thumbs-down"></i>
                      {{ selectedVideo.dislike }} dislike
                    </button>
                    <form class="gift-container">
                      <label><i class="fas fa-coins"></i> Gift</label>
                      <select v-model="coins" @change="rewardCoins">
                        <option value="" selected>--Reward below--</option>
                        <option
                          v-for="reward in rewards"
                          :key="reward._id"
                          :value="reward.rewardPoint"
                        >
                          {{ reward.rewardPoint }} - {{ reward.name }}
                        </option>
                      </select>
                    </form>
                    <button><i class="fas fa-share"></i> Share</button>
                  </div>
                </div>
                <hr />
                <div class="row myrow trim">
                  <div class="col-auto mycol">
                    <img
                      class="profile rounded-circle myimg"
                      src="https://images.unsplash.com/photo-1494959764136-6be9eb3c261e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                      width="50"
                      height="50"
                    />
                  </div>
                  <div class="col px-0 mycol">
                    <h5 class="font-weight-bold mb-0">
                      {{
                        getUsers.find(user => user._id === selectedVideo.user)
                          .name
                      }}
                    </h5>
                    <p class="font-italic text-muted mb-0">Autor</p>
                  </div>
                </div>
                <div class="row mt-3 trim">
                  <div class="col-12">
                    <p>
                      {{ selectedVideo.description }}
                    </p>
                  </div>
                </div>
                <hr />
              </div>
            </div>
          </div>

          <div class="col-md-3 col-12 p-0 border-md-left">
            <div class="d-flex flex-column align-items-stretch h-100">
              <div class="bg-light border-bottom pl-3">
                <h4 class="mt-2 font-weight-bold">Comments</h4>
              </div>
              <div class="flex-fill">
                <div class="chat p-4 overflow-auto">
                  <div
                    class="toast w-100 mw-100 shadow-none"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                    data-autohide="false"
                  >
                    <div class="toast-header">
                      <img
                        src="https://images.unsplash.com/photo-1494959764136-6be9eb3c261e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                        class="rounded mr-2"
                        alt="..."
                        width="30"
                        height="30"
                      />
                      <strong class="mr-auto"> James Doe </strong>
                      <small class="text-muted">11 mins ago</small>
                    </div>
                    <p class="toast-body">
                      Hello, world! This is a toast message.
                    </p>
                  </div>
                </div>
              </div>

              <form class="w-100 px-4 py-4 bg-light border-top">
                <div class="form-row align-items-center">
                  <div class="col">
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="2"
                    ></textarea>
                  </div>
                  <div class="col">
                    <button
                      type="submit"
                      class="btn btn-primary btn-icon rounded-circle shadow-sm"
                    >
                      <i class="fas fa-paper-plane"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </body>
    <div class="loginAlert" v-if="active">
      <p>Please Sign In to make your opinion count.</p>
      <div class="alert-action">
        <button class="cancel" @click="cancel">CANCEL</button>
        <button class="signin" @click="goToSignin">SING IN</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import { mapActions, mapGetters } from 'vuex';
import TheHeader from '../../components/layout/TheHeader.vue';
export default {
  components: {
    TheHeader
  },
  data() {
    return {
      selectedVideo: null,
      clickedLike: true,
      clickedDislike: true,
      coins: 0,
      rewards: null,
      count: 0,
      active: false
    };
  },
  methods: {
    ...mapActions(['fetchUsers']),
    increaseLike: async function(clickedLike) {
      if (this.isAuth) {
        if (clickedLike) {
          this.clickedLike = false;
          this.selectedVideo.like = this.selectedVideo.like + 1;
          if (this.count > 0) {
            this.clickedDislike = true;
            this.selectedVideo.dislike = this.selectedVideo.dislike - 1;
          }
          this.count += 1;
        } else {
          this.clickedLike = true;
          this.selectedVideo.like = this.selectedVideo.like - 1;
          this.count = 0;
        }
        await axios.patch(
          `http://localhost:5000/api/videos/${this.selectedVideo._id}`,
          {
            like: this.selectedVideo.like
          }
        );
      } else {
        this.active = !this.active;
      }
    },
    increaseDislike: async function(clickedDislike) {
      if (this.isAuth) {
        if (clickedDislike) {
          this.clickedDislike = false;
          this.selectedVideo.dislike = this.selectedVideo.dislike + 1;
          if (this.count > 0) {
            this.clickedLike = true;
            this.selectedVideo.like = this.selectedVideo.like - 1;
          }
          this.count += 1;
        } else {
          this.clickedDislike = true;
          this.selectedVideo.dislike = this.selectedVideo.dislike - 1;
          this.count = 0;
        }
        await axios.patch(
          `http://localhost:5000/api/videos/${this.selectedVideo._id}`,
          {
            dislike: this.selectedVideo.dislike
          }
        );
      } else {
        this.active = !this.active;
      }
    },
    rewardCoins: function() {
      this.selectedVideo.rewardPoint =
        parseInt(this.selectedVideo.rewardPoint) + parseInt(this.coins);
      this.coins = 0;
    },
    cancel: function() {
      this.active = !this.active;
    },
    goToSignin: function() {
      this.$router.replace({ name: 'Login' });
    }
  },
  computed: {
    ...mapGetters(['getVideos', 'getUsers', 'isAuth'])
  },
  async created() {
    // this.selectedVideo = this.$store.getters['videos/videos'].find(
    //   video => video.id === this.id
    // );
    this.selectedVideo = this.getVideos.find(
      video => video._id === this.$route.params.id
    );
    const res = await axios.get('http://localhost:5000/api/reward');
    console.log(res.data);
    this.rewards = res.data;
  }
};
</script>

<style scoped>
body {
  margin: 2% 10%;
}

.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.reward-options {
  display: flex;
}
.reward-options button {
  background: none;
  border: none;
  padding: 10px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.5);
  border-radius: 1px;
  margin: 5px;
}
.reward-options button:hover {
  border-bottom-color: #3d008d;
}
.gift-container {
  position: relative;
  background-color: rgba(0, 0, 0, 0);
  z-index: 1;
}

.gift-container label {
  font-weight: 500;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: -1;
}
.gift-container select {
  border: none;
  background-color: rgba(0, 0, 0, 0);
  border-bottom: 2px solid rgba(0, 0, 0, 0.5);
  cursor: pointer;
  height: 90%;
}
.gift-container select:hover {
  border-bottom-color: #3d008d;
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
.btn-icon {
  width: 44px;
  height: 44px;
}
.chat {
  max-height: 600px;
}
.flex-fill {
  overflow: auto;
}
.toast {
  margin: 10px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
p.toast-body {
  font-size: 1.5rem;
  color: #333;
  margin: 5px 0;
}
.w-100 {
  width: 100%;
}
img.profile {
  object-fit: cover;
}
.profile {
  border-radius: 50%;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}
.white {
  background-color: white;
}

.blue {
  background-color: blue;
  color: red;
}

.whiteLike {
  background-color: white;
}

.blueLike {
  background-color: blue;
  color: blue;
}

/* Admin area */
.row.trim {
  padding: 0px 15px;
}
.myrow {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.mycol {
  margin-right: 20px;
}
hr {
  border-color: rgba(0, 0, 0, 0.2);
  border-width: 2px;
}
h4.font-weight-bold {
  font-size: 2rem;
  font-weight: 600;
}
h5.font-weight-bold {
  font-size: 1.8rem;
  font-weight: 500;
  margin-bottom: 0;
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
.loginAlert button {
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
button.signin {
  color: red;
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
