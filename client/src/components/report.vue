<template>
  <section>
    <div class="report-body" v-if="active">
      <div class="report-card">
        <button @click="cancel" class="btn-cancel">
          <i class="fas fa-times fa-2x"></i>
        </button>
        <h1>What's happening?</h1>
        <p>Check all that apply.</p>
        <form @submit.prevent="submitReport" class="report-form">
          <div class="checkbox-container">
            <input type="checkbox" v-model="form.problem1" />
            <div>
              <label>Video Problem</label>
              <p>Blurry, cuts out, or looks strange in some way.</p>
            </div>
          </div>
          <div class="checkbox-container">
            <input type="checkbox" v-model="form.problem2" />
            <div>
              <label>Sound Problem</label>
              <p>
                Hard to hear, not matched with video, or missing in some parts.
              </p>
            </div>
          </div>
          <label>It's something else</label><br />
          <textarea
            class="report-message"
            placeholder="let us know what's going on"
            v-model="form.otherProblem"
          ></textarea
          ><br />
          <button type="submit">Submit Report</button>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
import axios from 'axios';
export default {
  name: 'Report',
  data() {
    return {
      active: true,
      form: {
        video_problem: false,
        sound_problem: false,
        otherProblem: ''
      }
    };
  },
  props: {
    user: String,
    video: String
  },
  methods: {
    cancel() {
      this.active = false;
    },
    async submitReport() {
      const report = {
        videoId: this.video,
        reports: {
          userId: this.user,
          videoProblem: this.form.video_problem,
          soundProblem: this.form.sound_problem,
          otherProblem: this.form.otherProblem
        }
      };
      await axios.patch('http://localhost:5000/api/report', report).then(() => {
        this.active = false;
        alert('Report is completed! Click ok to continue');
      });
    }
  }
};
</script>
<style scoped>
.report-body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  z-index: 200;
}
.report-card {
  background-color: #4c4c68;
  color: #fff;
  padding: 3rem 5rem;
  border-radius: 7px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
  max-width: 500px;
  position: relative;
}
.report-form {
  margin: 15px 0;
}
.report-card .btn-cancel {
  position: absolute;
  top: 20px;
  right: 30px;
  border: none;
  background: none;
}
.report-card .btn-cancel:active {
  transform: scale(0.98);
}
.report-message {
  width: 100%;
  height: 80px;
  background-color: rgba(23, 23, 50, 0.5);
  color: #fff;
  border: none;
  border-radius: 3px;
  margin: 10px 0;
  padding: 10px;
  font-size: 1.4rem;
}
.report-message:focus {
  outline: none;
}

.checkbox-container {
  display: flex;
}
label {
  font-size: 1.5rem;
}
.label p {
  font-size: 14px;
  color: #dddddd;
}
.checkbox-container input[type='checkbox'] {
  margin-right: 10px;
}

.report-form p {
  margin: 0;
  margin-bottom: 20px;
}

.report-form button {
  font-size: 1.3rem;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.5);
  background-color: #ff7600;
  color: #fff;
  cursor: pointer;
}
.report-form button:active {
  transform: scale(0.98);
}
@media (max-width: 345px) {
  .report-card {
    padding: 2rem 1rem;
  }
}
</style>
