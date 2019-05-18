
<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card color="purple darken-4" title="จัดการใบงานปิดแล้ว" text="รายการใบงานปิดแล้วสิ้นทั้งหมด">
          
          <JobListComp :JobStatusId="4" @itemClick="GotoDetail"/>
          
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

