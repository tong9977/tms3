<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card color="orange" title="จัดการใบงานใหม่" text="รายการใบงานใหม่ทั้งหมด">
          <v-btn flat slot="menu" @click="addItem()">
            <v-icon>mdi-plus</v-icon>เพิ่ม
          </v-btn>
          <JobListComp :JobStatusId="1" @itemClick="GotoDetail"/>
          <!-- dialog สำหรับ เพิ่ม แก้ไข -->
          <v-dialog v-model="dialog" max-width="1200px">
            <JobCreateEditDialog @Done="dialog = false" @Success="GotoDetail" mode="create"/>
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
    async addItem() {
      this.dialog = true;
    },
    GotoDetail(Id) {
      this.$router.push({ path: `/jobdetail/${Id}` })
    }
  }
};
</script>


