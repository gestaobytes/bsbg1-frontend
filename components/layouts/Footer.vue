<template>
  <div
    class="mt-10"
    style="
      font-size: 0.9rem;
      font-weight: 300;
      font-family: 'Roboto Serif', sans-serif !important;
      color: white;
      text-decoration: none;
    "
  >
    <footer class="main-footer" style="background: #003399">
      <v-row>
        <v-col cols="12">
          <v-layout class="container" style="">
            <v-row>
              <v-col cols="12" sm="4" md="3">
                <p>
                  <img
                    src="@/static/logo-bsbg-white.svg"
                    alt="BSBG1"
                    width="100px"
                    class="mb-2"
                    style="z-index: 999"
                  />
                </p>

                <p>
                  31.246.479/0001-74 <br />
                  RB Lira Publicidade Eireli <br /> <br />

                  Editor Geral <br />
                  Raimundo Batista Lira <br />
                  DRT/GO 01280JP
                </p>
              </v-col>

              <v-col cols="12" sm="4" md="3">
                <NuxtLink class="link-footer" :to="{ name: 'index' }"
                  >HOME</NuxtLink
                >
                <br />
                <NuxtLink
                  class="link-footer"
                  :to="{ name: 'category', params: { category: 'estado' } }"
                  >ESTADO</NuxtLink
                >
                <br />
                <NuxtLink
                  class="link-footer"
                  :to="{ name: 'category', params: { category: 'geral' } }"
                  >GERAL</NuxtLink
                >
                <br />
                <NuxtLink
                  class="link-footer"
                  :to="{ name: 'category', params: { category: 'politica' } }"
                  >POLÍTICA</NuxtLink
                >
                <br />
                <NuxtLink
                  class="link-footer"
                  :to="{ name: 'category', params: { category: 'nacional' } }"
                  >NACIONAL</NuxtLink
                >
                <br />
              </v-col>

              <v-col cols="12" sm="4" md="3">
                <NuxtLink
                  class="link-footer"
                  :to="{
                    name: 'category',
                    params: { category: 'internacional' },
                  }"
                  >INTERNACIONAL</NuxtLink
                >
                <br />
                <NuxtLink
                  class="link-footer"
                  :to="{
                    name: 'category',
                    params: { category: 'opiniao-e-analise' },
                  }"
                  >OPINIÃO E ANÁLISE</NuxtLink
                >
                <br />
                <NuxtLink
                  class="link-footer"
                  :to="{ name: 'category', params: { category: 'brasilia' } }"
                  >BRASÍLIA</NuxtLink
                >
                <br />
                <NuxtLink
                  class="link-footer"
                  :to="{ name: 'category', params: { category: 'entrevista' } }"
                  >ENTREVISTA</NuxtLink
                >
                <br />
              </v-col>

              <v-col cols="12" sm="4" md="3" style="text-align: right">
                <v-spacer></v-spacer>

                bsbbg1@gmail.com <br />
                (62) 98560 5450 <br />
                (61) 98144 0178 <br />
                <br />

                <v-btn
                  href="https://www.facebook.com"
                  color="white"
                  fab
                  x-small
                  outlined
                  class="pa-n2 mr-2"
                >
                  <v-icon small class="ma-n1">fab fa-facebook-f</v-icon>
                </v-btn>

                <v-btn
                  href="https://twitter.com"
                  color="white"
                  fab
                  x-small
                  outlined
                  class="pa-n2 mr-2"
                >
                  <v-icon small class="ma-n1">fab fa-twitter</v-icon>
                </v-btn>

                <v-btn color="white" fab x-small outlined class="pa-n2 mr-2">
                  <v-icon small class="ma-n1">fab fa-instagram</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-layout>
        </v-col>
      </v-row>
      <div class="footer-bottom" style="background: #0a2457">
        <div class="auto-container">
          <div class="inner clearfix">
            <div class="copyright">
              Copyright © {{ currentYear }}. BSBG1 <br />
              Todos os direitos reservados.
            </div>
          </div>
        </div>
      </div>
    </footer>

    <a
      @click="scrollTop"
      class="scroll-to-target scroll-to-top"
      :style="`display: ${scrollBtn ? 'inline' : 'none'}`"
      href="#"
      ><i class="fa fa-angle-up"></i
    ></a>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      scrollBtn: false,
      currentYear: null,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);

    var dateNow = new Date();
    this.currentYear = dateNow.getFullYear();
  },

  methods: {
    handleScroll() {
      if (window.scrollY > 70) {
        this.scrollBtn = true;
      } else if (window.scrollY < 70) {
        this.scrollBtn = false;
      }
    },

    scrollTop() {
      window.scrollTo(0, 0);
    },
  },
};
</script>
<style scoped>
.link-footer {
  color: white;
  text-decoration: none;
  line-height: 1.8rem;
}
.link-footer:hover {
  color: #00d1c7;
}
</style>
