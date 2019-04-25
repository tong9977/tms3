<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12>
        <h5 class="headline">
          งานวันนี้
          <span class="subheading">กด 187 บรรทุก 6 ล้อ</span>
        </h5>
        <div class="caption">มีทั้งหมด 2 งาน</div>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-list two-line v-for="j in jobnews" :key="j.JobId">
              
            <v-list-tile @click=gotoJobDetail>
              <v-list-tile-action>
                <v-icon color="blue">mdi-map-marker</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{j.CustomerName}}</v-list-tile-title>
                <v-list-tile-sub-title>{{j.Address.slice(0,30)}}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon color="grey lighten-1">mdi-car-pickup</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapMutations, mapState } from "vuex";

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
  computed: {
    ...mapState("tms", ["vehicles", "jobnews", "drivers"])
  },
  methods:{
    gotoJobDetail(){
       this.$router.push({ path: "/todaytripjobdetail" });
    }
  }
};
</script>
