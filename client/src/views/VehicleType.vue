<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card color="blue" title="จัดการประเภทรถ" text="รายการประเภทรถทั้งหมด">
          <v-btn flat slot="menu" @click="DialogAdd()">
            <v-icon>mdi-plus</v-icon>เพิ่ม
          </v-btn>

          <v-data-table :headers="headers" :items="vehicletype" hide-actions>
            <template slot="headerCell" slot-scope="{ header }">
              <span class="subheading font-weight-light text--darken-3" v-text="header.text"/>
            </template>

            <template slot="items" slot-scope="{ item }">
              <td>{{ item.Id }}</td>

              <td>{{ item.TypeName }}</td>

              <td>
                <v-btn
                  color="blue"
                  class="font-weight-light"
                  @click="onEdit(item.Id, item.RoleName)"
                >
                  <v-icon>mdi-pencil</v-icon>แก้ไข
                </v-btn>
                <v-btn color="red" @click="onDelete(item.Id)" class="font-weight-light">
                  <v-icon>mdi-delete</v-icon>ลบ
                </v-btn>
              </td>
            </template>
          </v-data-table>
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
    dialog: false,
    q: { $sort: { Id: -1 } },
    headers: [
      { value: "Id", text: "Id", sortable: true },
      { value: "TypeName", text: "รายละเอียดรถ", sortable: true },
      { text: "", sortable: false }
    ]
  }),
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
    async onDelete(id) {
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
    },

    async DialogAdd() {
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
    },

    async onEdit(id, typeName) {
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
    }
  }
};
</script>