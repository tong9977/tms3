<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card color="green" title="เพิ่มพนักงานขับรถ" text="กรอกรายละเอียดพนักงาน">
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md6>
                  <v-text-field label="ชื่อ" class="purple-input"/>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="นามสกุล" class="purple-input"/>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="รหัสพนักงาน" class="purple-input"/>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="๊Login" class="purple-input"/>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="Password" class="purple-input"/>
                </v-flex>
                <v-flex xs12>
                  <v-textarea class="purple-input" label="รายละเอียดอื่นๆ"/>
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
            <v-btn color="secondary" @click="createDriver">เพิ่ม</v-btn>
          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapMutations, mapState } from "vuex";

export default {
  computed: {
    ...mapState("tms", ["drivers"])
  },
  methods: {
    createDriver() {
      
      const { User } = this.$FeathersVuex;

      const user = new User({
        email: "doi@gmail.com",
        password: "Sinetong9977"
      });

      user.save().then( user =>{
          alert('สร้างเสร็จแล้ว');
      });
      
      /*
      const { Job } = this.$FeathersVuex;
      const q = {};
      q.name = "tong997733@gmail.com";

      Job.find({ query: q}).then(res =>
        console.log(res)
      );
      */
    }
  }
};
</script>