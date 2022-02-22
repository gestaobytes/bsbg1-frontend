<template>
  <div :title="title" :titleDestak="titleDestak" >
    <h5 class="text--primary mn-n6">{{title}}</h5>
    <h1 class="title-page text--primary font-weight-black mt-n6">{{titleDestak}}</h1>
  </div>
</template>

<script>
export default {
  props: ["title","titleDestak"],
  name: "TitlePage",
};
</script>
<style scoped>
.title-page {
  font-size: 40px;
  text-transform: uppercase;
}
</style>
