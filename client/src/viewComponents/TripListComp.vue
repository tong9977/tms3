<template>
  <v-layout justify-center wrap>
    <v-flex md12>
      <material-card color="green" title="รายการ Trip">
        <v-subheader>มีทั้งหมด {{total}} รายการ</v-subheader>
           <v-data-table :headers="headers" :items="tripdetail" hide-actions>
          <template slot="headerCell" slot-scope="{ header }">
            <span class="subheading font-weight-light text--darken-3" v-text="header.text"/>
          </template>
       <!--< set column แสดงผลที่นี้ -->
          <template slot="items" slot-scope="{ item }">
            <td>{{ item.Id }}</td>
            <td>{{item.TripDate | date}}</td>
            <td>{{item.vehicle.LicensePlate}} </td>
            <td > 
               <!-- <span v-for="leader in item.usertrips" :key="leader.Id"> </span> -->
                <span v-for="driver in item.users" :key="driver.Id">
                     
                [ {{ driver.FirstName}} ]  
                     </span>
               
                </td>
            <td> <v-icon v-if="item.Complete">mdi-check</v-icon>
                <v-icon v-else>mdi-close</v-icon></td>
          </template>
        </v-data-table>
      </material-card>
    </v-flex>
  </v-layout>
</template>


<script>
import { createDateFilter } from "vue-date-fns";
import locale from "date-fns/locale/th";
export default {
  data: () => ({
    //--start config
    service: "jobtripcommand",
    headers: [
     
      { value: "Id", text: "TripID", sortable: true },
      { value: "TripDate", text: "วันที่ส่งของ", sortable: true },
      { value: "LicensePlate", text: "ทะเบียนรถ", sortable: true },
      { value: "User", text: "คนขับรถ", sortable: true },
      { value: "Complete", text: "สถานะของงาน", sortable: true },
      { text: "", sortable: false }
    ],
    defaultValue: {},
  
    //--end config

    tripdetail: [], // data ที่มาจากการ find ของ server
    total: 0,
    formModel: {}
  }),

  props: ["JobId"],
  computed: {},
  filters: {
    date: createDateFilter("DD/MM/YYYY HH:mm", { locale })
  },
  async mounted() {
    //init here

    this.renderUI();
  },
  methods: {
    async renderUI() {
      try {
        let IdTrip = this.$route.params.Id;
        let res = await this.$store.dispatch("jobtripcommand/find", {
          query: { JobId: 27 }
        });

        this.total = res[0].Trips.length;
        this.tripdetail = res[0].Trips;
        
      } catch (error) {
        console.log(error);
        alert("ไม่สามารถขอข้อมูลจาก server ได้ +++");
      }
    }
  }
};
</script> 


<!-- Component Docs
props 1 ตัว
- JobId มีการผูกค่ากับ JobId เพื่อดึง item ที่มี JobId ตรงกับ Id ของ Job เท่านั้น


event 0 ตัว



-->
