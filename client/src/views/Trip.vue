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
            @change="DatePickerChage"
          ></ejs-datepicker>
        </v-flex>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click.stop="saveToServer('all')" :loading="loading">
        <v-icon>mdi-plus</v-icon>สร้างตารางรถวันนี้
      </v-btn>
      <v-btn color="primary" @click.stop="addItemฺByVehicleId()" :loading="loading2">
        <v-icon>mdi-plus</v-icon>สร้างแบบรายคัน
      </v-btn>
    </v-toolbar>

    <v-layout row wrap>
      <v-flex xs12 sm4 md4 v-for="trip in trips" :key="trip.TripId">
        <TripDetailComp
          :Trip="trip"
        ></TripDetailComp>
      </v-flex>
    </v-layout>

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
  </v-container>
</template>

<script>
import {
  DatePickerComponent,
  DatePickerPlugin
} from "@syncfusion/ej2-vue-calendars";
import TripDetailComp from "@/viewComponents/TripDetailComp.vue";

import {
  startOfDay,
  endOfDay,
  endOfMonth,
  lastDayOfYear,
  format
} from "date-fns";

export default {
  components: {
    TripDetailComp
  },

  data: () => ({
    service: "tripcommand",
    tripDate: new Date(),
    trips: [],
    dialog: false,
    vehicles: [],
    vehicleSelect: null,
    vehicleId: [],
    loading: false,
    loading2: false,
  }),

  provide: {},

  computed: {},
  methods: {
    async render() {
      try {
        var x = startOfDay(new Date(this.tripDate));
        // var y = startOfDay(new Date(this.tripDate));
        let start = format(x, "YYYY-MM-DDT00:00:00");
        // let end = format(y, "YYYY-MM-DDT23:59:59");

        let res = await this.$store.dispatch("trips/find", {
          query: { TripDate : start, $eager: "[vehicle,users,jobs]" }
        });
        this.trips = res.data;
      } catch (error) {
        console.log(error);
        alert("ไม่สามารถติดต่อ server ได้");
      }

      //แสดงใน dialog
      try {
        let res = await this.$store.dispatch("vehicle/find", {});
        this.vehicles = res.data;
      } catch (error) {
        console.log(error);
        alert("ไม่สามารถติดต่อ server ได้");
      }
    },
    async saveToServer(by) {
      if (by != "all") {
        this.loading2 = true;
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
      }else{
        //all
        this.loading = true;
      }

      try {
        let newTodo = { date: this.tripDate, vehicleId: this.vehicleId };
        await this.$store.dispatch(this.service + "/create", newTodo);
      } catch (err) {
        console.log(err);
        alert("ไม่สามารถสร้าง Trip ได้");
      } finally {
        this.loading = false;
        this.loading2 = false;
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
    },
    
    DatePickerChage(){
      this.render();
    }
  },
  mounted: function() {
    this.render();
  }
};
</script>