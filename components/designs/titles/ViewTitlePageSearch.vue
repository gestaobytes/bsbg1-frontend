<template>
  <div>
    <v-row class="mt-n3 mb-3">
      <v-col sm="6" md="6" lg="6" xl="6">
        <h5 class="mt-3" style="font-weight: 350; color: #0098b0; margin-right: 1rem">
          {{ titlePage }}
        </h5>
        <v-spacer></v-spacer>
      </v-col>
      <v-spacer></v-spacer>
      <v-col sm="6" md="6" lg="6" xl="6">
        <v-spacer></v-spacer>
        <form method="GET" v-on:submit.prevent="$emit('clickSubmit')">
          <v-container>
            <v-row class="mt-n3 mb-n4">
              <v-col class="mb-n5">
                <v-text-field
                  :placeholder="defineLabel"
                  outlined
                  dense
                  type="text"
                  :name="nameFS"
                  id="fieldSF"
                  min="5"
                  max="50"
                  :label="defineLabel"
                  required
                  color="#0098b0"
                  hint="Digite entre 5 e 50 caracteres"
                >
                  <template v-slot:append-outer>
                    <v-btn
                      class="mt-n2 py-5"
                      color="#0098b0"
                      dark
                      depressed
                      @click="$emit('clickSubmit')"
                      >Buscar</v-btn
                    >
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["titlePage", "nameFS", "label"],
  computed: {
    defineTitle: function () {
      return this.titlePage || "GESTÃO BYTES";
    },
    defineLabel: function () {
      return this.label || "Palavra(s) chave(s)";
    },
  },
  name: "ViewTitlePageSearch",
};
</script>

