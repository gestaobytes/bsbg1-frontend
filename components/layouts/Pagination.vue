<template>
  <div class="text-xs-center mt-5">
    <v-pagination color="cyan" v-model="currentPage" :length="tamanho" total-visible="7" circle></v-pagination>
  </div>
</template>
<script>
export default {
  props: ["currentPage", "tamanho"],
  name: "Paginate",
  computed: {
    newPage: {
      get() {
        // return this.$store.state[this.$store][this.collection].current_page
        return 1;
      },
      set(page) {
        this.$emit("update:page", page);  
      }
    }
  }
};
// get:function () {
//     return this.temp_value
// },
// set: function(newValue){
//     this.$emit('update:value', newValue);
// }
</script>


