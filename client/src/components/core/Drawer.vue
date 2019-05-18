<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    app
    dark
    persistent
    mobile-break-point="991"
    width="260"
  >
    <v-img :src="image" height="100%">
      <v-layout class="fill-height" tag="v-list" column>
        <v-list-tile class="px-2">
          <v-list-tile-title class="title">TMS-Warehouse</v-list-tile-title>
        </v-list-tile>
        <v-divider/>
        <template v-if="user.RoleId===1">
          <v-list-tile
            v-for="(link, i) in links"
            :key="i"
            :to="link.to"
            :active-class="color"
            avatar
            class="v-list-item"
          >
            <v-list-tile-action>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title v-text="link.text"/>
          </v-list-tile>
        </template>

        <template v-if="user.RoleId===2">
          <v-list-tile
            v-for="(link, i) in links2"
            :key="i"
            :to="link.to"
            :active-class="color"
            avatar
            class="v-list-item"
          >
            <v-list-tile-action>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title v-text="link.text"/>
          </v-list-tile>
        </template>
      </v-layout>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapMutations, mapState } from "vuex";

const menuAdmin = [
  {
    to: "/dashboard",
    icon: "mdi-view-dashboard",
    text: "DashBoard"
  },
  {
    to: "/trip",
    icon: "mdi-calendar",
    text: "Schedule"
  },
  {
    to: "/jobnew",
    icon: "mdi-clipboard-outline",
    text: "ใบงานใหม่"
  },
  {
    to: "/jobassigned",
    icon: "mdi-clipboard-account",
    text: "ใบงานมอบหมายแล้ว"
  },
  {
    to: "/jobdone",
    icon: "mdi-clipboard-check-outline",
    text: "ใบงานเสร็จสิ้น"
  },
  {
    to: "/jobclosing",
    icon: "mdi-clipboard-check",
    text: "ใบงานปิดแล้ว"
  },
  {
    to: "/vehicle",
    icon: "mdi-car-estate",
    text: "จัดการรถ"
  },
  {
    to: "/vehicletype",
    icon: "mdi-car-estate",
    text: "จัดการประเภทรถ"
  },
  {
    to: "/role",
    icon: "mdi-account",
    text: "จัดการประเภทพนักงาน"
  },
  {
    to: "/driver",
    icon: "mdi-account",
    text: "พนักงานขับรถ"
  },
  {
    to: "/่jobstatus",
    icon: "mdi-account",
    text: "จัดการประเภทงาน"
  },
  {
    to: "/่product",
    icon: "mdi-cart",
    text: "่สิ้นค้า"
  },
  {
    to: "/่unit",
    icon: "mdi-apps",
    text: "่หน่วย"
  },
  {
    to: "/joblogtype",
    icon: "mdi-apps",
    text: "LogType"
  }
];

const menuDriver = [
  
  {
    to: "/home",
    icon: "mdi-view-dashboard",
    text: "งานของฉัน"
  },
  {
    
    to: "/drivermobile/",
    icon: "mdi-account",
    text: "ข้อมูลของฉัน"
  }
];

export default {
  data: () => ({
    logo: "",
    links: menuAdmin,
    links2: menuDriver,
    responsive: false
  }),
  computed: {
    ...mapState("app", ["image", "color", "drawerVisible"]),
    ...mapState("auth", ["user"]),
    inputValue: {
      get() {
        return this.$store.state.app.drawer;
      },
      set(val) {
        this.setDrawer(val);
      }
    }
  },
  mounted() {
    this.onResponsiveInverted();
    window.addEventListener("resize", this.onResponsiveInverted);
  },
  created() {},
  beforeDestroy() {
    window.removeEventListener("resize", this.onResponsiveInverted);
  },
  methods: {
    ...mapMutations("app", ["setDrawer"]),
    onResponsiveInverted() {
      if (window.innerWidth < 991) {
        this.responsive = true;
      } else {
        this.responsive = false;
      }
    }
  }
};
</script>

<style lang="scss">
#app-drawer {
  .v-list__tile {
    border-radius: 2px;

    &--buy {
      margin-top: auto;
      margin-bottom: 17px;
    }
  }

  .v-image__image--contain {
    top: 9px;
    height: 60%;
  }

  .search-input {
    margin-bottom: 30px !important;
    padding-left: 15px;
    padding-right: 15px;
  }
}
</style>
