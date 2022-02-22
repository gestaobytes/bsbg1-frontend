<template>
  <v-app id="inspire">
    <NavTopAdmin />
    <NavigatorDrawerAdmin />
    <v-main>
      <v-container class="pa-5 pb-10">
        <nuxt />
      </v-container>
    </v-main>
    <BotomNavigatorAdmin v-if="isXs" />
  </v-app>
</template>


<script>
import NavTopAdmin from "@/components/layouts/admin/NavTopAdmin.vue";
import NavigatorDrawerAdmin from "@/components/layouts/admin/NavigatorDrawerAdmin.vue";
import BotomNavigatorAdmin from "@/components/layouts/admin/BotomNavigatorAdmin.vue";
export default {
  components: {
    NavTopAdmin,
    NavigatorDrawerAdmin,
    BotomNavigatorAdmin,
  },
  name: "Admin",
  computed: {
    isXs() {
      return this.$breakpoints.xs;
    },
  },
};
</script>
