
<template>
   <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
     
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <!-- set form กรอกข้อมูลที่นี้ -->
              <v-layout wrap row>
                <v-flex xs12 md12>
                  <v-text class="font-weight-regular">รายละเอียดลูกค้า</v-text>
                </v-flex>

                <v-flex xs12 md6>
                  <v-text-field
                    v-model="formModel.Customer"
                    data-vv-name="ชื่อลูกค้า"
                    v-validate="'required|min:2'"
                    :error-messages="errors.collect('ชื่อลูกค้า')"
                    label="กรอกลชื่อลูกค้า"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    v-model="formModel.ContactPerson"
                    data-vv-name="คนติดต่อ"
                    v-validate="'required|min:2'"
                    :error-messages="errors.collect('คนติดต่อ')"
                    label="คนติดต่อ"
                  ></v-text-field>
                </v-flex>
                 <v-flex xs12 md4>
                  <v-text-field
                    v-model="formModel.Telephone"
                    data-vv-name="โทรศัพท์"
                    v-validate="'numeric'"
                    :error-messages="errors.collect('โทรศัพท์')"
                    label="โทรศัพท์"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    v-model="formModel.Email"
                   
                    label="อีเมล์"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 md4>
                 <v-text-field
                    v-model="formModel.LineId"
                   
                    label="LineId"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 md8>
                  

                   <v-text-field
                    v-model="formModel.Address"
                    data-vv-name="ที่อยู่ลูกค้า"
                    v-validate="'required|min:2'"
                    :error-messages="errors.collect('ที่อยู่ลูกค้า')"
                    label="ที่อยู่ลูกค้า"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md2>
                  <v-text-field
                    v-model="formModel.Lat"
                   
                    label="Lat"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md2>
                  <v-text-field
                    v-model="formModel.Long"
                    
                    label="Long"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout wrap row>
                <v-flex xs12 md12>
                  <v-text class="font-weight-regular">ข้อมูลรายละเอียด</v-text>
                </v-flex>

                <v-flex xs12 md3>
                  <v-text-field
                    v-model="formModel.RouteNo"
                    
                    label="หมายเลขเส้นทาง"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md7>
                  <v-text-field
                    v-model="formModel.RouteName"
                    
                    label="ชื่อเส้นทาง"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md2>
                  <v-text-field
                    v-model="formModel.Distance"
                    
                    label="ระยะทาง"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md3>
                  <v-text-field
                    v-model="formModel.Weight"
                    data-vv-name="น้ำหนักที่ขนได้"
                    v-validate="'numeric'"
                    :error-messages="errors.collect('น้ำหนักที่ขนได้')"
                    label="น้ำหนักที่ขนได้ Kg"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md3>
                  <v-text-field
                    v-model="formModel.CC"
                    data-vv-name="ปริมาตรที่ขนได้"
                    v-validate="'numeric'"
                    :error-messages="errors.collect('ปริมาตรที่ขนได้')"
                    label="ปริมาตรที่ขนได้ CC"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 md3>
                  <span style="font-size:9pt">วันส่งของ</span>
                  <ejs-datepicker
                    style="padding-bottom:5px;"
                    v-model="formModel.RequestedDate"
                    :format="dateFormat"
                  ></ejs-datepicker>
                </v-flex>

                <v-flex xs12 md3>
                  <v-text-field
                    v-model="formModel.NumTrip"
                    
                    label="จำนวนรอบในการส่ง"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                  <v-select
                    :items="JobType"
                    v-model="formModel.JobTypeObj"
                    item-text="Name"
                    item-value="Id"
                    label="ประเภทงาน"
                    return-object
                  ></v-select>
                </v-flex>
                <v-flex xs12 md6>
                  <v-select
                    :items="JobStatus"
                    v-model="formModel.JobStatusObj"
                    item-text="Name"
                    item-value="Id"
                    label="สถานะงาน"
                    return-object
                  ></v-select>
                </v-flex>

                <v-flex xs12 md12>
                  <v-text-field
                    v-model="formModel.Remark"
                   
                    label="หมายเหตุ"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="CancelClick">Cancel</v-btn>
          <v-btn color="blue darken-1" :loading="loading" flat @click="saveToServer">Save</v-btn>
        </v-card-actions>
      </v-card>
</template>
<script>
import { mapMutations, mapState } from "vuex";


export default {
    
 
  data: () => ({
    //--start config
    service: "job",
    service2: "jobtype",
    service3: "jobstatus",
    objectName: "งาน",
    showDialog : false,
    headers: [
      { value: "JobId", text: "Id", sortable: true },
      { value: "Customer", text: "ลูกค้า", sortable: true },
      // { value: "DeliveryDate", text: "วันส่งของ", sortable: true },
      { value: "ContactPerson", text: "คนติดต่อ", sortable: false },
      // { text: "สินค้า", sortable: false },
      { value: "Remark", text: "หมายเหตุ", sortable: false },
      { value: "Address", text: "ที่อยู่", sortable: false },
      { value: "Weight", text: "น้ำหนัก/ปริมาตร", sortable: false },
      { value: "RouteNo", text: "RouteNo", sortable: false },
      // { value: "Zone", text: "Zone", sortable: false },
      { value: "Distance", text: "ระยะทาง", sortable: false }
    ],
    defaultValue: {
      Customer: "",
      ContactPerson: "",
      Email: "",
      LineId: "",
      Address: "",
      Lat: "",
      Long: "",
      Weight: "",
      CC: "",
      Distance: "",
      RouteNo: "",
      RouteName: "",
      Remark: "",
      RequestedDate: "",
      CreatedBy: "",
      CreatedDate: "",
      CompletedDate: "",
      CompletedBy: "",
      NumTrip: "",
      JobTypeObj: { Id: 1 },
      JobStatusObj: { Id: 1 }
    },
    query: { $sort: { Id: -1 } },
    //--end config

    
    dateFormat: "dd-MM-yyyy",
    JobStatus: [],
    JobType: [],
    JobStatusSelete: { Id: 1 },
    JobTypesSelete: { Id: 1 },
    items: [],
    total: 0,
    loading: false,
    dialog: false,
    dialogDelete: false,
    formModel: {},
    inDTO: {}, // data ที่มาจากการ get ของ server
    outDTO: {}, // data ที่เป็น Object ที่จะส่งไป create หรือ update ที่ server
   
  }),
  props: ["mode","Id"],
  computed: {
    formTitle() {
      return this.mode === "create"
        ? "เพิ่ม" + this.objectName
        : "แก้ไข" + this.objectName;
    }
  },
  async mounted() {

    this.renderUI();

    try {
      var res = await this.$store.dispatch("jobstatus/find", {});
      this.JobStatus = res.data;
    } catch (error) {
      console.log(error);
      alert("ไม่สามารถติดต่อ server ได้");
    }

    try {
      var res2 = await this.$store.dispatch("jobtype/find", {});
      this.JobType = res2.data;
    } catch (error) {
      console.log(error);
      alert("ไม่สามารถติดต่อ server ได้");
    }
  },
  methods: {
    async renderUI() {
    

      if (this.mode === "edit") {
        try {
          this.inDTO = await this.$store.dispatch(
            this.service + "/get",
            this.Id
          );
          this.formModel = Object.assign({}, this.inDTO);
          this.formModel.JobStatusObj = Object.assign({},{ Id: this.inDTO.JobStatusId });
          this.formModel.JobTypeObj = Object.assign({},{ Id: this.inDTO.JobTypeId });
          
        } catch (err) {
          alert("ไม่สามารถต่อ server ได้");
        }
      } else {
        this.formModel = Object.assign({}, this.defaultValue);
      }
      if(this.mode == "create") {
        
        this.formModel = Object.assign({}, this.defaultValue);
      }
    },

    CancelClick() {
    
     this.$emit('Cancel', {});
     this.$emit('Done', {});
    },
    async saveToServer() {
      const valid = await this.$validator.validateAll();
      if (!valid) {
        alert("กรุณากรอกข้อมูลให้สมบรูณ์");
        return;
      }
      this.loading = true;
      if (this.mode === "edit") {
       
        try {
            
          let outDTO = Object.assign({}, this.formModel);
          
          outDTO.JobStatusId = this.formModel.JobStatusObj.Id;
          outDTO.JobTypeId = this.formModel.JobTypeObj.Id;

          delete outDTO.JobStatusObj;
          delete outDTO.JobTypeObj;

          await this.$store.dispatch(this.service + "/patch", [
            this.Id,
            outDTO
          ]);

          this.$emit('Success',outDTO.Id);
          this.$emit('Done', {});
        } catch (err) {
          console.log(err);
          alert("ไม่สามารถแก้ไขข้อมูลได้" + err);
        } finally {
          this.loading = false;
        }
      }  
      if(this.mode == "create") {
        //Add Data
        try {
          //alert(JSON.stringify(this.formModel))
          let temp = Object.assign({}, this.formModel);
          //alert(JSON.stringify(temp))
          temp.JobStatusId = this.formModel.JobStatusObj.Id;
          temp.JobTypeId = this.formModel.JobTypeObj.Id;

          delete temp.JobStatusObj;
          delete temp.JobTypeObj;
          let newjob = await  this.$store.dispatch(this.service + "/create", temp);
          
          this.$emit('Success',newjob.Id);
          this.$emit('Done', {});
          //this.renderUI();
        } catch (err) {
          console.log(err);
          alert("ไม่สามารถเพิ่มข้อมูลได้" + err);
        } finally {
          this.loading = false;
        }
      }
      
    }
   
  }
};
</script> 
