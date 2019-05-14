<template>
  <v-container>
    <v-btn color="blue" @click="$router.go(-1)">ย้อนกลับ</v-btn>
   
    <material-card color="green" title="รายละเอียดการงานประจำสัปดาห์ ">
      <v-list three-line>
        <template v-for="item in tripsdetail">
          <template v-for="i in item.jobs">
          <v-list-tile @click="GotoJobList(i.Id)" :key="i">
        
          
                <v-list-tile-action>
                  <v-icon color="blue">mdi-file-document</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>วันที่ต้องส่งสินค้า : {{i.RequestedDate | date}}</v-list-tile-title>
                  <v-list-tile-sub-title>รหัสงาน : {{i.Id}} </v-list-tile-sub-title>
                  <v-list-tile-sub-title>ลูกค้า : {{i.Customer}} ที่อยู่ : {{i.Address}}</v-list-tile-sub-title>
                </v-list-tile-content>
             
          </v-list-tile>
          <v-divider :key="i"></v-divider>
          </template>
          
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
    tripDate: new Date(),
    tripsdetail: []
  }),

  computed: {},
  filters: {
    date: createDateFilter("ddd" + " DD MMM YYYY", { locale }),
  },
  async mounted() {
    this.render();
  },
  methods: {
    async render() {
      
      try {
        let IdTrip = this.$route.params.Id;
        

        let res = await this.$store.dispatch("trips/find", {
          query: { Id: IdTrip, $eager: "[vehicle,users,jobs]" }
        });
        this.tripsdetail = res.data;
      } catch (error) {
        console.log(error);
        this.$toast.error("ไม่สามารถติดต่อ server ได้");
      }
    },
    GotoJobList(Id) {
      this.$router.push({ path: `/jobdetailmobile/${Id}` });

    }
  }
};
</script>