<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card color="green" title="เพิ่มพนักงานขับรถ" text="กรอกรายละเอียดพนักงาน">
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md6>
                  <v-text-field label="ชื่อ" class="purple-input" v-model="firstName"     
                    data-vv-name="กรุณากรอกชื่อ" v-validate="'required|min:2'" 
                    :error-messages="errors.collect('กรุณากรอกชื่อ')" required/>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="นามสกุล" class="purple-input" v-model="lastName"
                    data-vv-name="กรุณากรอกนามสกุล" v-validate="'required|min:2'"
                    :error-messages="errors.collect('กรุณากรอกนามสกุล')" required/>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="รหัสพนักงาน" class="purple-input" v-model="staffCode"
                    data-vv-name="กรุณากรอกรหัสพนักงาน" v-validate="'numeric'"
                    :error-messages="errors.collect('กรุณากรอกรหัสพนักงาน')" required/>
                </v-flex>
                <v-flex xs12 md6>
                  <v-select
                    v-model="userStatusSelect"
                    :items="userStatus"
                    item-text="RoleName"
                    item-value="Id"
                    label="เลือกประเภทพนักงาน"
                    return-object
                  ></v-select>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="๊Login (Email)" class="purple-input" v-model="email"
                  data-vv-name="กรุณากรอกอีเมล" v-validate="'email'"
                  :error-messages="errors.collect('กรุณากรอกอีเมล')" required/>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="Password" class="purple-input" type="password" v-model="password"
                    data-vv-name="กรุณากรอกรหัสผ่าน" v-validate="'required|min:8'"
                    :error-messages="errors.collect('กรุณากรอกรหัสผ่าน')" required/>
                </v-flex>
                <v-flex xs12>
                  <v-textarea class="purple-input" label="รายละเอียดอื่นๆ" v-model="description"
                    data-vv-name="กรุณากรอกรายละเอียดอื่นๆ" v-validate="'required|min:2'" 
                    :error-messages="errors.collect('กรุณากรอกรายละเอียดอื่นๆ')" required/>
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
            <v-btn color="primary" to="/driver">ยกเลิก</v-btn>
            <v-btn color="secondary" @click.stop="createDriverNew()" :loading="loading">เพิ่ม</v-btn>
          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import store from "@/store";

export default {
  data() {
    return {
      userStatus:[],
      userStatusSelect:{ Id : 1 },

      email: null,
      password: null,
      firstName: null,
      lastName: null,
      staffCode: null,
      imageUrl: "Image Url",
      description: null,
      roleId: null,
      active: true,

      description: null,

      loading : false,
    };
  },
  computed: {
    
  },
  methods: {
    async createDriverNew() {
      try {
        const valid = await this.$validator.validateAll();
        if (!valid) {
          alert("กรุณากรอกข้อมูลให้สมบรูณ์");
          return;
        }
        this.loading = true;

        var data = {
          Email: this.email,
          Password: this.password,
          FirstName: this.firstName,
          LastName: this.lastName,
          StaffCode: this.staffCode,
          ImageUrl: this.imageUrl,
          Description: this.description,
          RoleId: this.userStatusSelect.Id,
          Active: this.active
        };

        // console.table(data);
        store.dispatch("user/create", data);

        this.$router.push({
          name: "Driver",
        });
      } catch (err) {
        alert("ไม่สามารถต่อ server ได้");
      } finally {
        this.loading = false;
      }
    },
  },
  async mounted() {
    try {
      const { Role } = this.$FeathersVuex;
      //Role
      // let res = await Role.find();
      // this.userStatus = res.data;
      //หรือเขียนแบบ dispatch
      var role = await this.$store.dispatch("role/find", {});
      this.userStatus = role.data;
    } catch (err) {
        alert("ไม่สามารถต่อ server ได้");
    }
  }
};
</script>