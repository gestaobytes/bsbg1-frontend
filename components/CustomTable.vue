<template>
  <v-simple-table class="elevation-3" dense>
    <thead>
      <th style="border-bottom: 1px solid #0098b0" v-for="head in headTH" :key="head">
        <h4 class="cyan--text text-left mx-4 my-1 font-weight-light">{{head}}</h4>
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
  name: "CustomTable"
};
</script>
