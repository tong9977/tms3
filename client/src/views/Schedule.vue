<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex xs12 sm6 md4 v-for="v in vehicles" :key="v.VehicleId">
        <material-card color="green" :title="v.LicensePlate" :text="v.Type" full-width>
          <v-btn flat slot="menu" @click="jobNewDialog = true">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-layout row wrap>
            <v-flex xs6>
              <v-progress-linear color="secondary" height="5" value="58"></v-progress-linear>
            </v-flex>
            <v-flex xs6>
              <p>
                <span>300 / </span>
                {{v.Limit}}
                <span>kg</span>
              </p>
            </v-flex>
            <v-flex xs6>
              <v-progress-linear color="secondary" height="5" value="60"></v-progress-linear>
            </v-flex>
            <v-flex xs6>
              <p>
                <span>ยังขนได้</span>
                {{v.LimitCC}}
                <span>cc</span>
              </p>
            </v-flex>
          </v-layout>
          <v-list two-line v-for="j in jobnews" :key="j.JobId">
            <v-list-tile @click.stop>
              <v-list-tile-action>
                <v-icon color="blue">mdi-map-marker</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{j.CustomerName}}</v-list-tile-title>
                <v-list-tile-sub-title>{{j.Address}}</v-list-tile-sub-title>
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
                <v-btn
                  color="success"
                  round
                  class="font-weight-light"
                  @click="driverDialog = true"
                >คนขับรถ</v-btn>
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
        </material-card>
      </v-flex>
    </v-layout>

    <v-layout row justify-center>
      <v-dialog
        v-model="jobNewDialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
        
        <JobSelectionComp  @success="GetDetail" />
        </v-card>
      </v-dialog>
    </v-layout>

    <v-layout row justify-center>
      <v-dialog
        v-model="driverDialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
      <v-card>
        <UserSelectionComp  @success="GetDetailUser" />
      </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import JobSelectionComp from "@/viewComponents/JobSelectionComp.vue";
import UserSelectionComp from "@/viewComponents/UserSelectionComp.vue";
export default {
  data: () => ({
    jobNewHeaders: [
      { text: "", sortable: false },
      { value: "CustomerName", text: "ลูกค้า", sortable: true },
      { value: "DeliveryDate", text: "วันส่งของ", sortable: true },
      { value: "ContactPerson", text: "คนติดต่อ", sortable: false },
      { text: "สินค้า", sortable: false },
      { value: "Remark", text: "หมายเหตุ", sortable: false },
      { value: "Address", text: "ที่อยู่", sortable: false },
      { value: "Weigth", text: "น้ำหนัก", sortable: true },
      { value: "CC", text: "ปริมาตร", sortable: true },
      { value: "RouteNo", text: "RouteNo", sortable: true },
      { value: "Zone", text: "Zone", sortable: true },
      { value: "Distance", text: "ระยะทาง", sortable: true }
    ],
    driverHeaders: [
      { text: "", sortable: false },
      { value: "ImageUrl", text: "", sortable: false },
      { value: "Name", text: "ชื่อพนักงาน", sortable: true },
      { value: "StaffId", text: "รหัสพนักงาน", sortable: false },
      { value: "UserName", text: "UserName", sortable: false }
    ],
    jobNewDialog: false,
    driverDialog: false
  }),
  components: {
   JobSelectionComp,
   UserSelectionComp
  },
  computed: {
    ...mapState("tms", ["vehicles", "jobnews", "drivers"])
  },
   methods: {

    GetDetail(Id) {
      alert(JSON.stringify(Id))
      this.jobNewDialog = false;

    },
    GetDetailUser(Id){
      alert(JSON.stringify(Id))
      this.driverDialog = false;
    }
  }
};
</script>