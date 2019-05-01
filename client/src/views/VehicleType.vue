<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card
          color="blue"
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
              <td>{{ item.TypeName }}</td>
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
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <!-- set form กรอกข้อมูลที่นี้ -->
                    <v-flex>
                      <v-text-field
                        v-model="formModel.TypeName"
                        data-vv-name="ประเภทรถที่ต้องการ"
                        v-validate="'required|min:2'"
                        :error-messages="errors.collect('ประเภทรถที่ต้องการ')"
                        label="กรอกประเภทรถ"
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
  </v-container>
</template>


<script>
export default {
  data: () => ({
    //--start config
    service: "vehicletype",
    objectName: "ประเภทรถ",
    headers: [
      { value: "Id", text: "Id", sortable: true },
      { value: "TypeName", text: "รายละเอียดรถ", sortable: true },
      { text: "", sortable: false }
    ],
    defaultValue: {
      TypeName: ""
    },
    query: { $sort: { Id: -1 } },
    //--end config

    items: [], // data ที่มาจากการ find ของ server
    total: 0,
    inDTO: {}, // data ที่มาจากการ get ของ server
    outDTO: {}, // data ที่เป็น Object ที่จะส่งไป create หรือ update ที่ server
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
          this.outDTO = Object.assign({}, this.formModel);
          // hook ที่จะแก้ข้อมูลก่อนส่งไป server ใส่ที่นี้

          await this.$store.dispatch(this.service + "/patch", [
            this.formModel.Id,
            this.outDTO
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
          this.outDTO = Object.assign({}, this.formModel);
          // hook ที่จะแก้ข้อมูลก่อนส่งไป server ใส่ที่นี้

          this.$store.dispatch(this.service + "/create", this.outDTO);
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

