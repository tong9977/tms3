
<template>
  <v-card>
    <v-card-title>
      <span class="headline">เปลี่ยนรหัสผ่าน</span>
    </v-card-title>

    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <!-- set form กรอกข้อมูลที่นี้ -->
          <v-layout wrap row>
            <v-flex xs12 md12>
              <v-text class="font-weight-regular">รายละเอียดลูกค้า</v-text>
            </v-flex>

            <v-flex xs12 md12>
              <v-text-field
                v-model="formModel.Password1"
                v-validate="'required'"
                name="password"
                type="password"
                :class="{'is-danger': errors.has('password')}"
                placeholder="กรอกรหัสผ่าน"
                ref="password"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md12>
              <v-text-field
                v-model="formModel.Password2"
                v-validate="'required|confirmed:password'"
                name="password_confirmation"
                type="password"
                :class="{'is-danger': errors.has('password_confirmation')}"
                placeholder="กรอกรหัสผ่านอีกครั้ง"
                data-vv-as="password"
              ></v-text-field>
            </v-flex>

            <span
              v-show="errors.has('password')"
              class="help is-danger"
            >{{ errors.first('password') }}</span>
            <span
              v-show="errors.has('password_confirmation')"
              class="help is-danger"
            >{{ errors.first('password_confirmation') }}</span>
          </v-layout>
        </v-layout>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" flat @click="CancelClick">Cancel</v-btn>
      <v-btn color="blue darken-1" :loading="loading" flat @click="saveToServer">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapMutations, mapState } from "vuex";

export default {
  data: () => ({
    //--start config
    service: "user",
   
    defaultValue: {},
    query: { $sort: { Id: -1 } },
    //--end config

    items: [],
    loading: false,
    dialog: false,
    formModel: {},
    inDTO: {}, // data ที่มาจากการ get ของ server
    outDTO: {} // data ที่เป็น Object ที่จะส่งไป create หรือ update ที่ server
  }),
  props: ["Id"],
  computed: {},
  async mounted() { },
  methods: {
    CancelClick() {
      this.$emit("Cancel", {});
      this.$emit("Done", {});
    },
    async saveToServer() {
      const valid = await this.$validator.validateAll();
      if (!valid) {
        this.$toast.error("กรุณากรอกข้อมูลให้สมบรูณ์");
        return;
      }
      this.loading = true;
 
      try {

         
        let outDTO = Object.assign({}, this.formModel);

        outDTO.Password1 = this.formModel.Password1;
        outDTO.Password = outDTO.Password1;
        delete outDTO.Password1;
        delete outDTO.Password2;
        await this.$store.dispatch(this.service + "/patch", [this.Id, outDTO]);

        this.$emit("Success", outDTO.Id);
        this.$emit("Done", {});
        this.$toast.success("แก้ไขข้อมูลสำเร็จ");
      } catch (err) {
        console.log(err);
        this.$toast.error("ไม่สามารถแก้ไขข้อมูลได้" + err);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script> 

<!-- Component Docs
props 2 ตัว
- mode(create,edit) เป็นตัวแปรที่กำหมดการทำงานสร้างและแก้ไข ต้องเป็นตัวพิมพ์เล็กเท่านั้น
- Id ใช้ตอนแก้ไขเ


event 3 ตัว
- Success โยนตัวแปร Id เพื่อไปยังหน้า JobDetail
- Cancel ยกเลิก Dialog
- Done คือ event เพื่อจบการทำงาน

- error(err)
-->