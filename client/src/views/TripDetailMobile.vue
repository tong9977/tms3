<template >
  <v-container>
    <v-btn color="blue" @click="$router.go(-1)">ย้อนกลับ</v-btn>
    <!-- 'TripId :' +tripsdetail+ '[' +tripsdetail.jobs.length +'ใบงาน] ' -->
    <material-card
      color="green"
      :title="'TripId : ' + tripsdetail[0].Id + ' [' +tripsdetail[0].jobs.length +'ใบงาน]' "
      :text="tripsdetail[0].vehicle.LicensePlate + ' ' +tripsdetail[0].Approve"
    >
      <v-list three-line>
        <template v-for="item in tripsdetail">
          <template v-for="job in item.jobs">
            <v-list-tile @click="GotoJobList(job.Id)" :key="job.Id">
              <v-list-tile-action>
                <v-icon v-if="job.JobStatusId==2" color="blue">mdi-map-marker</v-icon>
                <v-icon v-if="job.JobStatusId==3" color="green">mdi-check</v-icon>
                <v-icon v-if="job.JobStatusId==4" color="green">mdi-check-all</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{job.Customer}} [{{job.Id}}]</v-list-tile-title>
                <v-list-tile-sub-title>{{job.Address}}</v-list-tile-sub-title>
                <v-list-tile-sub-title>{{job.ContactPerson}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider :key="job.Id"></v-divider>
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
    date: createDateFilter("ddd" + " DD MMM YYYY", { locale })
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