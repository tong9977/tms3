<template>
    <material-card color="green" :title="title" :text="subTitle" full-width>
      <v-btn flat slot="menu">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-list two-line>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="blue">mdi-map-marker</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>ไอซีอี</v-list-tile-title>
            <v-list-tile-sub-title>งามวงศวาน</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-card-text>
        <v-layout>
          <v-flex xs6 text-xs-left>
            <v-avatar size="40" color="grey lighten-4">
              <img src="https://cdn.vuetifyjs.com/images/lists/2.jpg" alt="avatar">
            </v-avatar>
          </v-flex>
          <v-flex xs6 text-xs-right>
            <v-btn color="success" round class="font-weight-light">คนขับรถ</v-btn>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-text>
        <v-layout>
          <v-flex xs12>
            <v-btn block color="primary">ออกรถ</v-btn>
          </v-flex>
        </v-layout>
      </v-card-text>
    </material-card>
</template>

<script>
export default {
  data: () => ({
    title:"",
    subTitle:"",
  }),
  props: ["LicensePlate", "TripCode", "Limit", "LimitCC"],
  mounted: function() {
    this.title = this.LicensePlate + ' (' + this.TripCode + ')';
    this.subTitle = "ขนได้ " + this.Limit + " กก. " + this.LimitCC + " cc";
  },
  methods: {
    deleteTrip(){
      alert("Delete");
    }
  }
 
};
</script>
