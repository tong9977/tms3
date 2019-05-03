<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card color="green" title="พนักงานขับรถ" text="รายชื่อพนักงานขับรถทั้งหมด">
          <v-btn flat slot="menu" :to="{ name: 'DriverCreateEdit', params: { mode: 'create'}}">
            <v-icon>mdi-plus</v-icon>เพิ่ม
          </v-btn>

          <v-data-table :headers="headers" :items="user" hide-actions>
            <template slot="headerCell" slot-scope="{ header }">
              <span class="subheading font-weight-light text--darken-3" v-text="header.text"/>
            </template>
            <template slot="items" slot-scope="{ item }">
              <td>{{ item.Id }}</td>
              <td>
                <v-avatar size="64" color="grey lighten-4">
                  <img :src="item.ImageUrl" alt="avatar">
                </v-avatar>
              </td>
              <td>{{ item.StaffCode }}</td>
              <td>{{ item.FirstName}} {{ item.LastName}}</td>
              <td>{{ item.Email }}</td>
              <td>{{ item.role.RoleName }}</td>
              <td>{{ item.Description }}</td>
              <td>
                <v-btn
                  :to="{ name: 'DriverCreateEdit', params: { mode: 'edit', Id: item.Id}}"
                  color="secondary"
                  class="font-weight-light"
                >
                  <v-icon>mdi-pencil</v-icon>แก้ไข
                </v-btn>
              </td>
              <td>
                <v-btn @click="onDelete(item)" color="secondary" class="font-weight-light">
                  <v-icon>mdi-delete</v-icon>ลบ
                </v-btn>
              </td>
            </template>
          </v-data-table>
          <!-- dialog สำหรับลบ -->
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">ยืนยันการลบข้อมูล</span>
              </v-card-title>

              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex>ต้องการลบ {{ deleteItem.Email }} ใช่หรือไม่ ?</v-flex>
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
import { mapGetters, mapMutations, mapState } from "vuex";
import store from "@/store";

export default {
  data: () => ({
    deleteItem:0,
    dialogDelete: false,
    loading : false,
    user: [],
    headers: [
      { value: "Id", text: "Id", sortable: true },
      { value: "ImageUrl", text: "", sortable: false },
      { value: "StaffCode", text: "รหัสพนักงาน", sortable: false },
      { value: "FirstName", text: "ชื่อ-สกุล", sortable: true },
      { value: "Email", text: "UserName", sortable: false },
      { value: "RoleName", text: "ตำแหน่ง", sortable: false },
      { value: "Description", text: "รายละเอียด", sortable: false },
      { text: "", sortable: false }
    ]
  }),
  computed: {},
  mounted: function() {
    this.renderUI();
  },

  methods: {
    closeDialog() {
      this.dialog = false;
      this.dialogDelete = false;
    },
    async onDelete(item) {
      this.deleteItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    async deleteToServer(id) {
      this.loading = true;
      try {
        await this.$store.dispatch("user/remove", this.deleteItem.Id);
        this.renderUI();
      } catch (err) {
        alert("ไม่สามารถต่อ server ได้");
      } finally {
        this.loading = false;
        this.dialogDelete = false;
      }
    },

    async renderUI() {
      try {
        const { User } = this.$FeathersVuex;
        //User
        User.find({ query: { $eager: "role" } }).then(res => {
          this.user = res.data;
        });

        var role = await this.$store.dispatch("role/find", {});
        this.userStatus = role;
      } catch (err) {
        alert("ไม่สามารถต่อ server ได้");
      }
    }
  }
};
</script>