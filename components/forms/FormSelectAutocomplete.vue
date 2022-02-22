<template>
  <v-autocomplete
    v-bind:value="value"
    @input="$emit('input', $event)"
    :items="itemsData"
    :label="label"
    required
    color="orange"
    :outlined=defineOutlined
    :dense=defineDense
    :deletable-chips=defineDeletable
    :multiple=defineMultiple
    :small-chips=defineChip
  />
</template>

<script>
export default {
  inheritAttrs: false,
  props: ["label", "value", "itemsData", "deletable", "multiple", "chips"],
  computed: {

    defineDeletable: function () {
      return this.deletable || false;
    },
    defineMultiple: function () {
      return this.multiple || false;
    },
    defineChip: function () {
      return this.chips || false;
    },
    defineOutlined: function () {
      return this.outlined || true;
    },
    defineDense: function () {
      return this.dense || true;
    },
    defineRequired: function () {
      return this.required || false;
    },
  },
  name: "FormSelectAutocomplete",
};
</script>
