<template>
  <v-navigation-drawer
    fixed
    v-model="drawer"
    temporary
    :bottom="this.$nuxt.$vuetify.breakpoint.name == 'xs'"
    class="pt-7 pl-3 pr-4"
    :categories="categories"
    :menuCategories="menuCategories"
  >
    <v-list-item>
      <v-list-item-content>
        <img
          src="@/static/logo-bsbg1-color.svg"
          :alt="titlePage"
          width="350px"
          style="z-index: 999"
        />
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item
        v-for="(item, i) in menuCategories"
        :key="i"
        :to="{ name: 'category', params: { category: item.slug } }"
      >
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "NavigatorDrawer",
  props: ["categories", "menuCategories"],
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
};
</script>

