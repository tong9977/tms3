<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card
          color="blue"
          :title="'จัดการ'+objectName"
          :text="'รายการ'+objectName+'ทั้งหมด'"
        >
          <v-btn flat slot="menu" :to="{ name: 'VehicleCreateEdit', params: { mode: 'create', Id: -1}}">
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
              <td>{{ item.LicensePlate }}</td>
              <td>{{ item.vehicletype.TypeName }}</td>
              <td>
                {{ item.Limit }}
                <span>Kg</span>
              </td>
              <td>
                {{ item.LimitCC }}
                <span>CC</span>
              </td>

              <td>
                <v-icon v-if="item.Active">mdi-check</v-icon>
                <v-icon v-else>mdi-close</v-icon>
              </td>
              <td>{{ item.Desciption }}</td>
              <td>
                <v-btn
                  color="blue"
                  class="font-weight-light"
                  :to="{ name: 'VehicleCreateEdit', params: { mode: 'edit', Id: item.Id}}"
                >
                  <v-icon>mdi-pencil</v-icon>แก้ไข
                </v-btn>
                <v-btn color="red" @click="deleteItem(item)" class="font-weight-light">
                  <v-icon>mdi-delete</v-icon>ลบ
                </v-btn>
              </td>
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
                        label="ทะเบียนรถ"
                        class="purple-input"
                        v-model="formModel.LicensePlate"
                        data-vv-name="ทะเบียนรถ"
                        v-validate="'required'"
                        :error-messages="errors.collect('ทะเบียนรถ')"
                      />
                      <!-- -->
                    </v-flex>
                    <v-flex xs12 md6>
                      <v-select
                        :items="VehicleStatus"
                        v-model="formModel.VehicleTypeObj"
                        item-text="TypeName"
                        item-value="Id"
                        label="ประเภท"
                        return-object
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 md6>
                      <v-text-field
                        label="๊น้ำหนักที่รับได้ (kg)"
                        class="purple-input"
                        v-model="formModel.Limit"
                        data-vv-name="น้ำหนักที่รับได้"
                        v-validate="'required|numeric'"
                        :error-messages="errors.collect('น้ำหนักที่รับได้')"
                      />
                      <!--  -->
                    </v-flex>
                    <v-flex xs12 md6>
                      <v-text-field
                        label="๊ปริมาตรที่ขนได้ (CC)"
                        class="purple-input"
                        v-model="formModel.LimitCC"
                        data-vv-name="ปริมาตรที่ขนได้"
                        v-validate="'required'"
                        :error-messages="errors.collect('ปริมาตรที่ขนได้')"
                      />

                      <!---->
                    </v-flex>
                    <v-flex xs12 md6>
                      <v-checkbox v-model="formModel.Active" label="ใช้งาน"></v-checkbox>
                    </v-flex>
                    <v-flex xs12>
                      <v-textarea
                        class="purple-input"
                        label="รายละเอียดอื่นๆ"
                        v-model="formModel.Desciption"
                        data-vv-name="รายละเอียด"
                        v-validate="'required'"
                        :error-messages="errors.collect('รายละเอียด')"
                      />
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
  </v-container>
</template>


<script>
export default {
  data: () => ({
    //--start config
    service: "vehicle",
    objectName: "รถ",
    headers: [
      { value: "Id", text: "Id", sortable: true },
      { value: "LicensePlate", text: "ทะเบียนรถ", sortable: false },
      { value: "Type", text: "ประเภท", sortable: true },
      { value: "Limit", text: "น้ำหนักที่ขนได้", sortable: true },
      { value: "LimitCC", text: "ปริมาตรที่ขนได้", sortable: true },
      { value: "Active", text: "ใช้งาน", sortable: true },
      { value: "Desciption", text: "รายละเอียด", sortable: true },
      { text: "", sortable: false }
    ],
    defaultValue: {
      LicensePlate: "",
      Limit: "",
      LimitCC: "",
      Desciption: "",
      Active: false,
      VehicleTypeObj: {}
    },
    query: { $sort: { Id: -1 } },
    //--end config

    items: [],
    VehicleStatus: [],
    VehicleTypesSelete: { Id: 1 },
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
      var res = await this.$store.dispatch("vehicletype/find", {});
      this.VehicleStatus = res.data;
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

      try {
        const { Vehicle } = this.$FeathersVuex;

        Vehicle.find({ query: { $eager: "vehicletype" } }).then(res => {
          this.vehicle = res.data;
        });

        var vehicletype = await this.$store.dispatch("vehicletype/find", {});
        this.vehicleStatus = vehicletype;
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
        alert("กรุณากรอกข้อมูลให้สมบรูณ์");
        return;
      }
      this.loading = true;
      if (this.mode === "edit") {
        try {
          let temp = Object.assign({}, this.formModel);
          //alert(JSON.stringify(temp))
          temp.VehicleTypeId = this.formModel.VehiclaeTypeObj.Id;
          delete temp.VehicleTypeObj;
          await this.$store.dispatch(this.service + "/patch", [
            temp.Id,
            temp
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
          temp.VehicleTypeId = this.formModel.VehicleTypeObj.Id;
          delete temp.VehicleTypeObj;
          this.$store.dispatch(this.service + "/create", temp);
          this.renderUI();
        } catch (err) {
          console.log(err);
          alert("ไม่สามารถเพิ่มข้อมูลได้");
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

