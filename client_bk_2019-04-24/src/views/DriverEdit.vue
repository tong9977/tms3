<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card color="green" title="แก้ไขพนักงานขับรถ" text="แก้ไขรายละเอียดพนักงาน">
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md6>
                  <v-text-field label="ชื่อ" class="purple-input" v-model="firstName"/>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="นามสกุล" class="purple-input" v-model="lastName"/>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="รหัสพนักงาน" class="purple-input" v-model="staffCode"/>
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
                  <v-text-field label="๊Login" class="purple-input" v-model="email"/>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="Password" class="purple-input" type="password" v-model="password"/>
                </v-flex>
                <v-flex xs12>
                  <v-textarea class="purple-input" label="รายละเอียดอื่นๆ" v-model="description"/>
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
            <v-btn color="secondary" @click="onUpdate">ยืนยันการแก้ไข</v-btn>
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
  data() {
    return {
      userStatus:[],
      userStatusSelect:{ Id : 1},

      email: null,
      password: null,
      firstName: null,
      lastName: null,
      staffCode: null,
      imageUrl: "Image Url",
      description: null,
      roleId: null,
      active: true,

      description: null
    };
  },
  computed: {
    ...mapState("tms", ["drivers"])
  },
  methods: {
    async onUpdate() {
      let data = {
        // Id :  this.$route.params.Id,
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
      console.table(data);
      var r = await store.dispatch("user/patch", [this.$route.params.Id, data]);

      store.dispatch("user/find");

       this.$router.push({
        name: "Driver",
      });
    },
  },
    async mounted() {    
      const { Role, User } = this.$FeathersVuex;

      //Role
      let role = await Role.find();
      this.userStatus = role.data;

      //User
        let user  = await User.get(this.$route.params.Id);
        this.email = user.Email;
        this.password = user.Password;
        this.firstName = user.FirstName;
        this.lastName = user.LastName;
        this.staffCode= user.StaffCode;
        this.imageUrl= user.ImageUrl;
        this.description= user.Description;
        this.userStatusSelect ={ Id : user.RoleId };
    }
};
</script>