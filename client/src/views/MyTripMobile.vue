<template>
  <v-container>
    <material-card color="green" title="รายละเอียดการงานประจำสัปดาห์">
      <v-layout>
        <v-flex xs4 md4 text-xs-center>
          <v-btn @click="Backweek()" flat small color="primary">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs4 md4 text-xs-center>
          <h4>{{start|date2}} - {{end|date2}}</h4>
        </v-flex>
        <v-flex xs4 md4 text-xs-center>
          <v-btn @click="Nextweek()" flat small color="primary">
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>

      <v-list two-line>
        <template v-for="item in usertrips">
          <v-list-tile :key="item.Id" @click="GotoJobList(item.Id)">
            <v-list-tile-action>
              <v-icon color="blue">mdi-car-pickup</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>วันส่งสินค้า : {{item.TripDate | date}}</v-list-tile-title>
              <v-list-tile-sub-title>ทะเบียนรถ : {{item.vehicle.LicensePlate}}</v-list-tile-sub-title>
              <v-list-tile-sub-title>รหัสงาน : {{item.Id}} </v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action></v-list-tile-action>
          </v-list-tile>
          <v-divider :key="item.Id"></v-divider>
        </template>
      </v-list>
    </material-card>
  </v-container>
</template>

<script>
import {
  DatePickerComponent,
  DatePickerPlugin
} from "@syncfusion/ej2-vue-calendars";

import {
  startOfDay,
  endOfDay,
  endOfMonth,
  lastDayOfYear,
  format,
  startOfWeek,
  endOfWeek,
  addDays
} from "date-fns";
import { createDateFilter } from "vue-date-fns";
import locale from "date-fns/locale/th";

export default {
  components: {},

  data: () => ({
    service: "usertripcommand",
    tripDate: new Date(),
    usertrips: [],
    total: 0,
    start: "",
    end: ""
  }),

  computed: {},
  filters: {
    date: createDateFilter("ddd" + " DD MMM YYYY", { locale }),
    date2: createDateFilter("DD/MMM/YYYY", { locale })
  },
  async mounted() {
    this.render();
  },
  methods: {
    async render() {
      try {
        var x = startOfWeek(new Date(this.tripDate), { weekStartsOn: 1 });
        var y = endOfWeek(new Date(this.tripDate), { weekStartsOn: 1 });
        this.start = format(x, "YYYY-MM-DD");
        this.end = format(y, "YYYY-MM-DD");

        let res = await this.$store.dispatch("usertripcommand/find", {
          query: { UserId: 8, Start: this.start, End: this.end }
        });

       // this.total = res[0].Trips[0].jobs.length;

        this.usertrips = res[0].Trips;
      } catch (error) {
        console.log(error);
        alert("ไม่สามารถติดต่อ server ได้");
      }
    },
    GotoJobList(Id) {
      // this.$router.push({ path: `/TripDetailMobile/${Id}` })
      this.$router.push({ name: "TripDetailMobile", params: { Id: Id } });
    },
    Nextweek() {
      this.tripDate = addDays(this.tripDate, 7);
      this.render();
    },
    Backweek() {
      this.tripDate = addDays(this.tripDate, -7);
      this.render();
    }
  }
};
</script>