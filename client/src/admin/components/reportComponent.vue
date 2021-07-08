<template>
  <div class="video-report">
    <div class="video-container">
      <button @click="toggleContent" type="button" class="collapsible">
        <div class="vidCard-single">
          <video class="video-res">
            <source :src="url" type="video/mp4" />
          </video>
          <div class="card-detail">
            <h2>{{ name }}</h2>
            <p>Post on | {{ date }}</p>
            <p>{{ reports.length }} Reports</p>
          </div>
        </div>
        <i
          class="fas fa-2x"
          :class="`${active ? 'fa-angle-up' : 'fa-angle-down'}`"
        ></i>
      </button>
    </div>

    <div class="mycontent" :class="`${active ? 'active' : ''}`">
      <table>
        <tr>
          <th>Report Number</th>
          <th>Video Problem</th>
          <th>Sound Problem</th>
          <th>Other Problem</th>
        </tr>
        <tr v-for="(report, index) in reports" :key="index">
          <td>
            {{ index + 1 }}
          </td>
          <td>
            <i
              class="far"
              :class="
                `${
                  !report.video_problem ? 'fa-check-circle' : 'fa-times-circle'
                }`
              "
            ></i>
          </td>
          <td>
            <i
              class="far"
              :class="
                `${
                  !report.sound_problem ? 'fa-check-circle' : 'fa-times-circle'
                }`
              "
            ></i>
          </td>
          <td>{{ report.other_problem }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ReportComponent',
  props: {
    id: String,
    url: String,
    name: String,
    date: String
  },
  data() {
    return {
      active: false,
      reports: []
    };
  },
  methods: {
    toggleContent() {
      this.active = !this.active;
    }
  },
  async created() {
    const res = await axios.get(`http://localhost:5000/api/report/${this.id}`);
    this.reports = res.data;
  }
};
</script>
<style scoped>
.vidCard-single {
  display: flex;
  border: none;
  margin: 1rem 0;
  padding-bottom: 1rem;
}
.video-res {
  width: 200px;
  margin: 5px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
  border-radius: 2px;
}
.card-detail {
  margin: 0 20px;
}
.video-report {
  margin: 10px 0;
  border-radius: 10px;
  overflow: hidden;
}
/* Style the button that is used to open and close the collapsible content */
.collapsible {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 5px 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  position: relative;
}
.fas {
  position: absolute;
  right: 20px;
  top: 20px;
}

/* Add a background color to the button if it is clicked on (add the .active class with JS), and when you move the mouse over it (hover) */
.active,
.collapsible:hover {
  background-color: #ccc;
}

/* Style the collapsible content. Note: hidden by default */
.mycontent {
  padding: 0 18px;
  display: none;
  min-height: 0;
  overflow: hidden;
  background-color: #f1f1f1;
  transition: all 0.4s ease-in-out;
}
.mycontent.active {
  display: block;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin: 3rem 0;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
</style>
