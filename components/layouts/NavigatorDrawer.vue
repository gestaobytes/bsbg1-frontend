<template>

  <v-navigation-drawer
    fixed
    v-model="drawer"
    temporary
    :bottom="this.$nuxt.$vuetify.breakpoint.name == 'xs'"
    class="pt-7 pl-3 pr-4"
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          Editorias
        </v-list-item-title>
        <v-list-item-subtitle>
          navegue por assunto
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      


      <v-list-item
        v-for="(item, i) in menuCategories"
        :key="i"
        :to="{ name: 'category', params: { category: item.slug } }"
      >
        <!-- <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon> -->

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>




    </v-list>
  </v-navigation-drawer>
</template>

<script>
import axios from "axios";
import { urlPublic } from "@/global";

export default {
  name: "NavigatorDrawer",
  computed: {
    drawer: {
      get() {
        return this.$store.state.sidebar.drawerState;
      },
      set(val) {
        this.$store.dispatch("sidebar/SET_DRAWER", val);
      },
    },
  },

  data() {
    return {
      valueCategories: [],
      categories: [],
      menuCategories: [],
    };
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