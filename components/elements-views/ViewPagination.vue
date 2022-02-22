<template>
  <div class="text-xs-center mt-5 mb-10">
    <v-pagination color="orange" v-model="currentPage" :length="tamanho" total-visible="7" circle></v-pagination>
  </div>
</template>
<script>
export default {
  props: ["currentPage", "tamanho"],
  name: "Paginate",
  computed: {
    newPage: {
      get() {
        return 1;
      },
      set(page) {
        this.$emit("update:page", page);
      }
    }
  }
};

</script>


