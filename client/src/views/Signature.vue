<template>
  <v-flex ma-3>
    <v-flex xs12>
      <v-btn @click="goBack" class="blue white--text">ย้อนกลับ</v-btn>
      <v-btn @click="save" class="right green white--text">Save</v-btn>
    </v-flex>
    <v-flex xs12>
      <v-card>
        <VueSignaturePad id="signature" width="800px" height="300px" ref="signaturePad"/>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card>
        <RateComp :JobId="Id" mode="rate" ref="RateComp"/>
      </v-card>
    </v-flex>
  </v-flex>
</template>

<script>
import uploadBlob from "../utils/uploadBlob";
import RateComp from "@/viewComponents/RateComp.vue";

export default {
  components: {
    RateComp,
  },
  props: ["Id"],
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async save() {
      if (this.$refs.signaturePad.isEmpty()) {
        alert("Please provide a signature first.");
      } else {
        const dataURL = this.$refs.signaturePad.saveSignature();
        console.log(dataURL.data);
        try {

          let res =  await uploadBlob(dataURL.data);
          console.log(res);
          await this.$store.dispatch("job/patch", [
            this.Id,
            {SignatureUrl: res.data.Url}
          ]);

          this.goBack();
        } catch (error) {
          console.log(error);
          alert("ไม่สามารถบันทึกได้");
        }
      }
    },
    savetoimage() {
      if (this.$refs.signaturePad.isEmpty()) {
        alert("Please provide a signature first.");
      } else {
        const dataURL = this.$refs.signaturePad.saveSignature();
        const blob = this.dataURLToBlob(dataURL.data);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style = "display: none";
        a.href = url;
        a.download = "filename.jpg";
        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(url);
      }
    },
    dataURLToBlob(dataURL) {
      const parts = dataURL.split("base64,");
      const contentType = parts[0].split(":")[1];
      const raw = window.atob(parts[1]);
      const rawLength = raw.length;
      const uInt8Array = new Uint8Array(rawLength);
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], { type: contentType });
    }
  },
  computed: {}
};
</script>
<style>
body {
  background: url() repeat scroll center center #b3b3b3;
}
</style>





