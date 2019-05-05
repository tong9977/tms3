<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12>
        <h5 class="headline">{{job.CustomerName}}</h5>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <div>{{job.Address}}</div>
          </v-card-title>
          <v-card-text class="text-xs-right">
            <v-btn color="primary" flat>
              <v-icon>mdi-map-marker</v-icon>google map
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-list subheader two-line>
            <v-subheader>รายการของ</v-subheader>
            <v-list-tile v-for="p in job.Products" :key="p.ProductName">
              <v-list-tile-action>
                <v-list-tile-action>
                  <v-checkbox></v-checkbox>
                </v-list-tile-action>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{p.ProductName}}</v-list-tile-title>
                <v-list-tile-sub-title>จำนวน {{p.Quantity}} {{p.Unit}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-subheader>รูปการส่งงาน</v-subheader>
          <v-container fluid grid-list-sm>
            <v-layout row wrap>
              <v-flex v-for="i in 1" :key="i" xs6>
                <img
                  :src="`https://randomuser.me/api/portraits/men/${i + 20}.jpg`"
                  class="image"
                  alt="lorem"
                  width="100%"
                  height="100%"
                >
              </v-flex>
              <v-flex xs6>
                <upload-image-box @success="uploadDone"></upload-image-box>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card>
          <v-subheader>การดำเนินงาน</v-subheader>
          <v-flex xs12>
            <v-textarea
              name="input-7-1"
              label="หมายเหตุ"
              value
              hint="ใส่ข้อมูลรายละเอียดต่างๆตอนส่งงาน"
            ></v-textarea>
          </v-flex>
          <v-flex xs12>
            <v-btn color="primary" block to="/todaytrip" dark>ปิดงาน</v-btn>
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import PictureInput from "vue-picture-input";
import upload from "../utils/upload";

export default {
  data: () => ({
    image: "",
  
  }),
 
  computed: {
    ...mapState("tms", ["vehicles", "jobnews", "drivers"]),
    job() {
      return this.jobnews[0];
    }
  },
  methods: {
   uploadDone(uploadInfo){
     console.log(uploadInfo);
   }
  }
};
</script>
