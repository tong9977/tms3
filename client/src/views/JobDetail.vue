<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <template>
        <v-flex xs12>
          <div style="font-size: 24pt" >ลูกค้า : {{formModel.Customer}}</div>

          <div>
            <v-btn color="blue" href="javascript:history.go(-1)">ย้อนกลับ</v-btn>

            <v-btn color="blue" class="right mr-2" @click="editItem(item)">
              <v-icon>mdi-pencil</v-icon>แก้ไข
            </v-btn>
          </div>
        </v-flex>
        <!-- mat 1 -->
        <v-flex xs12>
          <v-layout wrap row>
            {{jobtype}}
            <v-flex md6>
              <material-card color="green" title="รายละเอียดลูกค้า">
                <!--  <v-text class="font-weight-regular" style="font-size: 14pt ">รายละเอียดลูกค้า</v-text> -->

                <v-flex>
                  <v-icon>mdi-home-map-marker</v-icon>
                  ที่อยู่ : {{formModel.Address}}
                  <br>
                </v-flex>
                <v-flex>
                  <v-icon>mdi-account</v-icon>
                  ผู้ติดต่อ : {{formModel.ContactPerson}}
                  <br>
                </v-flex>
                <v-flex>
                  <v-icon>mdi-phone</v-icon>
                  โทรศัพท์ : {{formModel.Telephone}}
                  <br>
                </v-flex>
                <v-flex>
                  <v-icon>mdi-email</v-icon>
                  อีเมล์ : {{formModel.Email}}
                  <br>
                </v-flex>
                <v-flex>
                  <v-icon>mdi-wechat</v-icon>
                  LineId : {{formModel.LineId}}
                  <br>
                </v-flex>
              </material-card>

              <material-card color="green" title="รายละเอียดงาน">
                <!--  <v-text class="font-weight-regular" style="font-size: 14pt ">รายละเอียดลูกค้า</v-text> -->

                <v-flex>
                  <v-icon>mdi-file</v-icon>
                  ประเภทงาน : {{JobsObj[0].jobtype.Name}}
                </v-flex>
                <v-flex>
                  <v-icon>mdi-briefcase-check</v-icon>
                  สถานะงาน : {{JobsObj[0].jobstatus.Name}}
                </v-flex>
              </material-card>
            </v-flex>

            <v-flex md6>
              <material-card color="green" title="ข้อมูลรายละเอียด">
                <!-- <v-flex>
                    <v-text class="font-weight-regular" style="font-size: 14pt ">ข้อมูลรายละเอียด</v-text>
                </v-flex>-->
                <v-flex>
                  <v-icon>mdi-weight-kilogram</v-icon>
                  น้ำหนักที่ขนได้ : {{formModel.Weight}} Kg.
                </v-flex>
                <v-flex>
                  <v-icon>mdi-weight</v-icon>
                  ปริมาตรที่ขนได้ : {{formModel.CC}} CC.
                </v-flex>
                <v-flex>
                  <v-icon>mdi-map-marker-distance</v-icon>
                  ระยะทาง : {{formModel.Distance}} Km.
                </v-flex>
                <v-flex>
                  <v-icon>mdi-routes</v-icon>
                  หมายเลขเส้นทาง : {{formModel.RouteNo}}
                </v-flex>
                <v-flex>
                  <v-icon>mdi-rename-box</v-icon>
                  ชื่อเส้นทาง : {{formModel.RouteName}}
                </v-flex>
                <v-flex>
                  <v-icon>mdi-calendar-clock</v-icon>
                  วันส่งของ : {{formModel.RequestedDate | date}}
                </v-flex>
                <v-flex>
                  <v-icon>mdi-calendar-plus</v-icon>
                  สร้างวันที่ : {{formModel.CreatedDate | date}}
                </v-flex>
                <v-flex>
                  <v-icon>mdi-account-alert</v-icon>
                  สร้างโดย : {{formModel.CreatedBy}}
                </v-flex>
                <v-flex>
                  <v-icon>mdi-truck</v-icon>
                  จำนวนในการส่ง : {{formModel.TripCredit}} รอบ
                </v-flex>
                <v-flex>
                  <v-icon>mdi-marker</v-icon>
                  หมายเหตุ : {{formModel.Remark}}
                </v-flex>
              </material-card>
            </v-flex>
          </v-layout>

          <div class="text-xs-right">
            <v-btn
              color="primary"
              flat
              :href="'https://maps.google.com/maps?q=' + formModel.Lat +','+formModel.Long +'&hl=es;z=14&amp;output=embed'"
              target="_blank"
            >
              <v-icon>mdi-map-marker</v-icon>google map
            </v-btn>
          </div>
        </v-flex>

        <JobItemComp :JobId="Id"/>

          <v-flex xs12>
          <div class="text-xs-left" style="font-size: 24pt " >รูปการส่งงาน</div>
          </v-flex>
       
        
        <v-container fluid grid-list-sm>
          <v-layout row wrap>
            <v-flex v-for="i in ImgModel" :key="i" md3 xs6>
              <!-- :src="`https://randomuser.me/api/portraits/men/${i + 20}.jpg`" -->
              <div @click="ImgDialog(i)">
                <img :src="i.Url" class="image" alt="lorem" width="100%" height="auto">
              </div>
            </v-flex>

            <v-flex md3 xs6>
              <upload-image-box @success="uploadDone"></upload-image-box>
            </v-flex>
          </v-layout>



           
        </v-container>
        <v-flex xs12>
          <div class="text-xs-left" style="font-size: 24pt " >Signature</div>
          </v-flex>
          <v-btn class="blue white--text" to="Signature" >
              Signature
          </v-btn>
      </template>
    </v-layout>

    <!-- dialog สำหรับ เพิ่ม แก้ไข -->
      
    <v-dialog v-model="dialogimg" max-width="100%" max-height="100%" >
      <div style="text-align: center;" class="black white--text">
       <img :src="photo" class="image" width="auto" height="auto"><br>
       <v-text > <v-icon>mdi-clock</v-icon> {{dateCreate | dateC}}</v-text>
      </div>
    </v-dialog>

    <v-dialog v-model="dialog" max-width="1200px">
      <JobCreateEditDialog @Done="dialog = false" @Success="UpdateFinish" mode="edit" :Id="Id"/>
    </v-dialog>
  </v-container>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import JobItemComp from "@/viewComponents/JobItemComp.vue";
import DriverCreateEdit from "@/views/DriverCreateEdit.vue";
import JobCreateEditDialog from "@/viewComponents/JobCreateEditDialog.vue";
import { createDateFilter } from "vue-date-fns";
import locale from "date-fns/locale/th";
import PictureInput from "vue-picture-input";
import upload from "../utils/upload";
import Lightbox from "vue-my-photos";

export default {
  components: {
    JobItemComp,
    JobCreateEditDialog
  },
  data: () => ({
    service: "job",
    loading: false,
    dialog: false,
    dialogimg:false,
    formModel: {},
    ImgModel: {},
    JobsObj: []
  }),
  filters: {
    date: createDateFilter("DD/MM/YYYY", { locale }),
    dateC: createDateFilter("DD/MM/YYYY HH:MM", { locale })
  },
  props: ["Id"],
  computed: {},
  async mounted() {
    //init here
    this.renderUI();
  },
  methods: {
    async renderUI() {
      try {
        var res = await this.$store.dispatch(this.service + "/get", this.Id);
        this.formModel = res;
      } catch (error) {
        console.log(error);
        this.$toast.error("ไม่สามารถขอข้อมูลจาก server ได้");
      }

      try {
        const { Job } = this.$FeathersVuex;

        Job.find({
          query: { Id: this.Id, $eager: "[jobstatus,jobtype]" }
        }).then(res => {
          this.JobsObj = res.data;
        });
      } catch (err) {
        this.$toast.error('"ไม่สามารถต่อ server ได้');
      }

      try {
        this.query = {
          query: {
            JobId: this.Id
          }
        };
        var res = await this.$store.dispatch("upload/find", this.query);
        this.ImgModel = res.data;
      } catch (error) {
        console.log(error);
        this.$toast.error("ไม่สามารถขอข้อมูลจาก server ได้");
      }
    },
    uploadDone(uploadInfo) {
      console.log(uploadInfo);

      try {
        let temp = Object.assign({}, uploadInfo);

        temp.JobId = this.formModel.Id;

        // alert(JSON.stringify(temp.JobId))

        this.$store.dispatch("upload/create", temp);
        this.$toast.success("อัพโหลดรูปภาพสำเร็จ");
        this.renderUI();
      } catch (err) {
        console.log(err);
        this.$toast.error("ไม่สามารถเพิ่มข้อมูลได้" + err);
      }
    },

    async editItem(item) {
      this.dialog = true;
    },
    async UpdateFinish() {
      this.dialog = false;
      this.renderUI();
    },
    ImgDialog(item) {
      //alert(JSON.stringify(item.Url))
        this.photo = item.Url;
        this.dateCreate = item.CreatedDate;
        this.dialogimg = true;
    }
  }
};
</script> 

