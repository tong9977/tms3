<template>
  <v-container fluid grid-list-xl>
    <v-toolbar dense>
      <v-toolbar-title>
        <v-flex md6 lg6>
          เลือกวันที่
          <ejs-datepicker
            style="padding-top:20px;"
            placeholer="วันเริ่ม"
            v-model="tripDate"
            format="dd-MM-yyyy"
          ></ejs-datepicker>
        </v-flex>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click.stop="saveToServer('all')" :loading="loading">
        <v-icon>mdi-plus</v-icon>สร้างตารางรถวันนี้
      </v-btn>
      <v-btn color="primary" @click.stop="addItemฺByVehicleId()">
        <v-icon>mdi-plus</v-icon>สร้างแบบรายคัน
      </v-btn>
    </v-toolbar>

    <!-- dialog สำหรับ เพิ่ม แก้ไข -->
    <v-dialog v-model="dialog" max-width="1200px">
      <v-card>
        <v-card-title>
          <span class="headline">จัดการ Trip</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <!-- set form กรอกข้อมูลที่นี้ -->
              <v-flex xs12 md12>
                เลือกรถที่ต้องการสร้าง
                <v-combobox
                  v-model="vehicleSelect"
                  :items="vehicles"
                  item-text="LicensePlate"
                  item-value="Id"
                  label="เลือกรถ"
                  multiple
                  v-validate="'required'"
                  :error-messages="errors.collect('กรุณาเลือกรถ')"
                ></v-combobox>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="closeDialog">Cancel</v-btn>
          <v-btn
            color="blue darken-1"
            :loading="loading"
            flat
            @click="saveToServer('byVehicleId')"
          >Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- dialog -->

    <v-layout wrap>
      <v-flex xs12 sm6 md4 v-for="t in trips" :key="t.TripId">
        <!-- <material-card color="green" :title="t.LicensePlate" :text="t.Desciption" full-width> -->
        <material-card color="green" title="4 กด 187" text="ขนได้ 2000 กก. 600000 cc" full-width>
          <v-btn flat slot="menu">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-list two-line>
            <v-list-tile @click.stop>
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

  </v-container>
</template>

<script>
import {
  DatePickerComponent,
  DatePickerPlugin
} from "@syncfusion/ej2-vue-calendars";

export default {
  components: {},

  data: () => ({
    service: "tripservice",
    tripDate: new Date(),
    trips: [],
    dialog: false,
    vehicles: [],
    vehicleSelect: null,
    vehicleId: [],
    loading: false
  }),

  provide: {},

  computed: {},
  methods: {
    async render() {
      try {
        var res = await this.$store.dispatch("trips/find", {});
        this.trips = res.data;
      } catch (error) {
        console.log(error);
        alert("ไม่สามารถติดต่อ server ได้");
      }

      //แสดงใน dialog
      try {
        var res = await this.$store.dispatch("vehicle/find", {});
        this.vehicles = res.data;
      } catch (error) {
        console.log(error);
        alert("ไม่สามารถติดต่อ server ได้");
      }
    },
    async saveToServer(by) {
      if (by != "all") {
        const valid = await this.$validator.validateAll();
        if (!valid) {
          alert("กรุณากรอกข้อมูลให้สมบรูณ์");
          return;
        }

        var count = this.vehicleSelect.length;

        for (var i = 0; i < count; i++) {
          this.vehicleId.push(this.vehicleSelect[i].Id);
        }
        this.dialog = false;
      }

      this.loading = true;

      try {
        let newTodo = { date: this.tripDate, vehicleId: this.vehicleId };
        await this.$store.dispatch(this.service + "/create", newTodo);
      } catch (err) {
        console.log(err);
        alert("ไม่สามารถสร้าง Trip ได้");
      } finally {
        this.loading = false;
      }
      this.vehicleId = [];
      this.render();
    },

    async addItemฺByVehicleId() {
      this.vehicleSelect = null;
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
      this.dialogDelete = false;
    }
  },
  mounted: function() {
    this.render();
  }
};
</script>