<template>
  <v-btn
    class="my-1 pa-n7 mr-2"
    color="orange"
    fab
    x-small
    outlined
    dark
    @click="$emit('actionClick')"
    :iconButton="iconButton"
  >
    <v-icon class="my-n3 pa-n7">{{ iconButton }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: ["iconButton", "titleButton"],
  name: "ButtonGeneric",
};
</script>
