<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card color="green" title="ประเภทพนักงาน" text="ประเภทพนักงานทั้งหมด">
          <v-btn flat slot="menu" @click="dialogAdd">
            <v-icon>mdi-plus</v-icon>เพิ่ม
          </v-btn>

          <v-data-table :headers="headers" :items="roles" hide-actions>
            <template slot="headerCell" slot-scope="{ header }">
              <span class="subheading font-weight-light text--darken-3" v-text="header.text"/>
            </template>
            <template slot="items" slot-scope="{ item }">
              <td>{{ item.Id }}</td>
              <td>{{ item.RoleName }}</td>
              <td>
                <v-btn
                  color="secondary"
                  class="font-weight-light"
                  @click="dialogEdit(item.Id, item.RoleName)"
                >
                  <v-icon>mdi-pencil</v-icon>แก้ไข
                </v-btn>
              </td>
              <td>
                <v-btn @click="onDelete(item.Id)" color="secondary" class="font-weight-light">
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
import { mapGetters, mapMutations, mapState } from "vuex";
import store from "@/store";
import VuetifyDialog from "vuetify-dialog";

export default {
  data: () => ({
    roles: [],
    headers: [
      { value: "Id", text: "Id", sortable: true },
      { value: "RoleName", text: "ประเทภพนักงาน", sortable: false },
      { text: "", sortable: false }
    ],

    roleName: null
  }),

  async mounted() {
    this.renderUI();
  },

  methods: {
    async dialogAdd() {
      let res = await this.$dialog.prompt({
        text: "ชื่อประเภทพนักงาน",
        title: "เพิ่มชื่อประเภทพนักงาน"
      });
      if (res) {
        try {
          var data = {
            RoleName: res
          };

          // console.table(data);
          await store.dispatch("role/create", data);
          this.renderUI();
        } catch (err) {
          alert("ไม่สามารถต่อ server ได้");
        }
      }
    },

    async dialogEdit(id, roleName) {
      let res = await this.$dialog.prompt({
        text: "ชื่อประเภทพนักงาน",
        title: "แก้ไขชื่อประเภทพนักงาน",
        value: roleName
      });
      if (res) {
        try {
          let data = {
            RoleName: res
          };
          // alert(JSON.stringify(data));
          await this.$store.dispatch("role/patch", [id, data]);
          this.renderUI();
        } catch (err) {
          alert("ไม่สามารถต่อ server ได้");
        }
      }
    },

    async onDelete(id) {
      try {
        await this.$store.dispatch("role/remove", id);
        this.renderUI();
      } catch (err) {
        alert("ไม่สามารถต่อ server ได้");
      }
    },

    async renderUI() {
      try {
        const { Role } = this.$FeathersVuex;
        //Role
        Role.find().then(res => {
          this.roles = res.data;
        });
      } catch (err) {
        alert("ไม่สามารถต่อ server ได้");
      }
    }
  }
};
</script>