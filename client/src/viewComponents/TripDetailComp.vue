<template>
  <material-card color="green" :title="title" :text="subTitle" full-width>
    <v-btn flat slot="menu" @click="CallJobDialog">
      <v-spacer></v-spacer>
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
      <v-list-tile>
        <v-list-tile-action>
          <v-icon color="green" v-if="j.JobStatusId == 2">mdi-map-marker</v-icon>
          <v-icon color="green" v-if="j.JobStatusId == 3">mdi-check</v-icon>
          <v-icon color="green" v-if="j.JobStatusId == 4">mdi-check-all</v-icon>
        </v-list-tile-action>
        <v-list-tile-content @click="GotoTripDetailMobie(j)">
          <v-list-tile-title>{{j.Customer}} {{ j.Weight }} Kg. {{ j.CC }} CC</v-list-tile-title>
          <v-list-tile-sub-title>{{j.ContactPerson}} ({{j.Telephone}})</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon ripple @click="CallDeleteJobDialog(j.Id)">
            <v-icon color="grey lighten-1">mdi-close-circle</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
    <v-card-text>
      <v-layout>
        <div>
          <v-btn color="success" round @click="CallUserDialog">คนขับรถ</v-btn>
        </div>
        <div v-for="u in Trip.users" :key="u.Id" class="pa-2">
          <v-avatar size="40" color="grey lighten-4" @click="CallDeleteUserDialog(u.Id)">
            <img :src="u.ImageUrl" alt="avatar">
          </v-avatar>
          <p v-if="isLeader(u.Id)"><small>หัวหน้า</small></p>
        </div>
      </v-layout>
    </v-card-text>
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
    <!-- dialog สำหรับลบ User -->
    <v-dialog v-model="confirmDeleteUserDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">ดำเนินการ</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex>
                <v-checkbox v-model="leader" label="หัวหน้า"></v-checkbox>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="cancel">ยกเลิก</v-btn>
          <v-btn color="blue darken-1" flat :loading="loading" @click="confirmSetLeader()">ยืนยัน</v-btn>
        </v-card-actions>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex>ต้องการเอาพนักงานคนนี้ออกจาก Trip นี้ ใช่หรือไม่?</v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="cancel">ยกเลิก</v-btn>
          <v-btn color="blue darken-1" flat :loading="loading" @click="confirmDeleteUser()">ยืนยัน</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-card-text>
      <v-layout>
        <v-flex xs12>
          <v-btn @click="CallStartTripDialog()" v-if="!Trip.Approve" block color="primary">อนุมัติ</v-btn>
          <p v-if="Trip.Approve" class="text-md-center">อนุมัติแล้ว</p>
        </v-flex>
      </v-layout>
    </v-card-text>
    <!-- dialog สำหรับยินยันการออกรถ -->
    <v-dialog v-model="confirmStartTripDialog" max-width="500px">
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
          <v-btn color="blue darken-1" flat @click="cancelStartTrip">ยกเลิก</v-btn>
          <v-btn color="blue darken-1" flat :loading="loading" @click="confirmStartTrip">ตกลง</v-btn>
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
    <!-- dialog สำหรับลบ Job -->
    <v-dialog v-model="confirmDeleteJobDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">ยืนยันการเอาใบงานออก</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex>ต้องการเอาใบงานใบนี้ออกจาก Trip นี้ ใช่หรือไม่?</v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="cancelDeleteJob">ยกเลิก</v-btn>
          <v-btn color="blue darken-1" flat :loading="loading" @click="confirmDeleteJob()">ตกลง</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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

    weight: 0,
    weightMax: 0,
    limit: 0,
    limitMax: 0,

    confirmStartTripDialog: false,

    jobNewDialog: false,
    confirmDeleteJobDialog: false,
    jobIdSelected: 0,

    userNewDialog: false,
    confirmDeleteUserDialog: false,
    userIdSelected: 0,
    leader: false
  }),
  props: ["Trip"],
  mounted: function() {
    this.title = this.Trip.vehicle.LicensePlate + " [" + this.Trip.Id + "]";
    this.subTitle =
      "ขนได้ " +
      this.Trip.vehicle.Limit +
      " กก. " +
      this.Trip.vehicle.LimitCC +
      " cc";
    this.render();
  },
  methods: {
    async render() {
      //find ใหม่ เอาแค่ตัวเดียวที่เพิ่มแล้วสั่ง this.Trip = ที่ get มาใหม่
      let res = await this.$store.dispatch("trips/find", {
        query: { Id: this.Trip.Id, $eager: "[vehicle,users,jobs,usertrips]" }
      });

      this.Trip = res.data[0];
      const collection1 = collect(this.Trip.jobs);
      let sumWeight = collection1.sum("Weight");
      this.weight = sumWeight; //Jobs
      this.weightMax = this.Trip.vehicle.Limit;

      const collection2 = collect(this.Trip.jobs);
      let sumLimit = collection2.sum("CC");
      this.limit = sumLimit; //Jobs
      this.limitMax = this.Trip.vehicle.LimitCC;

      this.jobIdSelected = 0;
      this.userIdSelected = 0;
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
    CallDeleteJobDialog(jobId) {
      this.jobIdSelected = jobId;
      this.confirmDeleteJobDialog = true;
    },
    cancelDeleteJob() {
      this.jobIdSelected = 0;
      this.confirmDeleteJobDialog = false;
    },
    async confirmDeleteJob() {
      try {
        await this.$store.dispatch("jobtripcommand/remove", { JobId: this.jobIdSelected, TripId: this.Trip.Id  });
      } catch (err) {
        alert("ไม่สามารถลบได้");
        this.confirmDeleteJobDialog = false;
      } finally {
        this.confirmDeleteJobDialog = false;
      }
      this.render();
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
            alert("ไม่สามารถเพิ่มได้จำนวน " + error + " รายการ");
          }
          this.render();
        }
      } catch (err) {
        console.log(err);
        alert("ไม่สามารถเพิ่มพนักงานได้");
      }
    },
    CallDeleteUserDialog(userId) {
      this.userIdSelected = userId;
      this.leader = this.Trip.usertrips.filter(
        x => x.UserId == userId
      )[0].Leader;
      this.confirmDeleteUserDialog = true;
    },
    cancel() {
      this.userIdSelected = 0;
      this.confirmDeleteUserDialog = false;
    },
    isLeader(userId){
      let leader = this.Trip.usertrips.filter(x => x.UserId == userId)[0].Leader;
      if(leader == true){
        return true;
      }else{
        return false;
      }    
    },
    async confirmSetLeader() {
      try {
        // alert("L : " + this.leader + " U : " + this.userIdSelected + " T : " + this.Trip.Id);
        await this.$store.dispatch("usertripcommand/patch", [
          { UserId: this.userIdSelected, TripId: this.Trip.Id}, { Leader : this.leader }
        ]);
      } catch (err) {
        alert("ไม่สามารถเซตเป็นหัวหน้างานได้");
        this.confirmDeleteUserDialog = false;
      } finally {
        this.confirmDeleteUserDialog = false;
      }
      this.render();
    },
    async confirmDeleteUser() {
      try {
        await this.$store.dispatch("usertripcommand/remove", {
          UserId: this.userIdSelected,
          TripId: this.Trip.Id
        });
      } catch (err) {
        alert("ไม่สามารถลบได้");
        this.confirmDeleteUserDialog = false;
      } finally {
        this.confirmDeleteUserDialog = false;
      }
      this.render();
    },

    async CallStartTripDialog() {
      this.confirmStartTripDialog = true;
    },
    cancelStartTrip() {
      this.confirmStartTripDialog = false;
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
        this.confirmStartTripDialog = false;
      }
      this.render();
    },

    GotoTripDetailMobie(job) {
      this.$router.push({ name: "JobDetailMobile", params: { Id: job.Id } });
    }
  }
};
</script>
