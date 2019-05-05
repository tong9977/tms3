<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card
          color="orange"
          :title="'จัดการ'+objectName"
          :text="'รายการ'+objectName+'ทั้งหมด'"
        >
          <v-btn flat slot="menu" @click="addItem()">
            <v-icon>mdi-plus</v-icon>เพิ่ม
          </v-btn>

          <v-subheader>มีทั้งหมด {{total}} รายการ</v-subheader>
          <v-data-table :headers="headers" :items="items" hide-actions>
            <template slot="headerCell" slot-scope="{ header }">
              <span class="subheading font-weight-light text--darken-3" v-text="header.text"/>
            </template>
            <!-- set column แสดงผลที่นี้ -->
            <template slot="items" slot-scope="{ item }">
             
              <td>{{ item.Id }}</td>
              <td>{{ item.Customer }}</td>
              <td>{{ item.ContactPerson }}</td>
              <!-- <td>
               <ul>
                  <li
                    v-for="p in item.Products"
                    :key="p.ProductName"
                  >{{p.ProductName}} {{p.Quantity}} {{p.Unit}}</li>
                </ul>
              </td>-->
              <td>{{ item.Remark }}</td>
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
                <v-btn color="error" flat :to="'jobDetail/'+item.Id">
                  <v-icon>mdi-file-find</v-icon>ใบงาน
                </v-btn>
              </td>
            </template>
          </v-data-table>

          <!-- dialog สำหรับ เพิ่ม แก้ไข -->
          <v-dialog v-model="dialog" max-width="1200px">
            <JobCreateEditDialog @Done="dialog = false" @Success="createFinish" mode="create"/>
          </v-dialog>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import JobCreateEditDialog from "@/viewComponents/JobCreateEditDialog.vue";
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
      // { value: "DeliveryDate", text: "วันส่งของ", sortable: true },
      { value: "ContactPerson", text: "คนติดต่อ", sortable: false },
      // { text: "สินค้า", sortable: false },
      { value: "Remark", text: "หมายเหตุ", sortable: false },
      { value: "Address", text: "ที่อยู่", sortable: false },
      { value: "Weight", text: "น้ำหนัก/ปริมาตร", sortable: false },
      { value: "RouteNo", text: "RouteNo", sortable: false },
      // { value: "Zone", text: "Zone", sortable: false },
      { value: "Distance", text: "ระยะทาง", sortable: false },
      { value: "", text: "", sortable: false }
    ],
    defaultValue: {},
    query: { $sort: { Id: -1 } },
    //--end config

    items: [],
    total: 0,
    loading: false,
    dialog: false,
    formModel: {}
  }),
  computed: {},
  async mounted() {
    //init here

    this.renderUI();
  },
  methods: {
    async renderUI() {
      try {
        var res = await this.$store.dispatch(
          this.service + "/find",
          this.query
        );
        this.total = res.total;
        this.items = res.data;
      } catch (error) {
        console.log(error);
        alert("ไม่สามารถขอข้อมูลจาก server ได้");
      }
    },
    async addItem() {
      this.formModel = Object.assign({}, this.defaultValue);
      this.dialog = true;
    },

    createFinish(Id) {
      this.$router.push({ name: "JobDetail", params: { Id: Id } });
    }
  }
};
</script> 
