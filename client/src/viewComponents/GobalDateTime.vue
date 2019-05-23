<template>
    <span v-if="Formate == 'DD/MM/YYYY'">{{ DateTimeString | date }}</span>
    <!-- <span v-if="Formate == 'DD/MM/YYYY HH:mm'">{{ DateTimeString | dateC }}</span> -->
</template>

<script>
import { createDateFilter } from "vue-date-fns";
import locale from "date-fns/locale/th";

export default {
  props: ["Formate", "DateTimeString"],
  filters: {
    date: createDateFilter("DD/MM/YYYY", { locale }),
    dateC: createDateFilter("DD/MM/YYYY HH:mm", { locale })
  }
};
</script>
