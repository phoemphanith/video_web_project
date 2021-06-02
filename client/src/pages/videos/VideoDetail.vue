<template>
  <div>
    <the-header></the-header>
    {{ selectedVideo._id }}
    <body class="p-4">
      <div class="container bg-white rounded-lg overflow-hidden shadow">
        <div class="row">
          <div class="col-md-7 col-12">
            <div class="row">
              <div class="col-12 p-0">
                <video class="w-100" controls>
                  <source :src="selectedVideo.video_file" type="video/mp4" />
                </video>
              </div>
            </div>
            <div class="row pt-2 pb-3">
              <div class="col-12">
                <div>
                  <h4 class="font-weight-bold">{{ selectedVideo.name }}</h4>
                  <button
                    v-bind:class="{
                      whiteLike: clickedLike,
                      blueLike: !clickedLike,
                    }"
                    v-on:click="increaseLike(clickedLike)"
                  >
                    <i class="far fa-thumbs-up"></i>
                  </button>
                  <p>{{ selectedVideo.like }}</p>
                  <button
                    v-bind:class="{
                      white: clickedDislike,
                      blue: !clickedDislike,
                    }"
                    v-on:click="increaseDislike(clickedDislike)"
                  >
                    <i class="far fa-thumbs-down"></i>
                  </button>
                  <p>{{ selectedVideo.dislike }}</p>
                  <i class="fas fa-coins"></i>
                  <form @submit.prevent="rewardCoins">
                    <input type="number" v-model="coins" />
                    <button type="submit">Submit</button>
                    <p>{{ selectedVideo.rewardPoint }} Coins</p>
                  </form>
                  <p class="text-muted">
                    {{ selectedVideo.view }} views -
                    {{
                      new Date(selectedVideo.publicDate).toLocaleDateString()
                    }}
                  </p>
                  <hr />
                </div>
                <div class="row">
                  <div class="col-auto">
                    <img
                      class="profile rounded-circle"
                      src="https://images.unsplash.com/photo-1494959764136-6be9eb3c261e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                      width="35"
                      height="35"
                    />
                  </div>
                  <div class="col px-0">
                    <h6 class="font-weight-bold mb-0">
                      {{ selectedVideo.user }}
                    </h6>
                    <p class="font-italic text-muted mb-0">Autor</p>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-12">
                    <p>
                      {{ selectedVideo.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-5 col-12 p-0 border-md-left">
            <div class="d-flex flex-column align-items-stretch h-100">
              <div class="bg-light border-bottom pl-3">
                <h6 class="mt-2 font-weight-bold">comments</h6>
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
                      <strong class="mr-auto">James Doe</strong>
                      <small class="text-muted">11 mins ago</small>
                    </div>
                    <div class="toast-body">
                      Hello, world! This is a toast message.
                    </div>
                  </div>
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
                      <strong class="mr-auto">James Doe</strong>
                      <small class="text-muted">11 mins ago</small>
                    </div>
                    <div class="toast-body">
                      Hello, world! This is a toast message.
                    </div>
                  </div>
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
                      <strong class="mr-auto">James Doe</strong>
                      <small class="text-muted">11 mins ago</small>
                    </div>
                    <div class="toast-body">
                      Hello, world! This is a toast message.
                    </div>
                  </div>
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
                      <strong class="mr-auto">James Doe</strong>
                      <small class="text-muted">11 mins ago</small>
                    </div>
                    <div class="toast-body">
                      Hello, world! This is a toast message.
                    </div>
                  </div>
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
                      <strong class="mr-auto">James Doe</strong>
                      <small class="text-muted">11 mins ago</small>
                    </div>
                    <div class="toast-body">
                      Hello, world! This is a toast message.
                    </div>
                  </div>
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
                      <strong class="mr-auto">James Doe</strong>
                      <small class="text-muted">11 mins ago</small>
                    </div>
                    <div class="toast-body">
                      Hello, world! This is a toast message.
                    </div>
                  </div>
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
                      <strong class="mr-auto">James Doe</strong>
                      <small class="text-muted">11 mins ago</small>
                    </div>
                    <div class="toast-body">
                      Hello, world! This is a toast message.
                    </div>
                  </div>
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
                      <strong class="mr-auto">James Doe</strong>
                      <small class="text-muted">11 mins ago</small>
                    </div>
                    <div class="toast-body">
                      Hello, world! This is a toast message.
                    </div>
                  </div>
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
                      <strong class="mr-auto">James Doe</strong>
                      <small class="text-muted">11 mins ago</small>
                    </div>
                    <div class="toast-body">
                      Hello, world! This is a toast message.
                    </div>
                  </div>
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
                      <strong class="mr-auto">James Doe</strong>
                      <small class="text-muted">11 mins ago</small>
                    </div>
                    <div class="toast-body">
                      Hello, world! This is a toast message.
                    </div>
                  </div>
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
                      <strong class="mr-auto">James Doe</strong>
                      <small class="text-muted">11 mins ago</small>
                    </div>
                    <div class="toast-body">
                      Hello, world! This is a toast message.
                    </div>
                  </div>
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
                      <strong class="mr-auto">James Doe</strong>
                      <small class="text-muted">11 mins ago</small>
                    </div>
                    <div class="toast-body">
                      Hello, world! This is a toast message.
                    </div>
                  </div>
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
                      <strong class="mr-auto">James Doe</strong>
                      <small class="text-muted">11 mins ago</small>
                    </div>
                    <div class="toast-body">
                      Hello, world! This is a toast message.
                    </div>
                  </div>
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
                      <strong class="mr-auto">James Doe</strong>
                      <small class="text-muted">11 mins ago</small>
                    </div>
                    <div class="toast-body">
                      Hello, world! This is a toast message.
                    </div>
                  </div>
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
                      <strong class="mr-auto">James Doe</strong>
                      <small class="text-muted">11 mins ago</small>
                    </div>
                    <div class="toast-body">
                      Hello, world! This is a toast message.
                    </div>
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
                  <div class="col-auto">
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
  </div>
</template>

<script>
import axios from "axios";

import { mapGetters } from "vuex";
import TheHeader from "../../components/layout/TheHeader.vue";
export default {
  components: {
    TheHeader,
  },
  data() {
    return {
      selectedVideo: null,
      clickedLike: true,
      clickedDislike: true,
      coins: 0,
    };
  },
  methods: {
    increaseLike: async function (clickedLike) {
      if (clickedLike) {
        (this.clickedLike = false),
          (this.selectedVideo.like = this.selectedVideo.like + 1);
      } else {
        (this.clickedLike = true),
          (this.selectedVideo.like = this.selectedVideo.like - 1);
      }
      await axios.patch(
        `http://localhost:5000/api/videos/${this.selectedVideo._id}`,
        {
          like: this.selectedVideo.like,
        }
      );
    },
    increaseDislike: async function (clickedDislike) {
      if (clickedDislike) {
        this.clickedDislike = false;
        this.selectedVideo.dislike = this.selectedVideo.dislike + 1;
      } else {
        this.clickedDislike = true;
        this.selectedVideo.dislike = this.selectedVideo.dislike - 1;
      }
      await axios.patch(
        `http://localhost:5000/api/videos/${this.selectedVideo._id}`,
        {
          dislike: this.selectedVideo.dislike,
        }
      );
    },
    rewardCoins: function () {
      this.selectedVideo.rewardPoint =
        parseInt(this.selectedVideo.rewardPoint) + parseInt(this.coins);
      this.coins = 0;
    },
  },
  computed: {
    ...mapGetters(["getVideos"]),
  },
  created() {
    // this.selectedVideo = this.$store.getters['videos/videos'].find(
    //   video => video.id === this.id
    // );
    this.selectedVideo = this.getVideos.find(
      (video) => video._id === this.$route.params.id
    );
  },
};
</script>

<style scoped>
.btn-icon {
  width: 44px;
  height: 44px;
}
.chat {
  max-height: 600px;
}
.flex-fill {
  height: 500px;
  overflow: auto;
}
.w-100 {
  width: 100%;
}
@media only screen and (min-width: 768px) {
  .border-md-left {
    border-left: 1px solid #dee2e6 !important;
  }
}
img.profile {
  object-fit: cover;
}

.white {
  background-color: white;
}

.blue {
  background-color: blue;
}

.whiteLike {
  background-color: white;
}

.blueLike {
  background-color: blue;
}
</style>
