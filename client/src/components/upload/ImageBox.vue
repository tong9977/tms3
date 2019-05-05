<template>
  <div>
    <picture-input
      ref="pictureInput"
      @change="onChange"
      @remove="onRemoved"
      :removable="true"
      width="600"
      height="600"
      margin="16"
      accept="image/jpeg, image/png"
      size="10"
      buttonClass="caption px-2 grey--text"
      removeButtonClass="caption px-2 grey--text"
      :custom-strings="{upload: '<h1>Bummer!</h1>',drag: 'Drag a photo here'}"
    ></picture-input>
    <div class="text-xs-center">
      <v-btn color="primary" v-if="!!image" :loading="uploading" @click="attemptUpload">
        Upload
        <v-icon right dark>mdi-upload</v-icon>
      </v-btn>
    </div>
  </div>
</template>
<script>
import PictureInput from "vue-picture-input";
import upload from "../../utils/upload";

export default {
  data: () => ({
    image: "",
    uploading: false
  }),
  components: {
    PictureInput
  },
  computed: {},
  methods: {
    onChange() {
      console.log("New picture loaded");
      if (this.$refs.pictureInput.file) {
        this.image = this.$refs.pictureInput.file;
      } else {
        console.log("Old browser. No support for Filereader API");
      }
    },
    onRemoved() {
      this.image = "";
    },
    async attemptUpload() {
      if (this.image) {
        this.uploading = true;
        try {
          let res = await upload(this.image);
          let uploadInfo = res.data[0];
          uploadInfo.url = 'http://localhost:3030/uploads/' + res.data[0].filename;
          this.$emit('success',uploadInfo);
        } catch (error) {
          console.log(error);
          this.$emit('error',error);
          alert("ไม่สามารถ upload ได้");
        } finally {
          this.uploading = false;
        }
      }
    }
  }
};
</script>

<!-- Component Docs
props 0 ตัว


event 2 ตัว
- success(uploadInfo) //เกิดเมื่ออัพโหลดไปยัง server เสร็จ แล้วข้อมูลจาก server ส่งกลับมาจะอยู่ใน uploadInfo
 uploadInfo:{
        "fieldname": "files",
        "originalname": "Screen Shot 2562-05-01 at 23.28.15.png",
        "encoding": "7bit",
        "mimetype": "image/png",
        "destination": "public/uploads",
        "filename": "1557043375043-6505.png",
        "path": "public\\uploads\\1557043375043-6505.png",
        "size": 2096883,
        "url":"http://localhost:3030/uploads/1557043375043-6505.png"
    }

- error(err)
-->