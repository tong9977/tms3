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
              v-model="formModel.FirstName"
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
              v-model="formModel.LastName"
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
              v-model="formModel.StaffCode"
              :disabled="true"
            />
          </v-flex>

          <v-flex xs12 md4>
            <v-text-field
              label="๊Email"
              class="purple-input"
              v-model="formModel.Email"
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
                v-model="formModel.UserName"
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
              v-model="formModel.UserName"
              :disabled="true"
            />
          </v-flex>
          <v-flex xs12 md6>
            <v-btn color="secondary" @click="ResetPass(item)">เปลี่ยน Password</v-btn>
          </v-flex>
          <v-flex xs12 text-xs-center>
            <upload-image-input @success="uploadDone">
              <div slot="activator">
                <v-avatar size="150px" v-ripple class="mb-3">
                  <img :src="formModel.ImageUrl" alt="avatar">
                </v-avatar>
              </div>
            </upload-image-input>
          </v-flex>
          <v-card-text class="text-xs-right">
            <v-btn color="primary" to="/home">Cancel</v-btn>
            <v-btn color="secondary" @click.stop="saveToServer()" :loading="loading">Save</v-btn>
          </v-card-text>
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
import { mapMutations, mapState } from "vuex";
export default {
  data: () => ({
    service: "user",
    objectName: "พนักงาน",
    defaultValue: {
      
      ImageUrl: "/img/user.png"
    },
    //--end config
    formModel: {},
    IdDriver:"",
    User: [],
    dialog: false,
    loading: false
  }),
  props: ["Id"],
  components: {
    DriverResetPassword
  },

  computed: {
    ...mapState("auth", ["user"])
  },
  async mounted() {
    this.renderUI();
  },
  methods: {
    async renderUI() {
      
      this.IdDriver= this.user.Id;
      try {
          let inDTO = await this.$store.dispatch(
            this.service + "/get",
            this.user.Id
          );
          this.formModel = Object.assign({}, inDTO);
        } catch (err) {
          console.log(err);
          alert("ไม่สามารถต่อ server ได้");
        }
    },
    async ResetPass(item) {
      this.dialog = true;
    },
    async saveToServer() {
      
      
        try {
          //Edit Data
         
          let outDTO = Object.assign({}, this.formModel);
       
         
          await this.$store.dispatch(this.service + "/patch", [
            this.user.Id,
            outDTO
          ]);

          this.renderUI();
        } catch (err) {
          console.log(err);
          alert("ไม่สามารถแก้ไขข้อมูลได้");
        } finally {
          this.loading = false;
        }
      
    },
    uploadDone(uploadInfo) {
      this.formModel.ImageUrl = uploadInfo.url;
    },
  }
};
</script>