<template>
  <div>
    <v-subheader>มีทั้งหมด {{total}} รายการ</v-subheader>
    <v-data-table :headers="headers" :items="items" hide-actions>
      <template slot="headerCell" slot-scope="{ header }">
        <span class="subheading font-weight-light text--darken-3" v-text="header.text"/>
      </template>
      <!-- set column แสดงผลที่นี้ -->
      <template slot="items" slot-scope="{ item }">
        <td>{{ item.Id }}</td>
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

        <td>
          <v-btn color="error" flat @click="GotoDetail(item)">
            <v-icon>mdi-file-find</v-icon>ใบงาน
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import JobCreateEditDialog from "@/viewComponents/JobCreateEditDialog.vue";
import { createDateFilter } from "vue-date-fns";
import locale from "date-fns/locale/th";

export default {
  components: {
    JobCreateEditDialog
  },
  data: () => ({
    //--start config
    service: "job",
    objectName: "งาน",
    headers: [
      { value: "JobId", text: "Id", sortable: true },
      { value: "Customer", text: "ลูกค้า", sortable: true },

      { value: "ContactPerson", text: "คนติดต่อ", sortable: false },
      { value: "DeliveryDate", text: "วันส่งของ", sortable: true },
      { text: "สินค้า", sortable: false },
      //{ value: "Remark", text: "หมายเหตุ", sortable: false },
      { value: "Address", text: "ที่อยู่", sortable: false },
      { value: "Weight", text: "น้ำหนัก/ปริมาตร", sortable: false },
      { value: "RouteNo", text: "RouteNo", sortable: false },
      // { value: "Zone", text: "Zone", sortable: false },
      { value: "Distance", text: "ระยะทาง", sortable: false },
      { value: "", text: "", sortable: false }
    ],
    defaultValue: {},

    //--end config
    //colorTheme:'',
    items: [],
    total: 0,
    loading: false,
    dialog: false,
    formModel: {}
  }),
  filters: {
    date: createDateFilter("DD/MM/YYYY", { locale })
  },
  props: ["JobStatusId"],
  computed: {},
  async mounted() {
    //init here

    this.renderUI();
  },

  methods: {
    async renderUI() {
      try {
        this.query = {
          query: {
            JobStatusId: this.JobStatusId
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
        this.$toast.error("ไม่สามารถขอข้อมูลจาก server ได้");
      }

      try {
        const { Job } = this.$FeathersVuex;

        Job.find({ query: { Id: this.Id, $eager: "[jobitem]" } }).then(res => {
          this.JobitemObj = res.data;
        });
      } catch (err) {
        this.$toast.error("ไม่สามารถต่อ server ได้");
      }
    },

    GotoDetail(item) {
      this.$emit("itemClick", item.Id);
    }
  }
};
</script> 

<!-- Component Docs
props 1 ตัว
- JobStatusId เพื่อค้นหาสถานะขอบใบงาน แบ่งเป็น3 ประเภท 1.งานใหม่ 2.งานมอบหมายแล้ว 3.งานเสร็จสิ้น

event 1 ตัว
- itemClick โยนตัวแปร Id เพื่อไปหน้า JobDetail


- error(err)
-->