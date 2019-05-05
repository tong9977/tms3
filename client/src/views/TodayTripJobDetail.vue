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
                <picture-input
                  ref="pictureInput"
                  @change="onChange"
                  @remove="onRemoved"
                  :removable="true"
                  width="600"
                  height="600"
                  margin="16"
                  accept="image/jpeg, image/png"
                  size="10"
                  buttonClass="caption px-2 grey--text"
                  removeButtonClass="caption px-2 grey--text"
                  :custom-strings="{upload: '<h1>Bummer!</h1>',drag: 'Drag a photo here'}"
                ></picture-input>
                <div class="text-xs-center">
                  <v-btn color="primary" v-if="!!image" :loading="uploading" @click="attemptUpload">
                    Upload
                    <v-icon right dark>mdi-upload</v-icon>
                  </v-btn>
                </div>
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
    uploading: false,
    jobNewDialog: false,
    driverDialog: false
  }),
  components: {
    PictureInput
  },
  computed: {
    ...mapState("tms", ["vehicles", "jobnews", "drivers"]),
    job() {
      return this.jobnews[0];
    }
  },
  methods: {
    onChange() {
      console.log("New picture loaded");
      if (this.$refs.pictureInput.file) {
        this.image = this.$refs.pictureInput.file;
      } else {
        console.log("Old browser. No support for Filereader API");
      }
    },
    onRemoved() {
      this.image = "";
    },
    async attemptUpload() {
      if (this.image) {
        this.uploading = true;
        try {
          let res = await upload(this.image);
          console.log(res);
        } catch (error) {
          console.log(error);
          alert("ไม่สามารถ upload ได้");
        } finally {
          this.uploading = false;
        }
      }
    }
  }
};
</script>
