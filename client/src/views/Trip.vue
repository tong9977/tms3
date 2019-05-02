<template>
  <v-container fluid grid-list-xl>
    <v-toolbar dense>
      <v-toolbar-title>
        <ejs-datepicker style="padding-bottom:5px;" format="dd-MM-yyyy"></ejs-datepicker>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary">
        <v-icon>mdi-plus</v-icon>สร้างตารางรถวันนี้
      </v-btn>
      <v-btn color="primary">
        <v-icon>mdi-plus</v-icon>สร้างแบบรายคัน
      </v-btn>
    </v-toolbar>

    <v-layout wrap>
      <v-flex xs12 sm6 md4>
        <material-card color="green" title="4 กด 187" text="ขนได้ 2000 กก. 600000 cc" full-width>
          <v-btn flat slot="menu">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-list two-line>
            <v-list-tile @click.stop>
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
                <v-btn
                  color="success"
                  round
                  class="font-weight-light"
                  @click="driverDialog = true"
                >คนขับรถ</v-btn>
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
      </v-flex>
    </v-layout>
  </v-container>
</template>
