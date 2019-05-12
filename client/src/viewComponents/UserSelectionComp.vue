<template>
  <div class="full-height">
    <v-card>
      <div class="blue py-1 elevation-2">
        <v-layout row wrap>
          <v-flex xs6>
            <h3 class="px-4 white--text">เลือกพนักงานที่จะไปกับรถคันนี้</h3>
          </v-flex>
          <v-flex xs6 text-xs-right>
            <v-btn class="green mx-4" @click="OkClick">OK</v-btn>
          </v-flex>
        </v-layout>
      </div>

      <v-layout justify-center wrap>
        <v-flex md12>
          <v-card class="pa-4">
            <v-subheader>มีทั้งหมด {{total}} รายการ {{JobsId}}</v-subheader>
            <v-data-table :headers="headers" :items="items" hide-actions>
              <template slot="headerCell" slot-scope="{ header }">
                <span class="subheading font-weight-light text--darken-3" v-text="header.text"/>
              </template>

              <!-- set column แสดงผลที่นี้ -->
              <template slot="items" slot-scope="{ item }">
                <td>
                  <v-radio-group v-model="UserId" :mandatory="false">
                    <v-radio :value="item.Id" :label="item.Id"></v-radio>
                  </v-radio-group>
                </td>
                <td>{{ item.FirstName}} {{ item.LastName}}</td>
                <td>{{ item.StaffCode }}</td>
                <td>{{ item.role.RoleName }}</td>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import JobCreateEditDialog from "@/viewComponents/JobCreateEditDialog.vue";
import { createDateFilter } from "vue-date-fns";
import locale from "date-fns/locale/th";

export default {
  components: {
    JobCreateEditDialog
  },
  data: () => ({
    //--start config
    service: "user",
    objectName: "พนักงานขับรถ",
    headers: [
      { value: "", text: "", sortable: false },
      { value: "FirstName", text: "ชื่อ-สกุล", sortable: true },

      { value: "StaffCode", text: "รหัสพนักงาน", sortable: true },

      { value: "RoleName", text: "ตำแหน่ง", sortable: true },

      { text: "", sortable: false }
    ],
    defaultValue: {},

    //--end config
    //colorTheme:'',
    items: [],
    total: 0,
    loading: false,
    dialog: false,
    formModel: {},
    user: [],
    UserId: []
  }),

  computed: {},
  async mounted() {
    //init here

    this.ready();
  },

  methods: {
    async ready() {
      try {
        this.query = {
          query: {
            Active: true
          }
        };
        var res = await this.$store.dispatch(
          this.service + "/find",
          this.query
        );
        this.total = res.total;
        this.items = res.data;
      } catch (error) {
        console.log(error);
        this.$toast.error("ไม่สามารถขอข้อมูลจาก server ได้");
      }

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
    },
    OkClick(item) {
      this.$emit("success", this.UserId);
      this.UserId = [];
      this.renderUI();
    }
  }
};
</script>
<style>
.full-height {
  height: 100%;
  background-color: #ffffff;
}
</style>

<!-- Component Docs
props 0 ตัว
- 

event 1 ตัว
- success โยนตัวแปร Id เพื่อไปหน้า Schedule จาก v-model="UserId" ของ v-radio


- error(err)
-->