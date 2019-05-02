<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card
          color="orange"
          :title="'จัดการ'+objectName"
          :text="'รายการ'+objectName+'ทั้งหมด'"
        >
       
          <v-btn flat slot="menu" @click="addItem()" >
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
            </template>
          </v-data-table>

          <!-- dialog สำหรับ เพิ่ม แก้ไข -->
            <job-create-edit-dialog/>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import jobdialog from "@/viewComponents/JobCreateEditDialog.vue";
export default {
   components: {
     jobdialog
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
      { value: "Distance", text: "ระยะทาง", sortable: false }
    ],
    defaultValue: {
      Customer: "ss",
      ContactPerson: "dd",
      Email: "ss@sd.com",
      LineId: "sd",
      Address: "sd",
      Lat: "23",
      Long: "23",
      Weight: "11",
      CC: "55",
      Distance: "2",
      RouteNo: "2",
      RouteName: "ddd",
      Remark: "ddd",
      RequestedDate: "",
      CreatedBy: "",
      CompletedDate: "",
      CompletedBy: "",
      NumTrip: "2",
      JobTypeObj: {},
      JobStatusObj: {}
    },
    query: { $sort: { Id: -1 } },
    //--end config
    dateFormat: "dd-MM-yyyy",
    JobStatus: [],
    JobType: [],
    JobStatusSelete: { Id: 1 },
    JobTypesSelete: { Id: 1 },
    items: [],
    total: 0,
    loading: false,
    dialog: false,
    dialogDelete: false,
    formModel: {},
    mode: "" // มีได้ 2 แบบคือ create กับ edit
  }),
  computed: {
    formTitle() {
      return this.mode === "create"
        ? "เพิ่ม" + this.objectName
        : "แก้ไข" + this.objectName;
    }
  },
  async mounted() {
    //init here

    this.renderUI();

    try {
      var res = await this.$store.dispatch("jobstatus/find", {});
      this.JobStatus = res.data;
    } catch (error) {
      console.log(error);
      alert("ไม่สามารถติดต่อ server ได้");
    }

    try {
      var res2 = await this.$store.dispatch("jobtype/find", {});
      this.JobType = res2.data;
    } catch (error) {
      console.log(error);
      alert("ไม่สามารถติดต่อ server ได้");
    }
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
      this.mode = "create";
      this.formModel = Object.assign({}, this.defaultValue);
      this.dialog = true;
    },

    async editItem(item) {
      this.mode = "edit";
      this.formModel = Object.assign({}, item);
      this.dialog = true;
    },
    async deleteItem(item) {
      this.formModel = Object.assign({}, item);
      this.dialogDelete = true;
    },

    closeDialog() {
      this.dialog = false;
      this.dialogDelete = false;
    },
    async saveToServer() {
      const valid = await this.$validator.validateAll();
      if (!valid) {
        alert("กรุณากรอกข้อมูลให้สมบรูณ์");
        return;
      }
      this.loading = true;
      if (this.mode === "edit") {
        try {
          await this.$store.dispatch(this.service + "/patch", [
            this.formModel.Id,
            this.formModel
          ]);
          this.renderUI();
        } catch (err) {
          console.log(err);
          alert("ไม่สามารถแก้ไขข้อมูลได้");
        } finally {
          this.loading = false;
        }
      } else {
        //Add Data
        try {
          //alert(JSON.stringify(this.formModel))
          let temp = Object.assign({}, this.formModel);
          //alert(JSON.stringify(temp))
          temp.JobStatusId = this.formModel.JobStatusObj.Id;
          temp.JobTypeId = this.formModel.JobTypeObj.Id;

          delete temp.JobStatusObj;
          delete temp.JobTypeObj;
          this.$store.dispatch(this.service + "/create", temp);
          ////// go to next page ///////
          var res = await this.$store.dispatch(
            this.service + "/find",{
            query: {
              $limit: 1,
              $sort: {
                Id: -1
              }
            }
            }
        );
        this.$router.push("/jobDetail/"+res.data[0].Id);
        
          //this.renderUI();
        } catch (err) {
          console.log(err);
          alert("ไม่สามารถเพิ่มข้อมูลได้" + err);
        } finally {
          this.loading = false;
        }
      }
      this.closeDialog();
    },
    async deleteToServer() {
      this.loading = true;
      try {
        await this.$store.dispatch(this.service + "/remove", this.formModel.Id);
        this.renderUI();
      } catch (err) {
        console.log(err);
        alert("ไม่สามารถลบข้อมูลได้");
      } finally {
        this.loading = false;
        this.dialogDelete = false;
      }
    }
  }
};
</script> 
