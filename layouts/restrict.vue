<template>
  <v-app id="inspire" v-if="show">
    <NavTopAdmin />
    <NavigatorDrawerAdmin />
    <v-main>
      <div class="pa-10">
        <nuxt />
      </div>
    </v-main>
    <!-- <BotomNavigatorAdmin /> -->
  </v-app>
</template>

<script>
import axios from "axios";
import { urlApi, keyApplicationGB } from "@/global";

import NavTopAdmin from "@/components/layouts/admin/NavTopAdmin.vue";
import NavigatorDrawerAdmin from "@/components/layouts/admin/NavigatorDrawerAdmin.vue";
// import BotomNavigatorAdmin from "@/components/layouts/admin/BotomNavigatorAdmin.vue";

export default {
  components: {
    NavTopAdmin,
    NavigatorDrawerAdmin,
    // BotomNavigatorAdmin,
  },

  name: "LayoutRestrict",

  data: function () {
    return {
      show: false,
      categories: null,
      data: {},
    };
  },

  methods: {
    async validateToken() {

      const json = localStorage.getItem(keyApplicationGB);
      const userData = JSON.parse(json);
      this.userData = userData;
      this.$store.commit("login/SET_USER", null);

      if (!userData) {
          this.show = false;
        this.$router.push({ name: "login" });
        return;
      }

      const res = await axios.post(`${urlApi}/auth/validateToken`, userData);

      if (res.data) {
        this.$store.commit("login/SET_USER", userData);

        // if (userData.user.type == "U") {
        //   this.$router.push({ name: "index" });
        // }

        this.show = true;
      } else {
        localStorage.removeItem(keyApplicationGB);
        this.$router.push({ name: "login" });
        this.show = false;
      }

    },
  },

  computed: {
    isXsOrSM() {
      return this.$breakpoints.xs || this.$breakpoints.sm;
    },
    isXs() {
      return this.$breakpoints.xs;
    },
    isSm() {
      return this.$breakpoints.sm;
    },
  },

  mounted() {
    this.validateToken();
  },
};
</script>
