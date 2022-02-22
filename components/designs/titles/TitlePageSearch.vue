<template>
  <div>
    <v-row style="background-color: #eee" class="mt-n3 mb-3">
      <v-col cols="12" xs="12" sm="4" md="4" lg="4" xl="4">
        <h1 class="display-1 font-weight-light mt-2">{{titlePage}}</h1>
        <v-spacer></v-spacer>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" xs="12" sm="8" md="8" lg="8" xl="6">
        <v-spacer></v-spacer>
        <form method="GET" v-on:submit.prevent="$emit('clickSubmit')">
          <v-container>
            <v-row class="mt-n3 mb-n4">
              <v-col
                class="mb-n5"
                xs="12"
                sm="6"
                md="4"
                lg="3"
                xl="3"
                v-if="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm"
              >
                <v-text-field
                  type="date"
                  name="dts"
                  id="dtsFS"
                  label="Data incial"
                  color="cyan"
                  outlined
                  dense
                  :allowed-dates="allowedDates"
                  v-model="dateStart"
                  min="2010-01-01"
                  :max="dateFinish"
                  width="250"
                ></v-text-field>
              </v-col>

              <v-col
                class="mb-n5"
                xs="12"
                sm="6"
                md="4"
                lg="3"
                xl="3"
                v-if="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm"
              >
                <v-text-field
                  type="date"
                  name="dtf"
                  id="dtfFS"
                  label="Data final"
                  color="cyan"
                  outlined
                  dense
                  :allowed-dates="allowedDates"
                  v-model="dateFinish"
                  min="2010-01-01"
                  :max="dateFinish"
                  width="250"
                ></v-text-field>
              </v-col>

              <v-col class="mb-n5" xs="12" sm="12" md="4" lg="6" xl="6">
                <v-text-field
                  placeholder="Texto da pesquisa"
                  outlined
                  dense
                  type="text"
                  :name="nameFS"
                  id="fieldSF"
                  min="1"
                  max="50"
                  label="Palavra(s) chave(s)"
                  required
                  color="cyan"
                  hint="Digite entre 5 e 50 caracteres"
                >
                  <!-- @keyup.enter="$emit('clickSubmit')" -->
                  <template v-slot:append-outer>
                    <v-btn
                      class="mt-n2"
                      color="cyan"
                      dark
                      fab
                      depressed
                      small
                      @click="$emit('clickSubmit')"
                      v-if="$vuetify.breakpoint.md"
                    >
                      <v-icon class="mt-0" small>mdi-plus-circle</v-icon>
                    </v-btn>
                    <v-btn
                      class="mt-n2 py-5"
                      color="cyan"
                      dark
                      depressed
                      @click="$emit('clickSubmit')"
                      v-else
                    >Buscar</v-btn>
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
  data: function () {
    return {
      dateStart: "2010-01-01",
      dateFinish: "",
    };
  },

  props: ["titlePage", "nameFS", "idFS", "idDtsFS", "idDtfFS"],
  computed: {
    defineTitle: function () {
      return this.titlePage || "GESTÃO BYTES";
    },
  },

  mounted() {
    var dateNow = new Date();
    var year = dateNow.getFullYear();
    var month = dateNow.getMonth() + 1;
    var day = dateNow.getDate();
    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;
    this.dateFinish = year + "-" + month + "-" + day;
  },

  name: "TitlePageSearch",

  methods: {
    allowedDates: (val) => parseInt(val.split("-")[2], 10) % 2 === 0,
  },
};
</script>

