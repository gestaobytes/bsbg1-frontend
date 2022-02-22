<template>
  <v-simple-table class="elevation-3 mb-5" dense>
    <thead>
      <th style="border-bottom: 1px solid #0098b0" v-for="head in headTH" :key="head">
        <p style="color:#0098b0;font-size: 0.8em" class="text-left mx-4 my-1 font-weight-light">{{head}}</p>
      </th>
      <th style="border-bottom: 1px solid #0098b0" width="120px" ></th>
    </thead>
    <tbody class="pt-5">
      <slot name="registers-table"></slot>
    </tbody>
  </v-simple-table>
</template>
<script>
export default {
  props: ["headTH"],
  name: "TableCustom"
};
</script>
