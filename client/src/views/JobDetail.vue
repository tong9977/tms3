<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <template>
        <v-flex xs12>
          <h5 class="headline">ลูกค้า : {{items[0].Customer}}</h5>

          <v-spacer></v-spacer>

          <v-btn color="blue" class="font-weight-light" @click="editItem(item)">
            <v-icon>mdi-pencil</v-icon>แก้ไข
          </v-btn>
        </v-flex>
        <v-flex xs12>
          <v-card>
            <v-card-title>
              <div>
                ที่อยู่ : {{items[0].Address}}
                <br>
                ผู้ติดต่อ : {{items[0].ContactPerson}}
                <br>
                อีเมล์ : {{items[0].Email}}
                <br>
                LineId : {{items[0].LineId}}
              </div>
            </v-card-title>
            <v-card-text class="text-xs-right">
              <v-btn
                color="primary"
                flat
                :href="'https://maps.google.com/maps?q=' + items[0].Lat +','+items[0].Long +'&hl=es;z=14&amp;output=embed'"
              >
                <v-icon>mdi-map-marker</v-icon>google map
              </v-btn>
            </v-card-text>
          </v-card>
        </v-flex>

        
      </template>
    </v-layout>

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
              <v-layout wrap row>
                <v-flex xs12 md12>
                  <v-text class="font-weight-regular">รายละเอียดลูกค้า</v-text>
                </v-flex>

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
                <v-flex xs12 md6>
                  <v-text-field
                    v-model="formModel.Email"
                    data-vv-name="อีเมล์"
                    v-validate="'email'"
                    :error-messages="errors.collect('อีเมล์')"
                    label="อีเมล์"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 md6>
                  <v-text-field
                    v-model="formModel.Address"
                    data-vv-name="ที่อยู่ลูกค้า"
                    v-validate="'required|min:2'"
                    :error-messages="errors.collect('ที่อยู่ลูกค้า')"
                    label="ที่อยู่ลูกค้า"
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
              </v-layout>
              <v-layout wrap row>
                <v-flex xs12 md12>
                  <v-text class="font-weight-regular">ข้อมูลรายละเอียด</v-text>
                </v-flex>

                <v-flex xs12 md3>
                  <v-text-field
                    v-model="formModel.RouteNo"
                    data-vv-name="หมายเลขเส้นทาง"
                    v-validate="'numeric'"
                    :error-messages="errors.collect('หมายเลขเส้นทาง')"
                    label="หมายเลขเส้นทาง"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md7>
                  <v-text-field
                    v-model="formModel.RouteName"
                    data-vv-name="ชื่อเส้นทาง"
                    v-validate="'required|min:2'"
                    :error-messages="errors.collect('ชื่อเส้นทาง')"
                    label="ชื่อเส้นทาง"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md2>
                  <v-text-field
                    v-model="formModel.Distance"
                    data-vv-name="ระยะทาง"
                    v-validate="'numeric'"
                    :error-messages="errors.collect('ระยะทาง')"
                    label="ระยะทาง"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md3>
                  <v-text-field
                    v-model="formModel.Weight"
                    data-vv-name="น้ำหนักที่ขนได้"
                    v-validate="'numeric'"
                    :error-messages="errors.collect('น้ำหนักที่ขนได้')"
                    label="น้ำหนักที่ขนได้ Kg"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md3>
                  <v-text-field
                    v-model="formModel.CC"
                    data-vv-name="ปริมาตรที่ขนได้"
                    v-validate="'numeric'"
                    :error-messages="errors.collect('ปริมาตรที่ขนได้')"
                    label="ปริมาตรที่ขนได้ CC"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 md3>
                  <span style="font-size:9pt">วันส่งของ</span>
                  <ejs-datepicker
                    style="padding-bottom:5px;"
                    v-model="formModel.RequestedDate"
                    :format="dateFormat"
                  ></ejs-datepicker>
                </v-flex>

                <v-flex xs12 md3>
                  <v-text-field
                    v-model="formModel.NumTrip"
                    data-vv-name="จำนวนรอบในการส่ง"
                    v-validate="'numeric'"
                    :error-messages="errors.collect('จำนวนรอบในการส่ง')"
                    label="จำนวนรอบในการส่ง"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                  <v-select
                    :items="JobType"
                    v-model="formModel.JobTypeObj"
                    item-text="Name"
                    item-value="Id"
                    label="ประเภทงาน"
                    return-object
                  ></v-select>
                </v-flex>
                <v-flex xs12 md6>
                  <v-select
                    :items="JobStatus"
                    v-model="formModel.JobStatusObj"
                    item-text="Name"
                    item-value="Id"
                    label="สถานะงาน"
                    return-object
                  ></v-select>
                </v-flex>

                <v-flex xs12 md12>
                  <v-text-field
                    v-model="formModel.Remark"
                    data-vv-name="หมายเหตุ"
                    v-validate="'required|min:2'"
                    :error-messages="errors.collect('หมายเหตุ')"
                    label="หมายเหตุ"
                  ></v-text-field>
                </v-flex>
              </v-layout>
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
  </v-container>
</template>
<script>
import { mapMutations, mapState } from "vuex";

export default {
  data: () => ({
    service: "job",
    objectName: "งาน",
    jobNewHeaders: [
      { text: "", sortable: false },
      { value: "CustomerName", text: "ลูกค้า", sortable: true },
      { value: "DeliveryDate", text: "วันส่งของ", sortable: true },
      { value: "ContactPerson", text: "คนติดต่อ", sortable: false },
      { text: "สินค้า", sortable: false },
      { value: "Remark", text: "หมายเหตุ", sortable: false },
      { value: "Address", text: "ที่อยู่", sortable: false },
      { value: "Weigth", text: "น้ำหนัก", sortable: true },
      { value: "CC", text: "ปริมาตร", sortable: true },
      { value: "RouteNo", text: "RouteNo", sortable: true },
      { value: "Zone", text: "Zone", sortable: true },
      { value: "Distance", text: "ระยะทาง", sortable: true }
    ],
    driverHeaders: [
      { text: "", sortable: false },
      { value: "ImageUrl", text: "", sortable: false },
      { value: "Name", text: "ชื่อพนักงาน", sortable: true },
      { value: "StaffId", text: "รหัสพนักงาน", sortable: false },
      { value: "UserName", text: "UserName", sortable: false }
    ],
    defaultValue: {
      Customer: "",
      ContactPerson: "",
      Email: "",
      LineId: "",
      Address: "",
      Lat: "",
      Long: "",
      Weight: "",
      CC: "",
      Distance: "",
      RouteNo: "",
      RouteName: "",
      Remark: "",
      RequestedDate: "",
      CreatedBy: "",
      CompletedDate: "",
      CompletedBy: "",
      NumTrip: "",
      JobTypeId: "",
      JobStatusId: ""
    },
    
    //--end config
    response:[],
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
        var res = await this.$store.dispatch(this.service + "/find", {
          query: { Id: this.$route.params.id }
        });
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

           let temp = Object.assign({}, this.formModel);
          //alert(JSON.stringify(temp))
          temp.JobStatusId = this.formModel.JobStatusObj.Id;
          temp.JobTypeId = this.formModel.JobTypeObj.Id;

          delete temp.JobStatusObj;
          delete temp.JobTypeObj;
          await this.$store.dispatch(this.service + "/patch", [
            temp.Id,
            temp
          ]);
          this.renderUI();
        } catch (err) {
          console.log(err);
          alert("ไม่สามารถแก้ไขข้อมูลได้" + err);
        } finally {
          this.loading = false;
        }
      } else {
        //Add Data
        try {
          //alert(JSON.stringify(this.formModel))
          this.$store.dispatch(this.service + "/create", this.formModel);
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

