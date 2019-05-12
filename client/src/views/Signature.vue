<template>
  <v-flex ma-3>
    <v-btn color="blue" @click="$router.go(-1)">ย้อนกลับ</v-btn>
    <material-card color="green" title="Signature">
      <VueSignaturePad id="signature" width="100%" height="50vh" ref="signaturePad"/>
      <v-flex xs12>
      <v-btn @click="undo" class="black white--text">Undo</v-btn>
      <v-btn @click="savetoimage" class="right red white--text">Save to Image</v-btn>
      <v-btn @click="save" class="right green white--text">Save</v-btn>
      </v-flex>
    </material-card>
  </v-flex>
</template>


<script>
export default {
  methods: {
    undo() {
      this.$refs.signaturePad.undoSignature();
    },
    save() {
      if (this.$refs.signaturePad.isEmpty()) {
        alert("Please provide a signature first.");
      } else {
        const dataURL = this.$refs.signaturePad.saveSignature();
        const blob = this.dataURLToBlob(dataURL.data);
        const url = window.URL.createObjectURL(blob);
        alert(url);
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





