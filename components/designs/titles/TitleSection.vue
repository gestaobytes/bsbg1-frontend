<template>
  <!-- <div :align="`text-${defineAlign}`" :title="title" :titleDestak="titleDestak" > -->
  <div :align="defineAlign" :title="title" :titleDestak="titleDestak" >
    <h5 :class="'text--primary mn-n6 text-'+align">{{title}}</h5>
    <h4 :class="'text--primary font-weight-black mt-n6 text-'+align">{{titleDestak}}</h4>
  </div>
</template>

<script>
export default {
  props: ["title", "titleDestak", "align"],
  name: "TitleSection",
  computed: {
    defineAlign: function () {
      return this.align || "left";
    },
  },
};
</script>
