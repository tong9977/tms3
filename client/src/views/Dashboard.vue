<template>

  <v-container fill-height fluid grid-list-xl>
    
    <v-layout wrap>
     

      <v-flex sm6 xs12 md6 lg3>
        <material-stats-card
          color="orange"
          icon="mdi-clipboard-outline"
          title="ใบงานใหม่"
          :value="jobNewsCount"
          small-value="ใบ"
          sub-icon="mdi-update"
          sub-text="Just Updated"
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg3>
        <material-stats-card
          color="blue"
          icon="mdi-clipboard-account"
          title="ใบงานมอบหมายแล้ว"
          value="0"
          small-value="ใบ"
          sub-icon="mdi-update"
          sub-text="Just Updated"
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg3>
        <material-stats-card
          color="green"
          icon="mdi-clipboard-check-outline"
          title="ใบงานเสร็จสิ้น"
          value="0"
          small-value="ใบ"
          sub-icon="mdi-update"
          sub-text="Just Updated"
        />
      </v-flex>

      <v-flex sm6 xs12 md6 lg3>
        <material-stats-card
          color="purple darken-4"
          icon="mdi-clipboard-check"
          title="ใบงานปิดแล้ว"
          value="0"
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
  data() {
    return {
      data: [
        { OrderID: 10248, CustomerID: "VINET", Freight: 32.38 },
        { OrderID: 10249, CustomerID: "TOMSP", Freight: 11.61 },
        { OrderID: 10250, CustomerID: "HANAR", Freight: 65.83 },
        { OrderID: 10251, CustomerID: "VICTE", Freight: 41.34 },
        { OrderID: 10252, CustomerID: "SUPRD", Freight: 51.3 },
        { OrderID: 10253, CustomerID: "HANAR", Freight: 58.17 },
        { OrderID: 10254, CustomerID: "CHOPS", Freight: 22.98 },
        { OrderID: 10255, CustomerID: "RICSU", Freight: 148.33 },
        { OrderID: 10256, CustomerID: "WELLI", Freight: 13.97 }
      ]
    };
  },
  computed: {
    ...mapGetters("tms", ["jobNewsCount"])
  },
  methods: {
    complete(index) {
      this.list[index] = !this.list[index];
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
