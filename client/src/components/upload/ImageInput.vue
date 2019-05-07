<template>
  <div>
    <!-- slot for parent component to activate the file changer -->
    <div @click="launchFilePicker()">
      <slot name="activator"></slot>
    </div>
    <!-- image input: style is set to hidden and assigned a ref so that it can be triggered -->
    <input
      type="file"
      ref="file"
      :name="uploadFieldName"
      @change="onFileChange(
          $event.target.name, $event.target.files)"
      style="display:none"
    >
  </div>
</template>

<script>
import upload from "../../utils/upload";
export default {
  name: "image-input",
  data: () => ({
    errorDialog: null,
    errorText: "",
    uploadFieldName: "file",
    maxSize: 1024
  }),
  props: {
    // Use "value" to enable using v-model
    value: Object
  },
  methods: {
    launchFilePicker() {
      this.$refs.file.click();
    },
    async onFileChange(fieldName, file) {
      if (file.length === 0) {
        return;
      }

      let imageFile = file[0];

      this.uploading = true;
      try {
        let res = await upload(imageFile);
        console.log(res);
        let uploadInfo = res.data[0];

        uploadInfo.url =
          "http://localhost:3030/uploads/" + res.data[0].filename;
        this.$emit("success", uploadInfo);
      } catch (error) {
        console.log(error);
        this.$emit("error", error);
        alert("ไม่สามารถ upload ได้");
      } finally {
        this.uploading = false;
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

slot 1 ตัว
- activator // ใส่รูปที่จะให้คลืกเลือกไฟล์ได้เช่น ใส่ avatar
Example

                  <upload-image-input @success="uploadDone">
                    <div slot="activator">
                      <v-avatar size="150px" v-ripple class="mb-3">
                        <img :src="formModel.ImageUrl" alt="avatar">
                      </v-avatar>
                    </div>
                  </upload-image-input>

-->