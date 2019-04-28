<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card color="blue" title="จัดการประเภทรถ" text="รายการประเภทรถทั้งหมด">
          <v-btn flat slot="menu" @click.stop="add">
            <v-icon>mdi-plus</v-icon>เพิ่ม
          </v-btn>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
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
                <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" :loading="loading" flat @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-data-table :headers="headers" :items="vehicletype" hide-actions>
            <template slot="headerCell" slot-scope="{ header }">
              <span class="subheading font-weight-light text--darken-3" v-text="header.text"/>
            </template>

            <template slot="items" slot-scope="{ item }">
              <td>{{ item.Id }}</td>

              <td>{{ item.TypeName }}</td>
              <!-- @click="onEdit(item.Id, item.TypeName)" -->
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

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">ยืนยันการลบข้อมูล</span>
              </v-card-title>

              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex>ต้องการลบ "{{formModel.TypeName}}" ออกจากรายการหรือไม่ ?</v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" flat :loading="loading" @click="deletedata">ลบ</v-btn>
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
import store from "@/store";
import VuetifyDialog from "vuetify-dialog";

export default {
  data: () => ({
    vehicletype: [],
    loading: false,
    dialog: false,
    dialogDelete: false,
    q: { $sort: { Id: -1 } },
    headers: [
      { value: "Id", text: "Id", sortable: true },
      { value: "TypeName", text: "รายละเอียดรถ", sortable: true },
      { text: "", sortable: false }
    ],
    formModel: {
      TypeName: ""
    },
    defaultValue: {
      TypeName: ""
    },

    mode: -1
  }),
  computed: {
    formTitle() {
      return this.mode === -1 ? "เพิ่มประเภทรถ" : "แก้ไขประเภทรถ";
    }
  },
  mounted: function() {
    this.renderUI();
  },
  methods: {
    async renderUI() {
      try {
        var res = await this.$store.dispatch("vehicletype/find", {});
        this.vehicletype = res.data;
      } catch (error) {
        console.log(error);
        alert("ไม่สามารถติดต่อ server ได้");
      }
    },
    /*async onDelete(id) {
      let res = await this.$dialog.confirm({
        text: "ต้องการลบข้อมูลออกจากรายการหรือไม่ ?",
        title: "ยืนยันการลบข้อมูล",
        actions: {
          false: "ยกเลิก",
          true: {
            color: "red",
            text: "ตกลง"
          }
        }
      });
      try {
        await this.$store.dispatch("vehicletype/remove", id);
        this.renderUI();
      } catch (err) {
        alert("ไม่สามารถต่อ server ได้");
      }
      //this.renderUI();
    },*/

    /* async DialogAdd() {
      let res = await this.$dialog.prompt({
        text: "กรอกประเภทรถ",
        title: "เพิ่มประเภทรถ"
      });
      if (res) {
        try {
          var data = {
            TypeName: res
          };
          // alert(JSON.stringify(data))
          store.dispatch("vehicletype/create", data);
          this.$dialog.notify.success("ประเภทรถ : " + res);
          this.renderUI();
        } catch (err) {
          alert("ไม่สามารถต่อ server ได้");
        }
      }
    }, */

    /*async onEdit(id, typeName) {
      let res = await this.$dialog.prompt({
        text: "ชื่อประเภทรถ",
        title: "แก้ไขประเภทรถ",
        value: typeName
      });
      if (res) {
        try {
          let data = {
            TypeName: res
          };
          // alert(JSON.stringify(data));
          await this.$store.dispatch("vehicletype/patch", [id, data]);
          this.$dialog.notify.success("ประเภทรถ : " + res);
          this.renderUI();
        } catch (err) {
          alert("ไม่สามารถต่อ server ได้");
        }
      }
    },*/

    async editItem(item) {
      this.mode = this.vehicletype.indexOf(item);
      this.formModel = Object.assign({}, item);
      this.dialog = true;
    },
    async deleteItem(item) {
      this.formModel = Object.assign({}, item);
      //alert(JSON.stringify(this.formModel.Id))
      this.dialogDelete = true;
    },

    async close() {
      this.dialog = false;
      this.dialogDelete = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultValue);
        this.mode = -1;
      }, 30000);
    },
    async save() {
      const valid = await this.$validator.validateAll();
      if (!valid) {
        alert("กรุณากรอกข้อมูลให้สมบรูณ์");
        return;
      }
      this.loading = true;
      if (this.mode > -1) {
        //Edit Data
        //alert(JSON.stringify( this.formModel));
        try {
          await this.$store.dispatch("vehicletype/patch", [
            this.formModel.Id,
            this.formModel
          ]);
          this.renderUI();
        } catch (err) {
          alert("ไม่สามารถต่อ server ได้");
        } finally {
          this.loading = false;
        }
      } else {
        //Add Data
        //alert(this.editedIndex);
        try {
          //alert(JSON.stringify(this.formModel))
          store.dispatch("vehicletype/create", this.formModel);
          this.renderUI();
        } catch (err) {
          alert("ไม่สามารถต่อ server ได้");
        } finally {
          this.loading = false;
        }
      }
      this.close();
    },
    async deletedata() {
      this.loading = true;
      try {
        await this.$store.dispatch("vehicletype/remove", this.formModel.Id);
        this.renderUI();
      } catch (err) {
        alert("ไม่สามารถต่อ server ได้");
      } finally {
        this.loading = false;
        this.dialogDelete = false;
      }
    },
    add() {
      this.formModel = Object.assign({}, this.defaultValue);
      this.dialog = true;
    }
  }
};
</script> 

