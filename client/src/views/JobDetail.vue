<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <template>
        <v-flex xs12>
          <h5 class="headline">ลูกค้า : {{formModel.Customer}}</h5>

         
            <div>
           <v-btn color="blue" class="font-weight-light" >
            ย้อนกลับ
          </v-btn>
            
           <v-btn color="blue" class="font-weight-light" @click="editItem(item)">
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
                      วันส่งของ : {{formModel.RequestedDate}}
                    </v-flex>
                    <v-flex>
                      <v-icon>mdi-calendar-plus</v-icon>
                      สร้างวันที่ : {{formModel.CreatedDate}}
                    </v-flex>
                    <v-flex>
                      <v-icon>mdi-account-alert</v-icon>
                      สร้างโดย : {{formModel.CreatedBy}}
                    </v-flex>
                    <v-flex>
                      <v-icon>mdi-truck</v-icon>
                      จำนวนในการส่ง : {{formModel.NumTrip}} รอบ
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
        
      </template>
    </v-layout>

    <!-- dialog สำหรับ เพิ่ม แก้ไข -->
    <v-dialog  v-model="dialog" max-width="1200px">
      <JobCreateEditDialog @Done="dialog = false" @Success="UpdateFinish" mode="edit" :Id="Id"/>
    </v-dialog>
  </v-container>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import JobItemComp from "@/viewComponents/JobItemComp.vue";
import DriverCreateEdit from "@/views/DriverCreateEdit.vue";
import JobCreateEditDialog from "@/viewComponents/JobCreateEditDialog.vue";

export default {
  components: {
    JobItemComp,
    JobCreateEditDialog
  },
  data: () => ({
    service: "job",
    loading: false,
    dialog: false,
    formModel: {},
    JobsObj: [],
    
  }),
  props:['Id'],
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
        alert("ไม่สามารถขอข้อมูลจาก server ได้");
      }



      try {
        const { Job } = this.$FeathersVuex;

        Job.find({ query: {Id : this.Id , $eager: "[jobstatus,jobtype]" } }).then(res => {
          this.JobsObj = res.data;
        });
       
      
      } catch (err) {
        alert("ไม่สามารถต่อ server ได้");
      }
    },

    async editItem(item) {
      this.dialog = true;
    },
    async UpdateFinish(){
      this.dialog = false;  
      this.renderUI();
    }
   
  }
};
</script> 

