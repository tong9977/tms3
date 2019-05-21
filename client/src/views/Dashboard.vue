<template>
  <v-container grid-list-xl>
    <!-- ############# -->
    <v-subheader>ใบงานทั้งหมด</v-subheader>
    <v-layout wrap row lg12>
      <v-flex sm6 xs12 md6 lg3>
        <material-stats-card
          color="orange"
          icon="mdi-clipboard-outline"
          title="ใบงานใหม่"
          :value="JobAllTotal[0].AllJob[0]"
          small-value="ใบ"
          sub-icon="mdi-update"
          sub-text="Just Updated"
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg3>
        <material-stats-card
          color="blue"
          icon="mdi-map-marker"
          title="ใบงานมอบหมายแล้ว"
          :value="JobAllTotal[0].AllJob[1]"
          small-value="ใบ"
          sub-icon="mdi-update"
          sub-text="Just Updated"
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg3>
        <material-stats-card
          color="green"
          icon="mdi-check"
          title="ใบงานเสร็จสิ้น"
          :value="JobAllTotal[0].AllJob[2]"
          small-value="ใบ"
          sub-icon="mdi-update"
          sub-text="Just Updated"
        />
      </v-flex>

      <v-flex sm6 xs12 md6 lg3>
        <material-stats-card
          color="purple darken-4"
          icon="mdi-check-all"
          title="ใบงานปิดแล้ว"
          :value="JobAllTotal[0].AllJob[3]"
          small-value="ใบ"
          sub-icon="mdi-update"
          sub-text="Just Updated"
        />
      </v-flex>
    </v-layout>
    <!-- ############# -->
    <v-subheader>ใบงานวันนี้</v-subheader>
    <v-layout wrap row lg12>
      <v-flex sm6 xs12 md6 lg3>
        <material-stats-card
          color="orange"
          icon="mdi-clipboard-outline"
          title="ใบงานใหม่"
          :value="JobTodayTotal[0].TodayJob[0]"
          small-value="ใบ"
          sub-icon="mdi-update"
          sub-text="Just Updated"
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg3>
        <material-stats-card
          color="blue"
          icon="mdi-map-marker"
          title="ใบงานมอบหมายแล้ว"
          :value="JobTodayTotal[0].TodayJob[1]"
          small-value="ใบ"
          sub-icon="mdi-update"
          sub-text="Just Updated"
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg3>
        <material-stats-card
          color="green"
          icon="mdi-check"
          title="ใบงานเสร็จสิ้น"
          :value="JobTodayTotal[0].TodayJob[2]"
          small-value="ใบ"
          sub-icon="mdi-update"
          sub-text="Just Updated"
        />
      </v-flex>

      <v-flex sm6 xs12 md6 lg3>
        <material-stats-card
          color="purple darken-4"
          icon="mdi-check-all"
          title="ใบงานปิดแล้ว"
          :value="JobTodayTotal[0].TodayJob[3]"
          small-value="ใบ"
          sub-icon="mdi-update"
          sub-text="Just Updated"
        />
      </v-flex>
    </v-layout>
    <!-- ############# -->
    <v-subheader>ใบงานเดือนนี้</v-subheader>
    <v-layout wrap row lg12>
      <v-flex sm6 xs12 md6 lg3>
        <material-stats-card
          color="orange"
          icon="mdi-clipboard-outline"
          title="ใบงานใหม่"
          :value="JobMonthTotal[0].MonthJob[0]"
          small-value="ใบ"
          sub-icon="mdi-update"
          sub-text="Just Updated"
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg3>
        <material-stats-card
          color="blue"
          icon="mdi-map-marker"
          title="ใบงานมอบหมายแล้ว"
          :value="JobMonthTotal[0].MonthJob[1]"
          small-value="ใบ"
          sub-icon="mdi-update"
          sub-text="Just Updated"
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg3>
        <material-stats-card
          color="green"
          icon="mdi-check"
          title="ใบงานเสร็จสิ้น"
         :value="JobMonthTotal[0].MonthJob[2]"
          small-value="ใบ"
          sub-icon="mdi-update"
          sub-text="Just Updated"
        />
      </v-flex>

      <v-flex sm6 xs12 md6 lg3>
        <material-stats-card
          color="purple darken-4"
          icon="mdi-check-all"
          title="ใบงานปิดแล้ว"
          :value="JobMonthTotal[0].MonthJob[3]"
          small-value="ใบ"
          sub-icon="mdi-update"
          sub-text="Just Updated"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { GridPlugin } from "@syncfusion/ej2-vue-grids";

export default {
  data: () => ({
    JobAllTotal: [],
    JobTodayTotal: [],
    JobMonthTotal: []
    
  }),
  computed: {},
  async mounted() {
    this.render();
  },
  methods: {
    async render() {
      try {
        let res = await this.$store.dispatch("alljobtotalcommand/find", {});

        this.JobAllTotal = res;
      } catch (error) {
        console.log(error);
        alert("ไม่สามารถติดต่อ server ได้");
      }

      try {
        let res = await this.$store.dispatch("todayjobcommand/find", {});

        this.JobTodayTotal = res;
      } catch (error) {
        console.log(error);
        alert("ไม่สามารถติดต่อ server ได้");
      }


      try {
        let res = await this.$store.dispatch("monthjobcommand/find", {});

        this.JobMonthTotal = res;
      } catch (error) {
        console.log(error);
        alert("ไม่สามารถติดต่อ server ได้");
      }
    }
  }
};
</script>
<style>
#app {
  background-image: none;
  background-size: cover;
  overflow: hidden;
}
</style>
