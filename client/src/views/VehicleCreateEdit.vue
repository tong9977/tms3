<template>
  <v-container fill-height fluid grid-list-xl>
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
                    label="ทะเบียนรถ"
                    class="purple-input"
                    v-model="formModel.LicensePlate"
                    data-vv-name="ทะเบียนรถ"
                    v-validate="'required'"
                    :error-messages="errors.collect('ทะเบียนรถ')"
                  />
                  <!-- -->
                </v-flex>
                <v-flex xs12 md6>
                  <v-select
                    :items="VehicleStatus"
                    v-model="formModel.VehicleTypesObj"
                    item-text="TypeName"
                    item-value="Id"
                    label="ประเภท"
                    return-object
                  ></v-select>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    label="๊น้ำหนักที่รับได้ (kg)"
                    class="purple-input"
                    v-model="formModel.Limit"
                    data-vv-name="น้ำหนักที่รับได้"
                    v-validate="'required|numeric'"
                    :error-messages="errors.collect('น้ำหนักที่รับได้')"
                  />
                  <!--  -->
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    label="๊ปริมาตรที่ขนได้ (CC)"
                    class="purple-input"
                    v-model="formModel.LimitCC"
                    data-vv-name="ปริมาตรที่ขนได้"
                    v-validate="'required'"
                    :error-messages="errors.collect('ปริมาตรที่ขนได้')"
                  />

                  <!---->
                </v-flex>
                <v-flex xs12 md6>
                  <v-checkbox v-model="formModel.Active" label="ใช้งาน"></v-checkbox>
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    class="purple-input"
                    label="รายละเอียดอื่นๆ"
                    v-model="formModel.Desciption"
                    data-vv-name="รายละเอียด"
                    v-validate="'required'"
                    :error-messages="errors.collect('รายละเอียด')"
                  />

                  <!---->
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
          <v-card-text class="text-xs-right">
            <v-btn color="primary" to="/vehicle">Cancel</v-btn>
            <v-btn color="secondary" @click.stop="saveToServer()" :loading="loading">Save</v-btn>
          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    service: "vehicle",
    objectName: "รถ",
    query: { $sort: { Id: -1 } },
    defaultValue: {
    Active: true,
    LicensePlate: "",
    Limit: "",
    LimitCC: "",
    Desciption: "",
      VehicleTypesObj: { Id: 1 },
    },
    //--end config
    
    formModel: {},
    VehicleStatus: [], // data ที่มาจากการ find ของ server   
    loading: false
  }),
  props: ["mode","Id"],
  computed: {},
  async mounted() {
    this.renderUI();
  },
  methods: {
    async renderUI() {
      
    try{
        var res = await this.$store.dispatch("vehicletype/find", {}) 
        this.VehicleStatus = res.data;
    }catch (error) {
        console.log(error);
        alert("ไม่สามารถติดต่อ server ได้");
    } 
 
      if (this.mode == "edit") {
        //edit
        try {
            let inDTO = await this.$store.dispatch(
                this.service + "/get",
                this.Id
            );
            this.formModel = Object.assign({},  inDTO);
            this.formModel.VehicleTypesObj = Object.assign({},{ Id: inDTO.vehicletype.Id }
            );
        } catch (err) {
            console.log(err);
            alert("ไม่สามารถต่อ server ได้");
        }
      } 
      if(this.mode == "create") {
        //create
        this.formModel = Object.assign({}, this.defaultValue);
      }
    },
    async saveToServer() {
      const valid = await this.$validator.validateAll();
      if (!valid) {
        alert("กรุณากรอกข้อมูลให้สมบรูณ์");
        return;
      }
      this.loading = true;
      if (this.mode == "edit") {
        try {
          //Edit Data
            this.formModel.VehicleTypeId = this.formModel.VehicleTypesObj.Id;
            let outDTO = Object.assign({}, this.formModel);
            delete outDTO.VehicleTypesObj;
            delete outDTO.vehicletype;
            delete outDTO.createdAt;
            delete outDTO.updatedAt;

            alert(JSON.stringify(outDTO));
            await this.$store.dispatch(this.service + "/patch", [
                this.Id,
                outDTO
            ]);

          this.$router.push({
            name: "Vehicle"
          });
        } catch (err) {
          console.log(err);
          alert("ไม่สามารถแก้ไขข้อมูลได้");
        } finally {
          this.loading = false;
        }
      }

      if(this.mode == "create") {
        try {
          //Add Data
          alert(JSON.stringify(this.formModel));
          let outDTO = Object.assign({}, this.formModel);
          outDTO.VehicleTypeId = this.formModel.VehicleTypesObj.Id;
          delete outDTO.VehicleTypesObj;

          alert(JSON.stringify(outDTO));

          this.$store.dispatch(this.service + "/create", outDTO);
          this.$router.push({
            name: "Vehicle"
          });
        } catch (err) {
          console.error(err);
          alert("ไม่สามารถเพิ่มข้อมูลได้");
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