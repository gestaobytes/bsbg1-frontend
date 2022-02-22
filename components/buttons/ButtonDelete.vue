<template>
  <v-btn
    class="my-1 mr-2 pa-n7"
    color="orange"
    fab
    x-small
    dark
    outlined
    @click="$emit('delete')"
  >
    <!-- outlined -->
    <v-icon class="my-n3 pa-n7" x-small>mdi-delete</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "ButtonDelete",
};
</script>
