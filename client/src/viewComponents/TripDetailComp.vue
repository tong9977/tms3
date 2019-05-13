<template>
  <material-card color="green" :title="title" :text="subTitle" full-width>
    <v-btn flat slot="menu" @click="CallJobDialog">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-layout row wrap>
      <v-flex xs6>
        <v-progress-linear color="secondary" height="5" :value="(weight/weightMax)*100"></v-progress-linear>
      </v-flex>
      <v-flex xs6>
        <p>
          <span>{{weight}} / {{weightMax}}</span>
          <span>kg</span>
        </p>
      </v-flex>
      <v-flex xs6>
        <v-progress-linear color="secondary" height="5" :value="(limit/limitMax)*100"></v-progress-linear>
      </v-flex>
      <v-flex xs6>
        <p>
          <span>{{limit}} / {{limitMax}}</span>
          <span>cc</span>
        </p>
      </v-flex>
    </v-layout>
    <v-list two-line v-for="j in Trip.jobs" :key="j.Id">
      <v-list-tile @click="GotoTripDetailMobie(j)">
        <v-list-tile-action>
          <v-icon color="blue">mdi-map-marker</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{j.Customer}} {{ j.Weight }} Kg. {{ j.CC }} CC</v-list-tile-title>
          <v-list-tile-sub-title>{{j.ContactPerson}} ({{j.Telephone}})</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-card-text>
      <v-layout>
         <div >
          <v-btn color="success" round @click="CallUserDialog">คนขับรถ</v-btn>
        </div>
        <div v-for="u in Trip.users" :key="u.Id" class="pa-2">
          <v-avatar size="40" color="grey lighten-4">
            <img :src="u.ImageUrl" alt="avatar">
          </v-avatar>
        </div>  
      </v-layout>
    </v-card-text>
    <v-card-text>
      <v-layout>
        <v-flex xs12>
          <v-btn @click="onDelete()" v-if="!Trip.Approve" block color="primary">ออกรถ</v-btn>
          <p v-if="Trip.Approve">ออกรถแล้ว</p>
        </v-flex>
      </v-layout>
    </v-card-text>

    <!-- dialog สำหรับออกรถ -->
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">ยืนยันการออกรถ</span>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex>ต้องการยืนยันการออกรถ ใช่หรือไม่?</v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="closeDialog">ยกเลิก</v-btn>
          <v-btn
            color="blue darken-1"
            flat
            :loading="loading"
            @click="confirmStartTrip"
          >ยืนยันการออกรถ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Add Job -->
    <v-layout row justify-center>
      <v-dialog
        v-model="jobNewDialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <JobSelectionComp ref="JobSelectionComp" @success="getJobIdSelected"/>
      </v-dialog>
    </v-layout>

    <!-- Add User -->
    <v-layout row justify-center>
      <v-dialog
        v-model="userNewDialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <UserSelectionComp ref="UserSelectionComp" @success="getUserIdSelected"/>
      </v-dialog>
    </v-layout>
  </material-card>
</template>

<script>
import JobSelectionComp from "@/viewComponents/JobSelectionComp.vue";
import UserSelectionComp from "@/viewComponents/UserSelectionComp.vue";
import collect from "collect.js";

export default {
  components: {
    JobSelectionComp,
    UserSelectionComp
  },
  data: () => ({
    title: "",
    subTitle: "",
    jobNewDialog: false,
    userNewDialog: false,

    weight: 0,
    weightMax: 0,
    limit: 0,
    limitMax: 0,

    dialog: false,
    dialogDelete: false
  }),
  props: ["Trip"],
  mounted: function() {
    this.title =
      this.Trip.vehicles.LicensePlate + " [" + this.Trip.Id + "]";
    this.subTitle =
      "ขนได้ " +
      this.Trip.vehicles.Limit +
      " กก. " +
      this.Trip.vehicles.LimitCC +
      " cc";
      this.render();
  },
  methods: {
    async render() {
      //find ใหม่ เอาแค่ตัวเดียวที่เพิ่มแล้วสั่ง this.Trip = ที่ get มาใหม่
      let res = await this.$store.dispatch("trips/find", {
        query: { Id: this.Trip.Id, $eager: "[vehicles,users,jobs]" }
      });

      this.Trip = res.data[0];
      const collection1 = collect(this.Trip.jobs);
      let sumWeight = collection1.sum("Weight");
      this.weight = sumWeight; //Jobs
      this.weightMax = this.Trip.vehicles.Limit;

      const collection2 = collect(this.Trip.jobs);
      let sumLimit = collection2.sum("CC");
      this.limit = sumLimit; //Jobs
      this.limitMax = this.Trip.vehicles.LimitCC;
    },
    //Add Job
    async CallJobDialog() {
      await this.$refs.JobSelectionComp.ready();
      this.jobNewDialog = true;
    },
    getJobIdSelected(jobId) {
      this.saveJobToServer(jobId);
      this.jobNewDialog = false;
    },
    async saveJobToServer(jobId) {
      try {
        if (jobId.length > 0) {
          let newTodo = { JobId: jobId, TripId: this.Trip.Id };
          let jobIdCreated = await this.$store.dispatch(
            "jobtripcommand/create",
            newTodo
          );
          // alert("sent : " + JSON.stringify(jobId) + "return : " + JSON.stringify(jobIdCreated));
          // let errorList = 0; //[jobId] collectdiff result;
          // const collection = collect(jobId);
          // const diff = collection.diff(jobIdReturn);
          // errorList = diff.all();
          // alert(JSON.stringify(errorList));

          if (jobId.length != jobIdCreated.length) {
            let error = jobId.length - jobIdCreated.length;
            alert("ไม่สามารถเพิ่มได้จำนวน " + error + " รายการ");
          }
          this.render();
        }
      } catch (err) {
        console.log(err);
        alert("ไม่สามารถเพิ่ม Job ได้");
      }
    },

    //Add User
    async CallUserDialog() {
      await this.$refs.UserSelectionComp.ready();
      this.userNewDialog = true;
    },
    getUserIdSelected(userId) {
      let userIds = [];
      userIds.push(userId);
      this.saveUserToServer(userIds);
      this.userNewDialog = false;
    },
    async saveUserToServer(userId) {
      try {
        if (userId.length > 0) {
          let newTodo = { UserId: userId, TripId: this.Trip.Id };
          let userIdCreated = await this.$store.dispatch(
            "usertripcommand/create",
            newTodo
          );

          if (userId.length != userIdCreated.length) {
            let error = userId.length - userIdCreated.length;
            alert("ไม่สามารถเพิ่มพนักงานคนนี้ได้");
          }
          this.render();
        }
      } catch (err) {
        console.log(err);
        alert("ไม่สามารถเพิ่มพนักงานคนนี้ได้");
      }
    },

    deleteTrip() {
      alert("Delete");
    },

    async onDelete() {
      this.dialogDelete = true;
    },
    async confirmStartTrip() {
      try {
        await this.$store.dispatch("trips/patch", [
          this.Trip.Id,
          { Approve: true, ApprovedBy: "admin" }
        ]);
      } catch (err) {
        alert("ไม่สามารถยืนยันการออกรถได้");
      } finally {
        this.dialogDelete = false;
      }

      this.render();
    },
    closeDialog() {
      this.dialog = false;
      this.dialogDelete = false;
    },

    GotoTripDetailMobie(job){
      this.$router.push({ name: "JobDetailMobile", params: { Id: job.Id } });
    }
  }
};
</script>
