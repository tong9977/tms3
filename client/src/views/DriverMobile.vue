<template>
  <material-card color="green" :title="'จัดการข้อมูลของฉัน'">
    <v-form>
      <v-container py-0>
        <v-layout wrap>
          <!-- set form กรอกข้อมูลที่นี้ -->

          <v-flex xs12 md6>
            <v-text-field
              label="ชื่อ"
              class="purple-input"
              v-model="User.FirstName"
              data-vv-name="กรุณากรอกชื่อ"
              v-validate="'required|min:2'"
              :error-messages="errors.collect('กรุณากรอกชื่อ')"
              :disabled="true"
              required
            />
          </v-flex>
          <v-flex xs12 md6>
            <v-text-field
              label="นามสกุล"
              class="purple-input"
              v-model="User.LastName"
              data-vv-name="กรุณากรอกนามสกุล"
              v-validate="'required|min:2'"
              :error-messages="errors.collect('กรุณากรอกนามสกุล')"
              :disabled="true"
              required
            />
          </v-flex>
          <v-flex xs12 md4>
            <v-text-field
              label="รหัสพนักงาน"
              class="purple-input"
              v-model="User.StaffCode"
              :disabled="true"
            />
          </v-flex>

          <v-flex xs12 md4>
            <v-text-field
              label="๊Email"
              class="purple-input"
              v-model="User.Email"
              data-vv-name="กรุณากรอกอีเมล"
              v-validate="'email'"
              :error-messages="errors.collect('กรุณากรอกอีเมล')"
              :disabled="true"
              required
            />
          </v-flex>
          <template v-if="mode=='create'">
            <v-flex xs12 md6>
              <v-text-field
                label="UserName (Login)"
                class="purple-input"
                v-model="User.UserName"
                data-vv-name="กรุณากรอกUserName"
                v-validate="'required|min:4'"
                :error-messages="errors.collect('กรุณากรอกUserName')"
                :disabled="true"
                required
              />
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field
                label="Password"
                class="purple-input"
                type="password"
                v-model="formModel.Password"
                data-vv-name="กรุณากรอกรหัสผ่าน"
                v-validate="'required|min:6'"
                :error-messages="errors.collect('กรุณากรอกรหัสผ่าน')"
              />
            </v-flex>
          </template>

          <v-flex xs12 md6>
            <v-text-field
              label="UserName (Login)"
              class="purple-input"
              v-model="User.UserName"
              :disabled="true"
            />
          </v-flex>
          <v-flex xs12 md6>
            <v-btn color="secondary" @click="ResetPass(item)">เปลี่ยน Password</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>

    <!-- dialog สำหรับ แก้ไข Password -->
    <v-dialog v-model="dialog" max-width="1200px">
      <DriverResetPassword @Done="dialog = false" :Id="IdDriver"/>
    </v-dialog>
  </material-card>
</template>


<script>
import upload from "../utils/upload";
import DriverResetPassword from "@/viewComponents/DriverResetPassword.vue";
import { mapMutations,mapState } from "vuex";
export default {
  data: () => ({
    service: "user",
    objectName: "พนักงาน",

    //--end config

    User: [],
    dialog: false,
    loading: false
  }),
  props: ["Id"],
  components: {
    DriverResetPassword
  },

  computed: {
      ...mapState("auth",["user"])
  },
  async mounted() {
    
    this.renderUI();
  },
  methods: {
    async renderUI() {
      try {
        var res = await this.$store.dispatch(
          this.service + "/get",
          this.user.Id
        );
        this.User = res;
      } catch (error) {
        console.log(error); 
        this.$toast.error("ไม่สามารถขอข้อมูลจาก server ได้");
      }
    },
    async ResetPass(item) {
      this.dialog = true;
    }
  }
};
</script>