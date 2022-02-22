<template>
  <v-btn
    class="my-1 mr-2 pa-n7"
    color="#0098b0"
    fab
    x-small
    dark
    @click="$emit('save')"
  >
    <!-- outlined -->
    <v-icon class="my-n3 pa-n7" x-small>mdi-pencil</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "ButtonEdit",
};
</script>
