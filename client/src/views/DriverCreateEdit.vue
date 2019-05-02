<template>
  
  <v-container fill-height fluid grid-list-xl>

    <h1>mode : {{mode}}</h1>
    <h1>Id : {{Id}}</h1>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card
          color="green"
          :title="'จัดการ'+ objectName"
          :text="'กรุณากรอกข้อมูลให้ครบถ้วน'"
        >
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
                    required
                  />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    label="รหัสพนักงาน"
                    class="purple-input"
                    v-model="formModel.StaffCode"
                    data-vv-name="กรุณากรอกรหัสพนักงาน"
                    v-validate="'numeric'"
                    :error-messages="errors.collect('กรุณากรอกรหัสพนักงาน')"
                    required
                  />
                </v-flex>
                <v-flex xs12 md6>
                  <v-select
                    v-model="formModel.UserStatusObj"
                    :items="userStatusItems"
                    item-text="RoleName"
                    item-value="Id"
                    label="เลือกประเภทพนักงาน"
                    return-object
                  ></v-select>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    label="๊Login (Email)"
                    class="purple-input"
                    v-model="formModel.Email"
                    data-vv-name="กรุณากรอกอีเมล"
                    v-validate="'email'"
                    :error-messages="errors.collect('กรุณากรอกอีเมล')"
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
                    v-validate="'required|min:8'"
                    :error-messages="errors.collect('กรุณากรอกรหัสผ่าน')"
                    required
                  />
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    class="purple-input"
                    label="รายละเอียดอื่นๆ"
                    v-model="formModel.Description"
                    data-vv-name="กรุณากรอกรายละเอียดอื่นๆ"
                    v-validate="'required|min:2'"
                    :error-messages="errors.collect('กรุณากรอกรายละเอียดอื่นๆ')"
                    required
                  />
                </v-flex>
                <v-flex xs12 text-xs-center>
                  <v-avatar size="120" color="grey lighten-4">
                    <v-icon size="80">mdi-account</v-icon>
                  </v-avatar>
                </v-flex>
                <v-flex xs12 text-xs-center>
                  <v-btn round color="secondary">Upload</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
          <v-card-text class="text-xs-right">
            <v-btn color="primary" to="/driver">Cancel</v-btn>
            <v-btn color="secondary" @click.stop="saveToServer()" :loading="loading">Save</v-btn>
          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
import { mapMutations, mapState, mapGetters } from "vuex";
import store from "@/store";

export default {
  data: () => ({
    service: "user",
    service2: "role",
    objectName: "พนักงาน",
    query: { $sort: { Id: -1 } },
    defaultValue: {
      Email: "",
      Password: "",
      FirstName: "",
      LastName: "",
      StaffCode: "",
      ImageUrl: "",
      Description: "",
      RoleId: "",
      Active: true,
      UserStatusObj: { Id: 1 }
    },
    //--end config
    
    formModel: {},
    userStatusItems: [], // data ที่มาจากการ find ของ server
    inDTO: {}, // data ที่มาจากการ get ของ server
    outDTO: {}, // data ที่เป็น Object ที่จะส่งไป create หรือ update ที่ server
   

   loading: false
  }),
  props: ["mode","Id"],
  computed: {},
  async mounted() {
    this.renderUI();
  },
  methods: {
    async renderUI() {
      
      try {
        var role = await this.$store.dispatch(this.service2 + "/find", {});
        this.userStatusItems = role.data;
      } catch (err) {
        alert("ไม่สามารถต่อ server ได้");
      }

      if (this.mode == "edit") {
        try {
          this.inDTO = await this.$store.dispatch(
            this.service + "/get",
            this.Id
          );
          this.formModel = Object.assign({}, this.inDTO);
          this.formModel.UserStatusObj = Object.assign({},{ Id: this.inDTO.RoleId }
          );
          //หรืออีกวิธี กรณีผูก Relation ไว้แล้ว this.formModel.UserStatusObj = Object.assign({}, this.inDTO.role);
        } catch (err) {
          alert("ไม่สามารถต่อ server ได้");
        }
      } else {
        this.formModel = Object.assign({}, this.defaultValue);
      }
    },
    async saveToServer() {
      const valid = await this.$validator.validateAll();
      if (!valid) {
        alert("กรุณากรอกข้อมูลให้สมบรูณ์");
        return;
      }
      this.loading = true
      if (this.mode == "edit") {
        try {
          //Edit Data
          const valid = await this.$validator.validateAll();
          if (!valid) {
            alert("กรุณากรอกข้อมูลให้สมบรูณ์");
            return;
          }

          this.loading = true;

          let temp = this.formModel.UserStatusObj.Id;
          this.formModel.RoleId = temp;
          delete this.formModel.UserStatusObj;
          delete this.formModel.role;
          this.outDTO = Object.assign({}, this.formModel);

          await store.dispatch(this.service + "/patch", [
            this.Id,
            this.outDTO
          ]);

          store.dispatch(this.service + "/find");

          this.$router.push({
            name: "Driver"
          });
        } catch (err) {
          alert("ไม่สามารถต่อ server ได้");
        } finally {
          this.loading = false;
        }
      } else {
        try {
          //Add Data
          const valid = await this.$validator.validateAll();
          if (!valid) {
            alert("กรุณากรอกข้อมูลให้สมบรูณ์");
            return;
          }
          this.loading = true;

          let temp = this.formModel.UserStatusObj.Id;
          this.formModel.RoleId = temp;
          delete this.formModel.UserStatusObj;
          this.outDTO = Object.assign({}, this.formModel);

          store.dispatch(this.service + "/create", this.outDTO);
          this.$router.push({
            name: "Driver"
          });
        } catch (err) {
          console.error(err);
          alert("ไม่สามารถต่อ server ได้");
        } finally {
          this.loading = false;
        }
      }
    },
    async createDriverNew() {},

    async onUpdate() {}
  }
};
</script>