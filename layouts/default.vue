<template>
  <v-app id="inspire">
    <!-- <Accessibility v-if="!isXs" /> -->

    <NavTop :categories=categories :menuCategories=menuCategories />

    <v-main class="mt-10">
      <!-- <v-row>
        <v-col cols="12">
          <div class="container">
            <div class="ads mt-2 mb-2">
              <v-layout row>
                <v-flex>
                  <div>
                    <div></div>
                  </div>
                </v-flex>
              </v-layout>
            </div>
          </div>
        </v-col>
      </v-row> -->
      <v-row>
        <v-col cols="12" :class="classDivHeader">
          <nuxt />
        </v-col>
      </v-row>
    </v-main>

    <NavigatorDrawer :categories=categories :menuCategories=menuCategories />
    <Footer v-if="!isXs" />
    <BotomNavigator v-if="isXs" />
  </v-app>
</template>

<script>
import axios from "axios";
import { urlPublic } from "@/global";

import Accessibility from "@/components/utils/Accessibility";
import NavTop from "@/components/layouts/NavTop";
import NavigatorDrawer from "@/components/layouts/NavigatorDrawer";
import Footer from "@/components/layouts/Footer";
import BotomNavigator from "@/components/layouts/BotomNavigator";

export default {
  components: {
    Accessibility,
    NavTop,
    NavigatorDrawer,
    Footer,
    BotomNavigator,
  },

  data() {
    return {
      classDivHeader: null,
      dateFinalBannerTO: "31/10/2021",
      showBannerTO: false,
      categories: [],
      menuCategories: [],
    };
  },

  computed: {
    isXs() {
      this.classDivHeader = "pa-0 pb-n2 pl-5 pr-5";
      return this.$breakpoints.xs;
    },
    isSm() {
      this.classDivHeader = "pa-0 pb-n2 pl-5 pr-5";
      return this.$breakpoints.sm;
    },
    isMd() {
      this.classDivHeader = "pa-0 pb-n2";
      return this.$breakpoints.md;
    },
    isLg() {
      this.classDivHeader = "pa-0 pb-n2";
      return this.$breakpoints.lg;
    },
    isXl() {
      this.classDivHeader = "pa-0 pb-n2";
      return this.$breakpoints.xl;
    },
  },

  methods: {
    loadCategoriesAndBlogs() {
      axios.get(`${urlPublic}/categories`).then((res) => {
        this.categories = res.data.map((c) => {
          return c.id, c.title;
        });
        this.menuCategories = res.data;
      });
    },
  },

  mounted() {
    this.loadCategoriesAndBlogs();
  },
};
</script>
