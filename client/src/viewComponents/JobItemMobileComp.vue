<template>
  <v-flex xs12>
    <v-subheader>มีทั้งหมด {{total}} รายการ</v-subheader>

    <v-data-table :headers="headers" :items="jobitems" hide-actions>
      <template slot="headerCell" slot-scope="{ header }">
        <span class="subheading font-weight-light text--darken-3" v-text="header.text"/>
      </template>
      <!-- set column แสดงผลที่นี้ -->
      <template slot="items" slot-scope="{ item }">
        <td>
          <v-checkbox v-model="item.Complete" @change="editItem(item)" label></v-checkbox>
        </td>
        <td>
          {{ item.ProductName }}
          {{ item.Quantity }} {{ item.Unit }}
        </td>
        <td>{{item.CompletedDate |date}}</td>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">งานนี้เสร็จแล้วใช่หรือไม่</span>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex>แก้ไข "{{formModel[Object.keys(formModel)[1]]}}"หรือไม่ ?</v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog=false">Cancel</v-btn>
          <v-btn color="blue darken-1" flat :loading="loading" @click="saveToServer">ใช่</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</template>


<script>
import { createDateFilter } from "vue-date-fns";
import locale from "date-fns/locale/th";
export default {
  data: () => ({
    //--start config
    service: "jobitem",
    objectName: "งานที่ต้องทำ",
    headers: [
      { value: "Id", text: "Id", sortable: true },
      { value: "ProductName", text: "ชื่อสินค้า", sortable: true },

      { text: "", sortable: false }
    ],
    defaultValue: {
      ProductName: "",
      Quantity: "",
      Unit: ""
    },
    query: {},
    //--end config

    jobitems: [], // data ที่มาจากการ find ของ server
    total: 0,
    inDTO: {}, // data ที่มาจากการ get ของ server
    outDTO: {}, // data ที่เป็น Object ที่จะส่งไป create หรือ update ที่ server
    loading: false,
    dialog: false,
    formModel: {},
    UnitStatus: {},
    ProductStatus: {},
    itemsUnitstatus: [],
    itemsProductstatus: []
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
        this.query = {
          query: {
            JobId: this.JobId
          }
        };
        var res = await this.$store.dispatch(
          this.service + "/find",
          this.query
        );
        this.total = res.total;
        this.jobitems = res.data;
      } catch (error) {
        console.log(error);
        this.$toast.error("ไม่สามารถขอข้อมูลจาก server ได้");
      }

      //Product
      try {
        var res = await this.$store.dispatch("product/find", {});
        this.ProductStatus = res.data;

        for (let index = 0; index < this.ProductStatus.length; index++) {
          const element = this.ProductStatus[index].Name;
          this.itemsProductstatus.push(element);
        }
      } catch (error) {
        console.log(error);
        this.$toast.error("ไม่สามารถติดต่อ server ได้");
      }

      //Unit
      try {
        var res = await this.$store.dispatch("unit/find", {});
        this.UnitStatus = res.data;

        for (let index = 0; index < this.UnitStatus.length; index++) {
          const element = this.UnitStatus[index].Name;
          this.itemsUnitstatus.push(element);
        }
      } catch (error) {
        console.log(error);
        this.$toast.error("ไม่สามารถติดต่อ server ได้");
      }
    },

    async editItem(item) {
      this.mode = "edit";
      this.formModel = Object.assign({}, item);
      try {
        this.outDTO = Object.assign({}, this.formModel);
        // hook ที่จะแก้ข้อมูลก่อนส่งไป server ใส่ที่นี้
        this.outDTO.JobId = this.JobId;
        await this.$store.dispatch(this.service + "/patch", [
          this.formModel.Id,
          this.outDTO,
          this.$toast.success("แก้ไขข้อมูลสำเร็จ")
        ]);
        this.renderUI();
      } catch (err) {
        console.log(err);
        this.$toast.error("ไม่สามารถแก้ไขข้อมูลได้");
      } finally {
        this.loading = false;
      }
    }
  }
};
</script> 


<!-- Component Docs
props 1 ตัว
- JobId มีการผูกค่ากับ JobId เพื่อดึง item ที่มี JobId ตรงกับ Id ของ Job เท่านั้น


event 0 ตัว


- error(err)
-->
