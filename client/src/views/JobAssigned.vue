
<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card color="blue" title="จัดการใบงานมอบหมายแล้ว" text="รายการใบงานมอบหมายแล้วสิ้นทั้งหมด">
          
          <JobListComp :JobStatusId="2" @itemClick="GotoDetail"/>
          
          <!-- dialog สำหรับ เพิ่ม แก้ไข -->
          <v-dialog v-model="dialog" max-width="1200px">
          
             <JobCreateEditDialog @Done="dialog = false" @Success="GotoDetail"/>
          </v-dialog>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import JobListComp from "@/viewComponents/JobListComp.vue";
import JobCreateEditDialog from "@/viewComponents/JobCreateEditDialog.vue";

export default {
  data: () => ({
    dialog: false,
    formModel: {}
  }),
  components: {
    JobListComp,
    JobCreateEditDialog
  },
  methods: {
   
    GotoDetail(Id) {
      this.$router.push({ path: `/jobdetail/${Id}` })
    }
  }
};
</script>































<!--<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card color="blue" title="ใบงานมอบหมายแล้ว" text="ใบเงานที่รับมอบหมายแล้ว">
          <v-data-table :headers="headers" :items="jobassigns" hide-actions>
            <template slot="headerCell" slot-scope="{ header }">
              <span class="subheading font-weight-light text--darken-3" v-text="header.text"/>
            </template>
            <template slot="items" slot-scope="{ item }">
              <td>{{ item.JobId }}</td>
              <td>{{ item.CustomerName }}</td>
              <td>{{ item.DeliveryDate }}</td>
              <td>
                {{ item.ContactPerson }}
                <br>
                {{ item.Tel }}
              </td>
              <td>
                <ul>
                  <li
                    v-for="p in item.Products"
                    :key="p.ProductName"
                  >{{p.ProductName}} {{p.Quantity}} {{p.Unit}}</li>
                </ul>
              </td>
              <td>{{ item.Remark }}</td>
              <td>
                {{ item.Address }}
                <a
                 :href="'https://maps.google.com/maps?q=' + item.Lat +','+item.Long +'&hl=es;z=14&amp;output=embed'"
                  style="color:#0000FF;text-align:left"
                  target="_blank"
                >map</a>
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
      { value: "JobId", text: "Id", sortable: true },
      { value: "CustomerName", text: "ลูกค้า", sortable: true },
      { value: "DeliveryDate", text: "วันส่งของ", sortable: true },
      { value: "ContactPerson", text: "คนติดต่อ", sortable: false },
      { text: "สินค้า", sortable: false },
      { value: "Remark", text: "หมายเหตุ", sortable: false },
      { value: "Address", text: "ที่อยู่", sortable: false }
    ]
  }),
  computed: {
    ...mapState("tms", ["jobassigns"])
  }
};
</script>  -->



