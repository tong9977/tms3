<template>
  <v-container>
    <v-btn color="blue" @click="$router.go(-1)">ย้อนกลับ</v-btn>

    <material-card color="green" title="รายละเอียดการงานประจำสัปดาห์ ">
      
    {{usertrips}}
       
          <v-list two-line >
          <template v-for="item in usertrips" >
              
            <v-list-tile :key="item.Id" @click="GotoJobList(item.jobs[0].Id)">
              <v-list-tile-action>
                <v-icon color="blue">mdi-file-document</v-icon>
              </v-list-tile-action>
              <v-list-tile-content >
                <v-list-tile-title>  ลูกค้า : {{item.jobs[0].Customer}} ที่อยู่ : {{item.jobs[0].Address}}</v-list-tile-title>
                <v-list-tile-sub-title > ทะเบียนรถ : {{item.vehicle.LicensePlate}}</v-list-tile-sub-title>
                <v-list-tile-sub-title >วันที่ต้องส่งสินค้า : {{item.jobs[0].RequestedDate | date}} </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
             
              </v-list-tile-action>
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
  format
} from "date-fns";
import { createDateFilter } from "vue-date-fns";
import locale from "date-fns/locale/th";

export default {
  components: {},

  data: () => ({
    service: "usertripcommand",
    tripDate: new Date(),
    usertrips: [],
  }),


  computed: {},
  filters: {
    date: createDateFilter("DD/MM/YYYY", { locale })
  },
  async mounted()  {
    this.render();
  },
  methods: {
    async render() {
      try {
        var x = startOfDay(new Date(this.tripDate));
        var y = startOfDay(new Date(this.tripDate));
        let start = format(x, "2019-05-13T00:00:00");
        let end = format(y, "2019-05-16T23:59:59");
        let IdTrip =177;
        //alert(JSON.stringify(IdTrip))

        let res = await this.$store.dispatch("usertripcommand/find", {
          query: {UserId:8 ,Start: start,End: end} } );
        this.usertrips = res[0].Trips;
        //alert(JSON.stringify(this.usertrip))
      } catch (error) {
        console.log(error);
        alert("ไม่สามารถติดต่อ server ได้");
      }

    },
    GotoJobList(Id) {
      this.$router.push({ path: `/jobdetail/${Id}` })
    }
  },
  
};
</script>