<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card color="orange" title="ใบเงานใหม่" text="ใบเงานที่ยังไม่ได้รับมอบหมายทั้งหมด">
          <v-data-table :headers="headers" :items="jobnews" hide-actions>
            <template slot="headerCell" slot-scope="{ header }">
              <span class="subheading font-weight-light text--darken-3" v-text="header.text"/>
            </template>
            <template slot="items" slot-scope="{ item }">
              <td>{{ item.JobId }}</td>
              <td>{{ item.CustomerName }}</td>
              <td>{{ item.DeliveryDate }}</td>
              <td>
                {{ item.ContactPerson }}
                <br>
                {{ item.Tel }}
              </td>
              <td>
                <ul>
                  <li
                    v-for="p in item.Products"
                    :key="p.ProductName"
                  >{{p.ProductName}} {{p.Quantity}} {{p.Unit}}</li>
                </ul>
              </td>
              <td>{{ item.Remark }}</td>
              <td>
                {{ item.Address }}
                <br>
                <a
                  :href="'https://maps.google.com/maps?q=' + item.Lat +','+item.Long +'&hl=es;z=14&amp;output=embed'"
                  style="color:#0000FF;text-align:left"
                  target="_blank"
                >map</a>
              </td>
              <td>{{ item.Weigth }} kg <br> {{ item.CC }} cc</td>
              <td>{{ item.RouteNo }}</td>
              <td>{{ item.Zone }}</td>
              <td>{{ item.Distance }} km.</td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapMutations, mapState } from "vuex";

export default {
  data: () => ({
    headers: [
      { value: "JobId", text: "Id", sortable: true },
      { value: "CustomerName", text: "ลูกค้า", sortable: true },
      { value: "DeliveryDate", text: "วันส่งของ", sortable: true },
      { value: "ContactPerson", text: "คนติดต่อ", sortable: false },
      { text: "สินค้า", sortable: false },
      { value: "Remark", text: "หมายเหตุ", sortable: false },
      { value: "Address", text: "ที่อยู่", sortable: false },
      { value: "Weigth", text: "น้ำหนัก/ปริมาตร", sortable: false },
      { value: "RouteNo", text: "RouteNo", sortable: false },
      { value: "Zone", text: "Zone", sortable: false },
      { value: "Distance", text: "ระยะทาง", sortable: false }
    ]
  }),
  computed: {
    ...mapState("tms", ["jobnews"])
  }
};
</script>