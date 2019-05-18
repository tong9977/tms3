<template>
  <v-layout justify-center wrap>
    <v-flex md12>
      <material-card color="green" title="จัดการ Log">
        <v-btn flat slot="menu" @click="addItem()">
          <v-icon>mdi-plus</v-icon>เพิ่ม
        </v-btn>
        <v-subheader>มีทั้งหมด {{total}} รายการ</v-subheader>
        <v-data-table :headers="headers" :items="joblogs" hide-actions>
          <template slot="headerCell" slot-scope="{ header }">
            <span class="subheading font-weight-light text--darken-3" v-text="header.text"/>
          </template>
          <!-- set column แสดงผลที่นี้ -->
          <template slot="items" slot-scope="{ item }">
            <td>{{ item.Id }}</td>
            <td>{{ item.joblogtype.Name }}</td>
            <td>{{ item.Description }}</td>
            <td>{{ item.CreatedDate | date}}</td>
            <td>
              <v-btn color="blue" class="font-weight-light" @click="editItem(item)">
                <v-icon>mdi-pencil</v-icon>แก้ไข
              </v-btn>
              <v-btn color="red" @click="deleteItem(item)" class="font-weight-light">
                <v-icon>mdi-delete</v-icon>ลบ
              </v-btn>
            </td>
          </template>
        </v-data-table>

        <!-- dialog สำหรับ เพิ่ม แก้ไข -->
        <v-dialog v-model="dialog" max-width="800px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <!-- set form กรอกข้อมูลที่นี้ -->
                  <v-flex xs12 md12>
                    <v-select
                      v-model="formModel.JobLogTypeObj"
                      :items="JoblogStatusSelect"
                      item-text="Name"
                      item-value="Id"
                      label="ประเภท"
                      return-object
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 md12>
                    <v-text-field
                      v-model="formModel.Description"
                      data-vv-name="รายละเอียด"
                      v-validate="'required'"
                      :error-messages="errors.collect('รายละเอียด')"
                      label="รายละเอียด"
                    ></v-text-field>
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

        <!-- dialog สำหรับลบ -->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">ยืนยันการลบข้อมูล</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex>ต้องการลบ "{{formModel[Object.keys(formModel)[1]]}}" ออกจากรายการหรือไม่ ?</v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="closeDialog">Cancel</v-btn>
              <v-btn color="blue darken-1" flat :loading="loading" @click="deleteToServer">ลบ</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
    service: "joblog",
    objectName: "Log",
    headers: [
      { value: "Id", text: "Id", sortable: true },
      { value: "LogName", text: "Log Name", sortable: true },
      { value: "Description", text: "ลายละเอียด", sortable: true },
      { value: "CreatedDate", text: "วันที่สร้าง", sortable: true },
      { text: "", sortable: false }
    ],
    defaultValue: {
      Description: ""
    },
    query: {},
    //--end config

    joblogs: [], // data ที่มาจากการ find ของ server
    total: 0,
    inDTO: {}, // data ที่มาจากการ get ของ server
    outDTO: {}, // data ที่เป็น Object ที่จะส่งไป create หรือ update ที่ server
    loading: false,
    dialog: false,
    dialogDelete: false,
    formModel: {},
    JoblogStatus: [],
    JoblogStatusSelect: {},
    itemsProductstatus: []
  }),

  props: ["mode", "JobId"],
  computed: {
    formTitle() {
      return this.mode === "create"
        ? "เพิ่ม " + this.objectName
        : "แก้ไข " + this.objectName;
    }
  },
  filters: {
    date: createDateFilter("DD/MM/YYYY HH:mm", { locale })
  },
  async mounted() {
    //init here

    this.renderUI();

    try {
      var res = await this.$store.dispatch("joblogtype/find", {});
      this.JoblogStatusSelect = res.data;
    } catch (error) {
      console.log(error);
      this.$toast.error("ไม่สามารถติดต่อ server ได้");
    }
  },
  methods: {
    async renderUI() {
      try {
        var res2 = await this.$store.dispatch(
          this.service + "/find",
          this.query
        );
        this.total = res2.total;
        this.joblogs = res2.data;
      } catch (error) {
        console.log(error);
        alert("ไม่สามารถขอข้อมูลจาก server ได้ +++");
      }

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
        this.joblogs = res.data;
      } catch (error) {
        console.log(error);
        this.$toast.error("ไม่สามารถขอข้อมูลจาก server ได้");
      }

      try {
        const { JobLog } = this.$FeathersVuex;

        JobLog.find({ query: { $eager: "joblogtype" } }).then(res => {
          this.joblog = res.data;
        });

        var joblogtype = this.$store.dispatch("joblogtype/find", {});
        this.JoblogStatus = joblogtype;
      } catch (err) {
        alert("ไม่สามารถต่อ server ได้");
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
        this.$toast.error("กรุณากรอกข้อมูลให้สมบรูณ์");
        return;
      }
      this.loading = true;
      if (this.mode === "edit") {
        try {
          let temp = Object.assign({}, this.formModel);
          // hook ที่จะแก้ข้อมูลก่อนส่งไป server ใส่ที่นี้
          temp.JobLogTypeId = this.formModel.JobLogTypeObj.Id;
          delete temp.JobLogTypeObj;

          temp.JobId = this.JobId;

          await this.$store.dispatch(this.service + "/patch", [
            this.formModel.Id,
            temp,
            this.$toast.success("แก้ไขข้อมูลสำเร็จ")
          ]);
          this.renderUI();
        } catch (err) {
          console.log(err);
          this.$toast.error("ไม่สามารถแก้ไขข้อมูลได้" + err);
        } finally {
          this.loading = false;
        }
      } else {
        //Add Data
        try {
          let temp = Object.assign({}, this.formModel);
          // hook ที่จะแก้ข้อมูลก่อนส่งไป server ใส่ที่นี้
          temp.JobLogTypeId = this.formModel.JobLogTypeObj.Id;
          delete temp.JobLogTypeObj;

          temp.JobId = this.JobId;
          this.$store.dispatch(this.service + "/create", temp);
          this.$toast.success("เพิ่มข้อมูลสำเร็จ");
          this.renderUI();
        } catch (err) {
          console.log(err);
          this.$toast.error("ไม่สามารถเพิ่มข้อมูลได้");
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
        this.$toast.success("ลบข้อมูลสำเร็จ");
        this.renderUI();
      } catch (err) {
        console.log(err);
        this.$toast.error("ไม่สามารถลบข้อมูลได้");
      } finally {
        this.loading = false;
        this.dialogDelete = false;
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
