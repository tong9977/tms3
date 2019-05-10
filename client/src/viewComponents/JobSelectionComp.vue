<template>
  <div class="full-height">
    <v-card>
      <div class="blue py-1 elevation-2">
        <v-layout row wrap>
          <v-flex xs6>
            <h3 class="px-4 white--text">เลือกใบงานที่จะใส่ในรถคันนี้</h3>
          </v-flex>
          <v-flex xs6 text-xs-right>
            <v-btn class="green mx-4" @click="OkClick">OK</v-btn>
          </v-flex>
        </v-layout>
      </div>

      <v-layout justify-center wrap>
        <v-flex md12>
          <v-card class="pa-4">
            <v-subheader>เลือก {{JobsId.length}} รายการ {{JobsId}}</v-subheader>
            <v-data-table :headers="headers" :items="items" hide-actions>
              <template slot="headerCell" slot-scope="{ header }">
                <span class="subheading font-weight-light text--darken-3" v-text="header.text"/>
              </template>

              <!-- set column แสดงผลที่นี้ -->
              <template slot="items" slot-scope="{ item }">
                <td>
                  <v-checkbox v-model="JobsId" :value="item.Id" :label="item.Id"></v-checkbox>
                </td>
                <td>{{ item.Customer }}</td>
                <td>
                  {{ item.ContactPerson }}
                  <br>
                  {{item.Telephone}}
                </td>
                <td>{{ item.RequestedDate |date }}</td>
                <td>
                  <ul>
                    <li v-for="p in item.jobitem" :key="p.JobId">
                      {{p.ProductName}} {{p.Quantity}} {{p.Unit}}
                      <v-icon v-if="p.Complete">mdi-check</v-icon>
                    </li>
                  </ul>
                </td>
                <td>
                  {{ item.Address }}
                  <br>
                  <a
                    :href="'https://maps.google.com/maps?q=' + item.Lat +','+item.Long +'&hl=es;z=14&amp;output=embed'"
                    style="color:#0000FF;text-align:left"
                    target="_blank"
                  >map</a>
                </td>
                <td>
                  {{ item.Weight }} kg
                  <br>
                  {{ item.CC }} cc
                </td>
                <td>{{ item.RouteNo }}</td>
                <td>{{ item.Distance }} km.</td>
                <td>{{ item.TripCredit }}</td>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import { createDateFilter } from "vue-date-fns";
import locale from "date-fns/locale/th";

export default {

  data: () => ({
    //--start config
    service: "job",
    objectName: "งาน",
    headers: [
      { value: "", text: "", sortable: false },
      { value: "Customer", text: "ลูกค้า", sortable: true },

      { value: "ContactPerson", text: "คนติดต่อ", sortable: true },
      { value: "DeliveryDate", text: "วันส่งของ", sortable: true },
      { text: "สินค้า", sortable: false },
      { value: "Address", text: "ที่อยู่", sortable: true },
      { value: "Weight", text: "น้ำหนัก/ปริมาตร", sortable: true },
      { value: "RouteNo", text: "RouteNo", sortable: true },
      { value: "Distance", text: "ระยะทาง", sortable: true },
      { value: "TripCredit", text: "TripCredit", sortable: true }
    ],
    defaultValue: {},

    items: [],
    loading: false,
    formModel: {},
    JobsId: []
  }),
  filters: {
    date: createDateFilter("DD/MM/YYYY", { locale })
  },

  computed: {},
  mounted(){
    this.ready();
  },
  methods: {
    async ready() {
      this.JobsId=[];
      try {
        this.query = {
          query: {
            JobStatusId: 1,
            $eager: "[jobitem]"
          }
        };
        var res = await this.$store.dispatch(
          this.service + "/find",
          this.query
        );
        this.total = res.total;
        this.items = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    OkClick(item) {
      this.$emit("success", this.JobsId);
    }
  }
};
</script> 
<style>
.full-height {
  height: 100%;
  background-color: #ffffff;
}
</style>

<!-- Component Docs


props 0 ตัว
- 

event 1 ตัว
- success โยนตัวแปร Id เพื่อไปหน้า Schedule จาก v-model="JobsId" ของ checkbox


- error(err)
-->