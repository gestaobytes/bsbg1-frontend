<template>
  <v-btn
    color="orange"
    dark
    @click="$emit('add')"
    :title="defineTitle"
    :iconButton="defineIcon"
    class="mb-3"
    :outlined="defineOutlined"
  >
    <v-icon small class="mr-2">{{iconButton}}</v-icon>
    {{ defineTitle }}
  </v-btn>
</template>

<script>
export default {
  name: "ButtonAdd",
  props: ["title", "iconButton","outlined"],
  computed: {
    defineTitle: function () {
      return this.title || "NOVO REGISTRO";
    },
    defineOutlined: function () {
      return this.outlined || false;
    },
    defineIcon: function () {
      return this.iconButton || "";
    },
  },
};
</script>
