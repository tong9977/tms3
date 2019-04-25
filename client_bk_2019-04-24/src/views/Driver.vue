<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card color="green" title="พนักงานขับรถ" text="รายชื่อพนักงานขับรถทั้งหมด">
          <v-btn flat slot="menu" to="/driveradd">
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
              <td>{{ item.FirstName}} {{ item.LastName}} </td>
              <td>{{ item.Email }}</td>
              <td>{{ item.RoleId }}</td>
              <td>{{ item.Description }}</td>
              <td>
                <v-btn :to="'/driveredit/'+ item.Id" color="secondary" class="font-weight-light">
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


export default {
  data: () => ({
    user:[],
    headers: [
      { value: "Id", text: "Id", sortable: true },
      { value: "ImageUrl", text: "", sortable: false },
      { value: "StaffCode", text: "รหัสพนักงาน", sortable: false },
      { value: "FirstName", text: "ชื่อ-สกุล", sortable: true },
      { value: "Email", text: "UserName", sortable: false },
      { value: "RoleId", text: "ตำแหน่ง", sortable: false },
      { value: "Description", text: "รายละเอียด", sortable: false },
      { text: "", sortable: false }
    ]
  }),
  computed: {
  
  },
  mounted: function() {
    const { User } = this.$FeathersVuex;

    //User
    User.find().then(res => {
      this.user = res.data;
    });
  },

  methods:{
    onDelete(id) {
      // alert("delete :" + id);
      store.dispatch("user/remove", id);
    }
  }
  
};
</script>