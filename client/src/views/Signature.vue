<template>
<v-flex ma-3>
     <v-btn color="blue" href="javascript:history.go(-1)">ย้อนกลับ</v-btn>
  <material-card color="green" title="Signature">
    <VueSignaturePad id="signature" width="100%" height="500px" ref="signaturePad"/>
    
    <v-btn @click="undo" class="black white--text">Undo</v-btn>

    <v-btn @click="save" class="right green white--text">Save</v-btn>
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
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      alert("กรอกลายเซ็นสำเร็จ");
      console.log(isEmpty);
      console.log(data);
    }
  }
};
</script>

