<template>
<JobListComp :JobStatusId ="1" ColorTheme='orange' :CanCreate="true"/>

</template>

<script>
import JobListComp from "@/viewComponents/JobListComp.vue";

export default {
  components: {
   
    JobListComp
  },

}
</script>


