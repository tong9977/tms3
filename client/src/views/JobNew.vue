<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card
          color="orange"
          :title="'จัดการ'+objectName"
          :text="'รายการ'+objectName+'ทั้งหมด'"
        >
          <v-btn flat slot="menu" @click.stop="addItem()">
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
          <v-dialog v-model="dialog" max-width="1200px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <!-- set form กรอกข้อมูลที่นี้ -->
                    <v-flex xs12 md6>
                      <v-text-field
                        v-model="formModel.Customer"
                        data-vv-name="ชื่อลูกค้า"
                        v-validate="'required|min:2'"
                        :error-messages="errors.collect('ชื่อลูกค้า')"
                        label="กรอกลชื่อลูกค้า"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <v-text-field
                        v-model="formModel.ContactPerson"
                        data-vv-name="คนติดต่อ"
                        v-validate="'required|min:2'"
                        :error-messages="errors.collect('คนติดต่อ')"
                        label="คนติดต่อ"
                      ></v-text-field>
                    </v-flex>
                    <v-flex>
                      <v-text-field
                        v-model="formModel.Email"
                        data-vv-name="อีเมล์"
                        v-validate="'email'"
                        :error-messages="errors.collect('อีเมล์')"
                        label="Email"
                      ></v-text-field>
                    </v-flex>
                    <v-flex>
                      <v-text-field
                        v-model="formModel.LineId"
                        data-vv-name="ไอดีไลน์"
                        v-validate="'required|min:2'"
                        :error-messages="errors.collect('ไอดีไลน์')"
                        label="LineId"
                      ></v-text-field>
                    </v-flex>
                    <v-flex>
                      <v-text-field
                        v-model="formModel.Address"
                        data-vv-name="ที่อยู่ลูกค้า"
                        v-validate="'required|min:2'"
                        :error-messages="errors.collect('ที่อยู่ลูกค้า')"
                        label="Address"
                      ></v-text-field>
                    </v-flex>
                    <v-flex>
                      <v-text-field
                        v-model="formModel.Lat"
                        data-vv-name="Lat"
                        v-validate="'decimal:10'"
                        :error-messages="errors.collect('Lat')"
                        label="Lat"
                      ></v-text-field>
                    </v-flex>
                    <v-flex>
                      <v-text-field
                        v-model="formModel.Long"
                        data-vv-name="Long"
                        v-validate="'decimal:10'"
                        :error-messages="errors.collect('Long')"
                        label="Long"
                      ></v-text-field>
                    </v-flex>
                    <v-flex>
                      <v-text-field
                        v-model="formModel.Weight"
                        data-vv-name="น้ำหนักที่ขนได้"
                        v-validate="'numeric'"
                        :error-messages="errors.collect('น้ำหนักที่ขนได้')"
                        label="Weight"
                      ></v-text-field>
                    </v-flex>
                    <v-flex>
                      <v-text-field
                        v-model="formModel.CC"
                        data-vv-name="ปริมาตรที่ขนได้"
                        v-validate="'numeric'"
                        :error-messages="errors.collect('ปริมาตรที่ขนได้')"
                        label="CC"
                      ></v-text-field>
                    </v-flex>
                    <v-flex>
                      <v-text-field
                        v-model="formModel.Distance"
                        data-vv-name="ระยะทาง"
                        v-validate="'numeric'"
                        :error-messages="errors.collect('ระยะทาง')"
                        label="ระยะทาง"
                      ></v-text-field>
                    </v-flex>
                    <v-flex>
                      <v-text-field
                        v-model="formModel.RouteNo"
                        data-vv-name="หมายเลขเส้นทาง"
                        v-validate="'numeric'"
                        :error-messages="errors.collect('หมายเลขเส้นทาง')"
                        label="RouteNo"
                      ></v-text-field>
                    </v-flex>
                    <v-flex>
                      <v-text-field
                        v-model="formModel.RouteName"
                        data-vv-name="ชื่อเส้นทาง"
                        v-validate="'required|min:2'"
                        :error-messages="errors.collect('ชื่อเส้นทาง')"
                        label="RouteName"
                      ></v-text-field>
                    </v-flex>
                    <v-flex>
                      <v-text-field
                        v-model="formModel.Remark"
                        data-vv-name="หมายเหตุ"
                        v-validate="'required|min:2'"
                        :error-messages="errors.collect('หมายเหตุ')"
                        label="Remark"
                      ></v-text-field>
                    </v-flex>
                    <v-flex>
                      <ejs-datepicker
                       style="padding-top:20px;"
                        placeholer="วันเริ่ม"
                        v-model="formModel.RequestedDate"
                        :format="dateFormat"
                      ></ejs-datepicker>
                    </v-flex>

                    <v-flex>
                      <v-text-field
                        v-model="formModel.NumTrip"
                        data-vv-name="จำนวนรอบในการส่ง"
                        v-validate="'numeric'"
                        :error-messages="errors.collect('จำนวนรอบในการส่ง')"
                        label="NumTrip"
                      ></v-text-field>
                    </v-flex>
                    <v-flex>
                      <v-select
                        :items="JobType"
                        v-model="formModel.JobTypeObj"
                        item-text="Name"
                        item-value="Id"
                        label="ประเภทงาน"
                        return-object
                      ></v-select>
                    </v-flex>
                    <v-flex>
                      <v-select
                        :items="JobStatus"
                        v-model="formModel.JobStatusObj"
                        item-text="Name"
                        item-value="Id"
                        label="สถานะงาน"
                        return-object
                      ></v-select>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="closeDialog">Cancel</v-btn>
                <v-btn color="blue darken-1" :loading="loading" flat @click="saveToServer">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapMutations, mapState } from "vuex";

export default {
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
      RequestedDate: new Date(),
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
          this.renderUI();
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
