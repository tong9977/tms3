<template>
  <v-container>
    <v-btn color="blue" @click="$router.go(-1)">ย้อนกลับ</v-btn>
    <v-btn color="blue" class="right mr-2" @click="editItem(item)">
      <v-icon>mdi-pencil</v-icon>แก้ไข
    </v-btn>

    <material-card color="green" :title="formModel.Customer + ' [JobId:' + formModel.Id +']'">
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
      <v-flex>
        <v-icon>mdi-file</v-icon>
        ประเภทงาน : {{JobsObj[0].jobtype.Name}}
      </v-flex>
      <v-flex>
        <v-icon>mdi-briefcase-check</v-icon>
        สถานะงาน : {{JobsObj[0].jobstatus.Name}}
      </v-flex>
    </material-card>

    <material-card color="green" title="ข้อมูลรายละเอียด">
      <v-flex>
        <v-icon>mdi-calendar-plus</v-icon>
        CreateDate : {{formModel.CreatedDate | date}} [{{formModel.CreatedBy}}]
      </v-flex>
      <v-flex>
        <v-icon>mdi-calendar-clock</v-icon>
        JobDate : {{formModel.JobDate | date}}
      </v-flex>
      <v-flex>
        <v-icon>mdi-calendar-clock</v-icon>
        FinishedDate : {{formModel.FinishedDate | date}}
      </v-flex>
      <v-flex>
        <v-icon>mdi-calendar-clock</v-icon>
        CompletedDate : {{formModel.CompletedDate | date}}
      </v-flex>
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
        <v-icon>mdi-truck</v-icon>
        จำนวนในการส่ง : {{formModel.TripCredit}} รอบ
      </v-flex>
      <v-flex>
        <v-icon>mdi-marker</v-icon>
        หมายเหตุ : {{formModel.Remark}}
      </v-flex>
    </material-card>

    <JobItemComp :JobId="Id"/>
    <TripListComp :JobId="Id"/>
    <JobListLogComp :JobId="Id"/>

    <material-card color="green" title="รูปการส่งงาน">
      <v-container fluid grid-list-sm>
        <v-layout row wrap>
          <v-flex v-for="i in ImgModel" :key="i" md3 xs6>
            <div @click="ImgDialog(i)">
              <img :src="i.Url" class="image" width="100%" height="auto">
            </div>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 text-xs-center>
            <upload-image-input @success="uploadDone">
              <div slot="activator">
                <v-btn block class="blue white--text">
                  <v-icon>mdi-upload</v-icon>เลือกรูป
                </v-btn>
              </div>
            </upload-image-input>
          </v-flex>
        </v-layout>
      </v-container>
    </material-card>

    <material-card color="green" title="ลายเซ็นลูกค้า">
      
      <v-img  :src="formModel.SignatureUrl"></v-img>

      
    </material-card>

    <material-card color="green" title="ปิดงาน">
      <div>
        <v-btn
          @click="SuccessDialogJob()"
          v-if="formModel.JobStatusId<=3"
          block
          class="blue white--text"
        >กดปิดงาน</v-btn>
        <p v-else class="text-xs-center">ปิดงานแล้ว {{formModel.CompletedDate| dateC}}</p>
      </div>
    </material-card>

    <v-dialog v-model="dialogJob" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">งานนี้เสร็จแล้วใช่หรือไม่</span>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex>ต้องการปิดงานใช่หรือไม่ ?</v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialogJob=false">Cancel</v-btn>
          <v-btn color="blue darken-1" flat :loading="loading" @click="saveToServer">ใช่</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogimg" max-width="100%" max-height="100%">
      <div style="text-align: center;" class="black white--text">
        <img :src="photo" class="image" width="auto" height="auto">
        <br>
        <v-text>
          <v-icon>mdi-clock</v-icon>
          {{dateCreate | dateC}}
        </v-text>
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
import JobItemMobileComp from "@/viewComponents/JobItemMobileComp.vue";
import DriverCreateEdit from "@/views/DriverCreateEdit.vue";
import JobCreateEditDialog from "@/viewComponents/JobCreateEditDialog.vue";
import { createDateFilter } from "vue-date-fns";
import locale from "date-fns/locale/th";
import PictureInput from "vue-picture-input";
import upload from "../utils/upload";
import Lightbox from "vue-my-photos";
import JobListLogComp from "@/viewComponents/JobListLogComp.vue";
import TripListComp from "@/viewComponents/TripListComp.vue";
export default {
  components: {
    JobItemComp,
    JobCreateEditDialog,
    JobItemMobileComp,
    JobListLogComp,
    TripListComp
  },
  data: () => ({
    service: "job",
    loading: false,
    dialog: false,
    dialogimg: false,
    dialogJob: false,
    formModel: {},
    ImgModel: {},
    outDTO: {},
    JobsObj: [],
    signaturePhoto: ""
  }),
  filters: {
    date: createDateFilter("DD/MM/YYYY", { locale }),
    dateC: createDateFilter("DD/MM/YYYY HH:mm", { locale })
  },
  props: ["Id"],
  computed: {
     ...mapState("auth", ["user"])
  },
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
     
      this.photo = item.Url;
      this.dateCreate = item.CreatedDate;
      this.dialogimg = true;
    },
    GotoSignature(Id) {
      this.$router.push({ name: "Signature", params: { Id: Id } });
    },
    SuccessDialogJob() {
      this.dialogJob = true;
    },
    async saveToServer() {
      try {
        let outDTO = Object.assign({}, this.formModel);
        let a = await this.$store.dispatch("jobstatuscommand/patch", [ this.Id, outDTO]);
        this.renderUI();
        this.$toast.success("แก้ไขข้อมูลสำเร็จ");
      } catch (err) {
        console.log(err);
        this.$toast.error("ไม่สามารถแก้ไขข้อมูลได้" + err);
      } finally {
        this.loading = false;
        this.dialogJob = false;
      }
    }
  }
};
</script> 

