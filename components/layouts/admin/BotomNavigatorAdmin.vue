<template>
  <div>
    <AccessibilityMobile v-if="accessibility" />
    <v-bottom-navigation
      app
      color="#0098b0"
      grow
      v-if="height == 'xs'"
    >
      <v-btn @click="alternateDrawer()">
        <span>Menu</span>
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-btn nuxt :to="{ name: 'admin-posts'}">
        <span>Blog</span>
        <v-icon>fab fa-blogger-b</v-icon>
      </v-btn>
      <v-btn nuxt :to="{ name: 'admin-banners'}">
        <span>Banners</span>
        <v-icon>fas fa-gift</v-icon>
      </v-btn>
      <v-btn @click="accessibility = !accessibility">
        <span>Ajustes</span>
        <v-icon v-if="accessibility">mdi-close</v-icon>
        <v-icon v-else>mdi-cog-outline</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import AccessibilityMobile from "@/components/accessibilitys/AccessibilityMobile";

export default {
  components: {
    AccessibilityMobile,
  },
  name: "BotomNavigatorAdmin",
  computed: {
    drawerStateAdmin() {
      return this.$store.state.sidebarAdmin.drawerStateAdmin;
    },
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs": return "xs";
        case "sm": return "sm";
        case "md": return "md";
        case "lg": return "lg";
        case "xl": return "xl";
      }
    },
  },
  data: () => ({
    accessibility: false,
  }),
  methods: {
    alternateDrawer() {
      this.$store.dispatch("sidebarAdmin/SET_DRAWER_ADMIN", !this.drawerStateAdmin);
    },
  },
};
</script>
