<template>
  <div :errorValidation="defineError" :msgBtn="msgBtn">
    <v-form @submit.prevent="$emit('save')" enctype="multipart/form-data">
      <slot name="contentForm"></slot>
    </v-form>

    <v-card-actions>
      <v-spacer />
      <span class="caption mr-2" v-if="errorValidation"> Botão será ativado após preenchimento dos campos obrigatórios</span>
      <v-btn large disabled v-if="errorValidation">{{msgBtn}}</v-btn>
      <v-btn large color="orange" dark depressed v-else @click="$emit('save')">{{msgBtn}}</v-btn>
    </v-card-actions>



  </div>
</template>

<script>
export default {
  props: ["title", "errorValidation", "msgBtn"],
  computed: {
    defineTitleModal: function () {
      return this.title || "REGISTRO";
    },
    defineError: function () {
      return this.errorValidation || true;
    },
  },
  name: "ViewPageForm",
};
</script>




