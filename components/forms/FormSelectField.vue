<template>
  <v-select
    v-bind:value="value"
    @input="$emit('input', $event)"
    :items="itemsData"
    :label="label"
    required
    :dense=defineDense
    :dark=defineDark
    color="orange"
    :outlined=defineOutlined
  />
</template>

<script>
export default {
  inheritAttrs: false,
  props: ["label", "value", "itemsData", "color"],
  computed: {
    defineRequired: function () {
      return this.required || false;
    },
    defineDark: function () {
      return this.dark || false;
    },
    defineOutlined: function () {
      return this.outlined || true;
    },
    defineDense: function () {
      return this.dense || true;
    },
  },
  name: "FormSelectField",
};
</script>
