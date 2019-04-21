<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <h2>Company</h2>
      <feathers-vuex-find service="company" :query="q" watch="query">
        <div slot-scope="props">
          <ejs-grid ref="grid" :dataSource="props.items" height="280px"></ejs-grid>
        </div>
      </feathers-vuex-find>
      <v-btn color="secondary" @click="onClickCreate">Create</v-btn>
      <v-btn color="secondary" @click="onUpdate">Update</v-btn>
      <v-btn color="danger" @click="onDelete">Delete</v-btn>
    </v-layout>
    <v-layout>
      <feathers-vuex-find service="jobtype" :query="{}" watch="query">
          <div slot-scope="props">{{props}}</div>
      </feathers-vuex-find>

    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { GridPlugin } from "@syncfusion/ej2-vue-grids";
import { tbCompany } from "../models/db";
import store from "@/store";

export default {
  data() {
    return {
      q: { $sort: { CompanyID: -1 } }
    };
  },
  computed: {},
  methods: {
    onClickCreate() {
      var data = {
        CompanyName: "sss",
        ZoneID: 0,
        Active: true
      };
      store.dispatch("company/create", data);
    },

    async onUpdate() {
      let data = { CompanyName: "Aun", ZoneID: 200 };
      var r = await store.dispatch("company/patch", [163, data]);

      store.dispatch("company/find", this.q);
    },

    onDelete() {
      store.dispatch("company/remove", 145);
    }
  }
};
</script>

