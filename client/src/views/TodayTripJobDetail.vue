<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12>
        <h5 class="headline">{{job.CustomerName}}</h5>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <div>{{job.Address}}</div>
          </v-card-title>
          <v-card-text class="text-xs-right">
            <v-btn color="primary" flat>
              <v-icon>mdi-map-marker</v-icon>google map
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-list subheader two-line>
            <v-subheader>รายการของ</v-subheader>
            <v-list-tile v-for="p in job.Products" :key="p.ProductName">
              <v-list-tile-action>
                <v-list-tile-action>
                  <v-checkbox></v-checkbox>
                </v-list-tile-action>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{p.ProductName}}</v-list-tile-title>
                <v-list-tile-sub-title>จำนวน {{p.Quantity}} {{p.Unit}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-subheader>รูปการส่งงาน</v-subheader>
          <v-container fluid grid-list-sm>
            <v-layout row wrap>
              <v-flex v-for="i in 1" :key="i" xs6>
                <img
                  :src="`https://randomuser.me/api/portraits/men/${i + 20}.jpg`"
                  class="image"
                  alt="lorem"
                  width="100%"
                  height="100%"
                >
              </v-flex>
              <v-flex xs6>
                <v-avatar size="100%" color="grey lighten-4" tile>
                  <v-icon size="80">mdi-camera</v-icon>
                </v-avatar>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card>
          <v-subheader>การดำเนินงาน</v-subheader>
          <v-flex xs12>
            <v-textarea
              name="input-7-1"
              label="หมายเหตุ"
              value
              hint="ใส่ข้อมูลรายละเอียดต่างๆตอนส่งงาน"
            ></v-textarea>
          </v-flex>
          <v-flex xs12>
            <v-btn block to="/todaytrip" color="primary" dark>ปิดงาน</v-btn>
          </v-flex>
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
    ...mapState("tms", ["vehicles", "jobnews", "drivers"]),
    job() {
      return this.jobnews[0];
    }
  }
};
</script>
