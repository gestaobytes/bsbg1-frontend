<template>
  <div :title="title" :titleDestak="titleDestak" >
    <h5 class="mn-n6 intertitle">{{title}}</h5>
    <h6 class="title-page text--primary font-weight-black mt-n6">{{titleDestak}}</h6>
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
  font-size: 35px;
  text-transform: uppercase;
}
.intertitle{
  color: #bbb;
  font-weight: 200;
  font-size: 1.1em;
}
</style>
