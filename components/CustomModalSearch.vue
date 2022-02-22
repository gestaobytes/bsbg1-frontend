<template>
  <form>
    <v-card>
      <v-container grid-list-xl class="pt-7 pl-6 pr-6">
        <h2 class="headline font-weight-bold mb-3" color="blue">
          <v-btn small disabled outlined fab class="mr-2">
            <v-icon small class="mt-0">fa fa-search</v-icon>
          </v-btn>Procure nBSBG1
        </h2>

        <v-row class="mt-7">
          <v-col xs="12" sm="12" md="12" lg="12" xl="12">
            <v-text-field
              placeholder="Digite o texto a ser pesquisado"
              outlined
              type="text"
              name="keywords"
              label="Palavra(s) chave(s)"
              :rules="[rules.required, rules.min, rules.max]"
              required
              min="8"
              max="50"
              color="blue"
              class="mb-0"
              hint="Digite pelo menos 5 caracteres"
              counter
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>

      <div style="background-color: #d6efff">
        <v-container grid-list-xl class="mt-n4 mb-n4 pt-7 pl-6 pr-6">
          <v-row class="mt-n6 mb-n3">
            <v-col xs="12" sm="12" md="12" lg="12" xl="12">Filtros opcionais</v-col>
          </v-row>

          <v-row>
            <v-col xs="12" sm="12" md="6" lg="6" xl="6">
              <v-combobox
                class="mb-n4"
                :items="categories"
                label="Categorias"
                multiple
                outlined
                color="blue"
              ></v-combobox>
            </v-col>

            <v-col xs="12" sm="6" md="3" lg="3" xl="3">
              <v-text-field
                class="mb-n4"
                type="date"
                name="start"
                label="Data incial"
                color="blue"
                outlined
                :allowed-dates="allowedDates"
                v-model="dateStart"
                min="2010-01-01"
                :max="dateFinish"
              ></v-text-field>
            </v-col>

            <v-col xs="12" sm="6" md="3" lg="3" xl="3">
              <v-text-field
                class="mb-n6"
                type="date"
                name="finish"
                label="Data final"
                color="blue"
                outlined
                :allowed-dates="allowedDates"
                v-model="dateFinish"
                min="2010-01-01"
                max="2020-05-02"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <v-container grid-list-xl class="pt-7 pl-6 pr-6">
        <v-row class="mx-n7 px-4 mb-0">
          <v-col xs="12" sm="12" md="6" lg="6" xl="6">
            <v-btn
              class="mb-n2"
              large
              block
              outlined
              color="blue"
              dark
              depressed
              @click="$emit('exactSearch')"
            >PESQUISAR FRASE EXATA</v-btn>
          </v-col>
          <v-col xs="12" sm="12" md="6" lg="6" xl="6">
            <v-btn
              class="mb-n1"
              large
              block
              color="blue"
              dark
              depressed
              @click="$emit('relatedSearch')"
            >PESQUISAR POR PALAVRAS</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </form>
</template>


<script>
import { urlPublic } from "@/global";
import axios from "axios";

export default {
  name: "customModalSearch",
  data: function() {
    return {
      categories: [],
      inputKeywords: "",
      dateStart: "2010-01-01",
      dateFinish: "2020-05-02",
      searchResults: [],
      rules: {
        required: value => !!value || "Obrigatório",
        min: min => min.length >= 5 || "Min 5 caracteres",
        max: max => max.length <= 50 || "Máx 50 caracteres",
        emailMatch: () => "The email and password you entered don't match"
      }
    };
  },
  methods: {
    allowedDates: val => parseInt(val.split("-")[2], 10) % 2 === 0,
    loadCategoriesAndBlogs() {
      axios.get(`${urlPublic}/categories`).then(res => {
        this.categories = res.data.map(category => {
          return {
            value: category.id,
            text: category.title
          };
        });
      });
    }
  },
  mounted() {
    this.loadCategoriesAndBlogs();

    var dateNow = new Date();
    var year = dateNow.getFullYear();
    var month = dateNow.getMonth() + 1;
    var day = dateNow.getDate();
    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;
    this.dateFinish = year + "-" + month + "-" + day;
  }
};
</script>




















