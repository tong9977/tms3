<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card color="blue" title="จัดการรถ" text="รายการรถทั้งหมด">
          <v-btn flat slot="menu" to="/vehicleadd">
            <v-icon>mdi-plus</v-icon>เพิ่ม
          </v-btn>

          <v-data-table :headers="headers" :items="vehicle" hide-actions>
            <template slot="headerCell" slot-scope="{ header }">
              <span class="subheading font-weight-light text--darken-3" v-text="header.text"/>
            </template>

            <template slot="items" slot-scope="{ item }">
              <td>{{ item.VehicleId }}</td>
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
                  :to="'../vehicleedit/'+ item.VehicleId"
                  class="font-weight-light"
                >
                  <v-icon>mdi-pencil</v-icon>แก้ไข
                </v-btn>
                <v-btn color="red" class="font-weight-light" @click="onDelete(item.VehicleId)">
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

export default {
  data: () => ({
    vehicle: [],
    dialog: false,
    
    headers: [
      { value: "VehicleId", text: "Id", sortable: true },
      { value: "LicensePlate", text: "ทะเบียนรถ", sortable: false },
      { value: "Type", text: "ประเภท", sortable: true },
      { value: "Limit", text: "น้ำหนักที่ขนได้", sortable: true },
      { value: "LimitCC", text: "ปริมาตรที่ขนได้", sortable: true },
      { value: "Enable", text: "ใช้งาน", sortable: true },
      { value: "Desciption", text: "รายละเอียด", sortable: true },
      { text: "", sortable: false }
    ]
  }),
 
   mounted: function() {
    this.renderUI();
  },

  methods:{
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
       await this.$store.dispatch("vehicle/remove", id);
        this.renderUI();
      } catch (err) {
        alert("ไม่สามารถต่อ server ได้");
      }
      //this.renderUI();
    },

    async renderUI() {
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
    }
  } 


};
</script>