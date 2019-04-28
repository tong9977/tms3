<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card color="blue" title="เพิ่มรถ" text="กรอกรายละเอียดรถ">
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md6>
                  <v-text-field
                    label="ทะเบียนรถ"
                    class="purple-input"
                    v-model="LicensePlate"
                    data-vv-name="ทะเบียนรถ"
                    v-validate="'required'"
                    :error-messages="errors.collect('ทะเบียนรถ')"
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
                    v-model="LimitCC"
                    data-vv-name="ปริมาตรที่ขนได้"
                    v-validate="'required'"
                    :error-messages="errors.collect('ปริมาตรที่ขนได้')"
                  />

                  <!---->
                </v-flex>
                <v-flex xs12 md6>
                  <v-checkbox v-model="enable" label="ใช้งาน"></v-checkbox>
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    class="purple-input"
                    label="รายละเอียดอื่นๆ"
                    v-model="Desciption"
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
            <v-btn color="primary" to="/vehicle">ยกเลิก</v-btn>
            <v-btn color="blue" :loading="loading" @click.stop="save()">เพิ่ม</v-btn>
          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapMutations, mapState } from "vuex";

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

 async mounted() {

   try{
   var res = await this.$store.dispatch("vehicletype/find", {}) 
      this.VehicleStatus = res.data;
  
   }catch (error) {
        console.log(error);
        alert("ไม่สามารถติดต่อ server ได้");
      } 
  
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
        var data = {
          LicensePlate: this.LicensePlate,
          VehicleTypeId: this.VehicleTypesSelete.Id,
          Limit: this.Limit,
          LimitCC: this.LimitCC,
          Desciption: this.Desciption,
          Active: this.enable
        
        };
       
        this.loading = true;
        await this.$store.dispatch("vehicle/create", data);
        this.$router.push("/vehicle");
        this.loading = false;
      } catch (error) {
        console.log(error);
        alert("ไม่สามารถติดต่อ server ได้" + error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>