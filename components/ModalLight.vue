<template>
  <v-card :title="defineTitleModal">
    <v-card>
      <div class="pt-2 pb-3 px-7">
          <h2 class="py-4 title text-uppercase" color="cyan">{{title}}</h2>
          <v-layout wrap>
            <slot name="contentForm"></slot>
          </v-layout>
          
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey lighten-1" dark small depressed @click="$emit('close')">Fechar</v-btn>
            <v-btn color="cyan" dark small depressed @click="$emit('save')">Salvar</v-btn>
          </v-card-actions>
       </div>
    </v-card>
  </v-card>
</template>

<script>
export default {
  props: ["title"],
  computed: {
    defineTitleModal: function() {
      return this.title || "REGISTRO";
    }
  },
  name: "ModalLight"
};
</script>




