<template>
  <div class="full-height">
    <v-layout row warp>
      <v-flex v-for="u in Trip.users" :key="u.Id">
        <v-flex xs6 text-xs-left>
          <v-avatar size="40" color="grey lighten-4">
            <img src="https://cdn.vuetifyjs.com/images/lists/2.jpg" alt="avatar">
          </v-avatar>
        </v-flex>
        <v-flex xs6 text-xs-right>
          <v-btn color="success" round class="font-weight-light">คนขับรถ</v-btn>
        </v-flex>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import collect from "collect.js";

export default {
  components: {},
  data: () => ({
    service: ""
  }),
  props: ["Users"],
  mounted: function() {
    alert(JSON.stringify(this.Users));
  },
  methods: {}
};
</script>
<style>
.full-height {
  height: 100%;
  background-color: #ffffff;
}
</style>