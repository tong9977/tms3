<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card color="blue" title="เพิ่มรถ" text="กรอกรายละเอียดรถ">
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md6>
                  <v-text-field label="ทะเบียนรถ" class="purple-input"/>
                </v-flex>
                <v-flex xs12 md6>
                  <v-combobox label="ประเภท" v-model="typeSelected" :items="vehicleTypes"></v-combobox>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="๊น้ำหนักที่รับได้ (kg)" class="purple-input"/>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="๊ปริมาตรที่ขนได้ (CC)" class="purple-input"/>
                </v-flex>
                <v-flex xs12 md6>
                  <v-checkbox v-model="enable" label="ใช้งาน"></v-checkbox>
                </v-flex>
                <v-flex xs12>
                  <v-textarea class="purple-input" label="รายละเอียดอื่นๆ"/>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
          <v-card-text class="text-xs-right">
            <v-btn color="primary" to="/vehicle">ยกเลิก</v-btn>
            <v-btn color="blue" to="/vehicle">เพิ่ม</v-btn>
          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapMutations, mapState } from "vuex";

export default {
  data: () => ({
    enable: true,
    typeSelected: "",
    vehicleTypes: ["กระบะ", "รถหกล้อเล็ก", " รถหกล้อ"]
  }),
  computed: {
    ...mapState("tms", ["drivers"])
  }
};
</script>