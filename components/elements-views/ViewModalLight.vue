<template>
  <v-card :title="defineTitleModal" :errorValidation="defineError" border="top">

    <v-card>
      <div class="pt-2 pb-3 px-7">

        <table width="100%">
          <tr>
            <td><h2 class="py-4 title text-uppercase" color="grey lighten-1">{{title}}</h2></td>
            <td width="50px">
              <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn fab outlined small color="#0098b0" @click="$emit('close')" v-bind="attrs" v-on="on">
                    <span>X</span>
                  </v-btn>
                </template>
                <span>Fechar Tela</span>
              </v-tooltip>
            </td>
          </tr>
        </table>

        <v-form @submit.prevent="$emit('save')"  enctype='multipart/form-data' >
          <slot name="contentForm"></slot>
        </v-form>

        <v-card-actions>
          <v-btn color="grey lighten-1" dark small depressed @click="$emit('close')">Fechar</v-btn>
          <v-spacer />
          <v-btn disabled small v-if="errorValidation">SALVAR</v-btn>
          <v-btn color="#0098b0" dark small depressed v-else @click="$emit('save')">SALVAR</v-btn>
        </v-card-actions>

       </div>
    </v-card>
  </v-card>
</template>

<script>
export default {
  props: ["title","errorValidation"],
  computed: {
    defineTitleModal: function() {
      return this.title || "REGISTRO";
    },
    defineError: function() {
      return this.errorValidation || true;
    }
  },
  name: "ViewModalLight"
};
</script>




