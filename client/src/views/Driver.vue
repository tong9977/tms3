<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card color="green" title="พนักงานขับรถ" text="รายชื่อพนักงานขับรถทั้งหมด">
          <v-btn flat slot="menu" to="/driveradd">
            <v-icon>mdi-plus</v-icon>เพิ่ม
          </v-btn>

          <v-data-table :headers="headers" :items="drivers" hide-actions>
            <template slot="headerCell" slot-scope="{ header }">
              <span class="subheading font-weight-light text--darken-3" v-text="header.text"/>
            </template>
            <template slot="items" slot-scope="{ item }">
              <td>{{ item.DriverId }}</td>
              <td>
                <v-avatar size="64" color="grey lighten-4">
                  <img :src="item.ImageUrl" alt="avatar">
                </v-avatar>
              </td>
              <td>{{ item.FirstName}} {{ item.LastName}} </td>
              <td>{{ item.StaffId }}</td>
              <td>{{ item.UserName }}</td>
              <td>
                <v-btn color="secondary" class="font-weight-light">
                    <v-icon>mdi-pencil</v-icon>แก้ไข
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

export default {
  data: () => ({
    headers: [
      { value: "DriverId", text: "Id", sortable: true },
      { value: "ImageUrl", text: "", sortable: false },
      { value: "Name", text: "ชื่อพนักงาน", sortable: true },
      { value: "StaffId", text: "รหัสพนักงาน", sortable: false },
      { value: "UserName", text: "UserName", sortable: false },
      { text: "", sortable: false }
    ]
  }),
  computed: {
    ...mapState("tms", ["drivers"])
  }
};
</script>