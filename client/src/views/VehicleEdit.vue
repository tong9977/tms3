
<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card color="blue" title="แก้ไขข้อมูลรถ" text="กรอกรายละเอียดรถ">
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md6>
                  <v-text-field
                    label="ทะเบียนรถ"
                    class="purple-input"
                    v-model="LicensePlate"
                    data-vv-name="LicensePlate"
                    v-validate="'required'"
                    :error-messages="errors.collect('LicensePlate')"
                  />

                  <!-- -->
                </v-flex>
                <v-flex xs12 md6>
                  <v-select
                    :items="VehicleStatus"
                    v-model="VehicleTypesSelete"
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
                    v-model="Limit"
                    data-vv-name="Limit"
                    v-validate="'required'"
                    :error-messages="errors.collect('Limit')"
                  />
                  <!--  -->
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    label="๊ปริมาตรที่ขนได้ (CC)"
                    class="purple-input"
                    v-model="LimitCC"
                    data-vv-name="LimitCC"
                    v-validate="'required'"
                    :error-messages="errors.collect('LimitCC')"
                  />

                  <!-- -->
                </v-flex>
                <v-flex xs12 md6>
                  <v-checkbox v-model="enable" label="ใช้งาน"></v-checkbox>
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    class="purple-input"
                    label="รายละเอียดอื่นๆ"
                    v-model="Desciption"
                    data-vv-name="Desciption"
                    v-validate="'required'"
                    :error-messages="errors.collect('Desciption')"
                  />

                  <!-- -->
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
          <v-card-text class="text-xs-right">
            <v-btn color="primary" to="/vehicle">ยกเลิก</v-btn>
            <v-btn color="blue" :loading="loading" @click.stop="save()">แก้ไข</v-btn>
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
  data: () => ({
    enable: true,
   VehicleStatus: [],
    VehicleTypesSelete: { Id: 1 },
    LicensePlate: "",
    Limit: "",
    LimitCC: "",
    Desciption: "",
    loading: false
  }),
  computed: {
   
  },
  async mounted() {

 try{
   let res = await this.$store.dispatch("vehicletype/find", {}) 
      this.VehicleStatus = res.data;
  
   }catch (error) {
        console.log(error);
        alert("ไม่สามารถติดต่อ server ได้");
      } 

    const { Vehicle } = this.$FeathersVuex;
    var q = this.$route.params.id;
    const response = await Vehicle.get(q);

    (this.LicensePlate = response.LicensePlate),
      (this.VehicleTypesSelete = response.VehicleTypeId),
      (this.Limit = response.Limit),
      (this.LimitCC = response.LimitCC),
      (this.Desciption = response.Desciption),
      (this.Active = response.enable);
  },
  methods: {
    async save() {
      const valid = await this.$validator.validateAll();
      if (!valid) {
        alert("กรุณากรอกข้อมูลให้สมบรูณ์");
        return;
      }
      this.loading = true;
      try {
        let data = {
          LicensePlate: this.LicensePlate,
          VehicleTypeId: this.VehicleTypesSelete.Id,
          Limit: this.Limit,
          LimitCC: this.LimitCC,
          Desciption: this.Desciption,
          Active: this.enable
        };
        //alert(JSON.stringify(data))
        let r = await store.dispatch("vehicle/patch", [ this.$route.params.id, data]);
        this.$router.push("/vehicle");
        
      } catch (error) {
        console.log(error);
        alert("ไม่สามารถติดต่อ server ได้");
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>