<template>
  <material-card color="green" :title="title" :text="subTitle" full-width>
    <v-btn flat slot="menu" @click="jobNewDialog = true">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-list two-line>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon color="blue">mdi-map-marker</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>ไอซีอี</v-list-tile-title>
          <v-list-tile-sub-title>งามวงศวาน</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-card-text>
      <v-layout>
        <v-flex xs6 text-xs-left>
          <v-avatar size="40" color="grey lighten-4">
            <img src="https://cdn.vuetifyjs.com/images/lists/2.jpg" alt="avatar">
          </v-avatar>
        </v-flex>
        <v-flex xs6 text-xs-right>
          <v-btn color="success" round class="font-weight-light">คนขับรถ</v-btn>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-text>
      <v-layout>
        <v-flex xs12>
          <v-btn block color="primary">ออกรถ</v-btn>
        </v-flex>
      </v-layout>
    </v-card-text>

    <v-layout row justify-center>
      <v-dialog
        v-model="jobNewDialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <JobSelectionComp @success="getJobIdSelected"/>
      </v-dialog>
    </v-layout>
  </material-card>
</template>

<script>
import JobSelectionComp from "@/viewComponents/JobSelectionComp.vue";
import collect from "collect.js";

export default {
  components: {
    JobSelectionComp
  },
  data: () => ({
    service: "jobtripcommand",
    title: "",
    subTitle: "",
    jobNewDialog: false
  }),
  props: ["Trip"],
  mounted: function() {
    this.title =
      this.Trip.vehicle.LicensePlate + " (" + this.Trip.TripCode + ")";
    this.subTitle =
      "ขนได้ " +
      this.Trip.vehicle.Limit +
      " กก. " +
      this.Trip.vehicle.LimitCC +
      " cc";
  },
  methods: {
    deleteTrip() {
      alert("Delete");
    },

    getJobIdSelected(jobId) {
      this.saveToServer(jobId);
      this.jobNewDialog = false;
    },
    async saveToServer(jobId) {
      try {
        if (jobId.length > 0) {
          let newTodo = { JobId: jobId, TripId: this.Trip.Id };
          let jobIdCreated = await this.$store.dispatch(this.service + "/create", newTodo);
          alert(JSON.stringify(jobIdCreated));
          // alert("sent : " + JSON.stringify(jobId) + "return : " + JSON.stringify(jobIdCreated));
          // let errorList = 0; //[jobId] collectdiff result;
          // const collection = collect(jobId);
          // const diff = collection.diff(jobIdReturn);
          // errorList = diff.all();
          // alert(JSON.stringify(errorList));

          // if (errorList.length > 0) {
          //   alert("ไม่สามารถเพิ่ม ได้ id " + errorList + "ได้");
          // }
        }
      } catch (err) {
        console.log(err);
        alert("ไม่สามารถเพิ่ม Job ได้");
      }
    }
  }
};
</script>
