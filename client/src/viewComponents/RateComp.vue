<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout>
      <div full-width v-if="mode == 'rate'">
        <div>ประเมินงาน [{{ JobId }}]</div>
        <v-layout row wrap>
          <v-card-text>
            <v-flex xs12 md12 lg12 v-for="q in rateQuestions" :key="q.Id">
              <p>ข้อที่ {{ q.Id }} {{ q.Question }}</p>
              <v-radio-group v-model="q.Id" row>
                <v-radio label="แย่มาก" value="1"></v-radio>
                <v-radio label="แย่" value="2"></v-radio>
                <v-radio label="ปานกลาง" value="3"></v-radio>
                <v-radio label="ดี" value="4"></v-radio>
                <v-radio label="ดีมาก" value="5"></v-radio>
              </v-radio-group>
            </v-flex>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat :loading="loading" @click="saveRateToServer()">ยืนยัน</v-btn>
          </v-card-actions>
        </v-layout>
      </div>

      <div full-width v-if="mode == 'rateComplete'">
        <div>ประเมินงาน [{{ JobId }}]</div>
        <v-layout row wrap>
          <v-card-text>
            <v-flex xs12 md12 lg12>คุณได้ทำการประเมินเรียบร้อยแล้ว</v-flex>
          </v-card-text>
        </v-layout>
      </div>

      <div full-width v-if="mode == 'view'">
        <p>ประเมินงาน [{{ JobId }}]</p>
        <v-layout row wrap>
          <v-card-text>
            <v-flex xs12 md12 lg12 v-for="q in rateQuestions" :key="q.Id">
              <p>ข้อที่ {{ q.Id }} {{ q.Question }}</p>
              <div>
                <p v-if="rateResult[q.Id -1] == 1">- แย่มาก</p>
                <p v-if="rateResult[q.Id -1] == 2">- แย่</p>
                <p v-if="rateResult[q.Id -1] == 3">- ปานกลาง</p>
                <p v-if="rateResult[q.Id -1] == 4">- ดี</p>
                <p v-if="rateResult[q.Id -1] == 5">- ดีมาก</p>
              </div>
            </v-flex>
          </v-card-text>
        </v-layout>
      </div>

      <div full-width v-if="mode == 'notRate'">
        <div>ประเมินงาน [{{ JobId }}]</div>
        <v-layout row wrap>
          <v-card-text>
            <v-flex xs12 md12 lg12>ยังไม่มีการประเมิน</v-flex>
          </v-card-text>
        </v-layout>
      </div>

      <div full-width v-if="mode == 'errorRate'">
        <div>ประเมินงาน [{{ JobId }}]</div>
        <v-layout row wrap>
          <v-card-text>
            <v-flex xs12 md12 lg12>ผลการประเมินกับคำถามไม่ตรงกัน</v-flex>
          </v-card-text>
        </v-layout>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    service: "ratequestion",
    rateQuestions: [],
    rateResult: [],
    rateTotal: []
  }),
  props: ["JobId", "mode"],
  mounted: function() {
    this.render();
  },
  methods: {
    async render() {
      //find ใหม่ เอาแค่ตัวเดียวที่เพิ่มแล้วสั่ง this.Trip = ที่ get มาใหม่
      let res = await this.$store.dispatch(this.service + "/find", {});
      this.rateQuestions = res.data;

      let job = await this.$store.dispatch("job/find", {
        query: { Id: this.JobId }
      });

      if (job.data[0].Rate != null) {
        this.rateResult = JSON.parse("[" + job.data[0].Rate + "]");
      } else {
        this.rateResult = [];
      }

      if (this.mode == "rate") {
        //ประเมินสำเร็จ
        if (this.rateResult.length > 0) {
          this.mode = "rateComplete";
        } else {
          this.mode == "rate";
        }
      }

      if (this.mode == "view") {
        if (this.rateResult.length > 0) {
          //เช็คว่าผลการโหวดกับจำนวนข้อเท่ากันไหม
          if (this.rateResult.length == this.rateQuestions.length) {
            // this.rateResult = JSON.parse("[" + res2.data[0].Rate + "]");
            //เท่ากัน render
            this.mode = "view";
          } else {
            this.mode = "errorRate";
          }
        } else {
          this.mode = "notRate";
        }
      }
    },

    async saveRateToServer() {
      try {
        this.rateQuestions.forEach(element => {
          this.rateTotal.push(element.Id);
        });

        await this.$store.dispatch("job/patch", [
          this.JobId,
          { Rate: this.rateTotal }
        ]);
        this.render();
      } catch (err) {
        console.log(err);
        alert("ไม่สามารถประเมินได้");
      }
    }
  }
};
</script>
