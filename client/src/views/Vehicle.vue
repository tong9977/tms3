<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card color="blue" title="จัดการรถ" text="รายการรถทั้งหมด">
          <v-btn flat slot="menu" to="/vehicleadd">
            <v-icon>mdi-plus</v-icon>เพิ่ม
          </v-btn>

          <v-data-table :headers="headers" :items="vehicles" hide-actions>
            <template slot="headerCell" slot-scope="{ header }">
              <span class="subheading font-weight-light text--darken-3" v-text="header.text"/>
            </template>
            <template slot="items" slot-scope="{ item }">
              <td>{{ item.VehicleId }}</td>
              <td>{{ item.LicensePlate }}</td>
              <td>{{ item.Type }}</td>
              <td>{{ item.Limit }} <span>Kg</span> </td>
              <td>{{ item.LimitCC }} <span>CC</span></td>
              <td>
                  <v-icon v-if="item.Enable">mdi-check</v-icon>
                  <v-icon v-else>mdi-close</v-icon>
              </td>
              <td>
                <v-btn color="blue" class="font-weight-light">
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
      { value: "VehicleId", text: "Id", sortable: true },
      { value: "LicensePlate", text: "ทะเบียนรถ", sortable: false },
      { value: "Type", text: "ประเภท", sortable: true },
      { value: "Limit", text: "น้ำหนักที่ขนได้", sortable: true },
      { value: "LimitCC", text: "ปริมาตรที่ขนได้", sortable: true },
      { value: "Enable", text: "ใช้งาน", sortable: true },
      { text: "", sortable: false }
    ]
  }),
  computed: {
    ...mapState("tms", ["vehicles"])
  }
};
</script>