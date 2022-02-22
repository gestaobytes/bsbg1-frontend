<template>
  <table :title="title" :icon="icon" width="100%">
    <tr>
      <td width="10px" v-if="icon">
        <v-btn outlined fab small color="#ff0000" class="ml-n1 mr-2 mb-2">
          <v-icon small class="mt-0">{{icon}}</v-icon>
        </v-btn>
      </td>
      <td><h5 class="title-sharing mb-3 lh-0-9">{{title}}</h5>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  props: ["title","icon"],
  name: "TitleIcon",
};
</script>





















