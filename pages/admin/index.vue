



<template>
  <div style="width: 100%">
    <v-row style="background-color: #eee" class="mt-n3 mb-3">
      <v-col cols="12">
        <h4 style="font-weight: 350; color: #38969f; margin-right: 1rem">
          DASHBOARD
        </h4>
        <v-spacer></v-spacer>
      </v-col>
    </v-row>

    <!-- <div v-if="viewDasboard"> -->
    <div>
      <p class="caption font-weight-medium">Dados Google [30 dias]</p>
      <v-row>
        <v-col sm="6" md="4" lg="4" xl="4">
          <v-alert color="primary" outlined>
            <v-row>
              <v-col cols="12">
                <p class="title mb-n2 mt-n5">Comportamento</p>
              </v-col>
            </v-row>
            <v-row class="title mt-n3 mb-n6">
              <v-col cols="6" class="text-center">
                <CircularProgress
                  size="90"
                  :value="allAccesses.percentNewVisitor"
                  width="9"
                  :legendTop="allAccesses.news"
                  legend="Novos usuários"
                />
              </v-col>
              <v-col cols="6" class="text-center">
                <CircularProgress
                  size="90"
                  :value="allAccesses.percentReturnVisitor"
                  width="9"
                  :legendTop="allAccesses.return"
                  legend="Retornaram"
                />
              </v-col>
            </v-row>
          </v-alert>
        </v-col>

        <v-col sm="6" md="4" lg="4" xl="4">
          <v-alert color="primary" outlined>
            <v-row>
              <v-col cols="12">
                <p class="title mb-n1 mt-n5">Como acessam</p>
              </v-col>
            </v-row>
            <BarProgress
              :value="allAccesses.percentDirect"
              origem="Diretamente"
              :percent="allAccesses.percentDirect"
              :accesses="allAccesses.direct"
            />
            <BarProgress
              :value="allAccesses.percentGoogle"
              origem="Google"
              :percent="allAccesses.percentGoogle"
              :accesses="allAccesses.google"
            />
            <v-row>
              <v-col cols="12">
                <p class="title mb-n2">Mídias Sociais</p>
              </v-col>
            </v-row>
            <BarProgress
              :value="allAccesses.percentFacebook"
              origem="Facebook"
              :percent="allAccesses.percentFacebook"
              :accesses="allAccesses.facebook"
            />
            <BarProgress
              :value="allAccesses.percentLinkedin"
              origem="Linkedin"
              :percent="allAccesses.percentLinkedin"
              :accesses="allAccesses.linkedin"
            />
            <BarProgress
              :value="allAccesses.percentInstagram"
              origem="Instagram"
              :percent="allAccesses.percentInstagram"
              :accesses="allAccesses.instagram"
            />
          </v-alert>
        </v-col>

        <v-col sm="12" md="4" lg="4" xl="4">
          <v-alert color="orange darken-1" outlined>
            <v-row>
              <v-col cols="12">
                <p class="title mb-n1 mt-n5">Produção</p>
              </v-col>
            </v-row>

            <BarProgressProduction
              origem="Total Cadastrado"
              :accesses="allAccesses.postTotal"
              :value="100"
              color="orange darken-1"
            />
            <BarProgressProduction
              origem="30 dias"
              :accesses="allAccesses.postMonth"
              :value="allAccesses.percentMonth"
            />
            <BarProgressProduction
              origem="7 dias"
              :accesses="allAccesses.postWeak"
              :value="percentWeek"
            />
            <BarProgressProduction
              origem="Hoje"
              :accesses="allAccesses.postDay"
              :value="percentDay"
            />
          </v-alert>
        </v-col>
      </v-row>

      <v-row>
        <v-col sm="12" md="8" lg="8" xl="8">
          <v-alert color="primary" outlined>
            <v-row>
              <v-col cols="12">
                <p class="title mb-n2 mt-n5">Páginas + acessadas</p>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-simple-table>
                  <template v-slot:default>
                    <tbody>
                      <tr
                        v-for="data in registersTopPages"
                        :key="data.id"
                        @click="openPost(data.url)"
                      >
                        <td>{{ data.url }}</td>
                        <td class="text-right" width="200px">
                          {{ data.pageViews }}
                        </td>
                        <td width="5">
                          <v-btn
                            color="primary"
                            class="pa-0 ma-1"
                            x-small
                            outlined
                            dark
                            icon
                          >
                            <v-icon class="">mdi-play</v-icon>
                          </v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row>
          </v-alert>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { keyApplicationGB, urlAdmin, adminSuper } from "@/global";

import CircularProgress from "~/components/loadings/DesignCircularProgress.vue";
import BarProgress from "~/components/loadings/DesignBarProgress.vue";
import BarProgressProduction from "~/components/loadings/DesignBarProgressProduction.vue";

export default {
  // middleware: ["clearValidationErrors"],
  layout: "restrict",
  components: {
    CircularProgress,
    BarProgress,
    BarProgressProduction,
  },

  data: function () {
    return {
      viewDasboard: false,
      allAccesses: {},
      categoriesAccesses: {},
      maturityBanners: {},
      registersTopPages: [],
      percentWeek: "",
      percentMonth: "",
      percentDay: "",
    };
  },

  methods: {
    openPost(slug) {
      this.url = `http://www.poptvnews.com.br${slug}`;
      window.open(this.url);
    },
  },

  mounted() {
    const json = localStorage.getItem(keyApplicationGB);
    const userData = JSON.parse(json);

    const p = userData.permissions;
    const isSuperADM = p.includes(`${adminSuper}`);

    if (isSuperADM || p.includes("admin")) {
      this.viewDasboard = true;
    }
  },
};
</script>
