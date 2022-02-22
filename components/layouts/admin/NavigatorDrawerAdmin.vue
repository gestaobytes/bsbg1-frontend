<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    :mini-variant="isSm || isMd"
    :permanent="!isXs"
    :bottom="isXs"
  >
    <div style="background:black">
      <v-list-item class="px-2 pt-1 pb-1" nuxt to="/admin">
        <v-list-item-avatar>
          <img src="@/static/logo-mtsites.svg" alt="Meu Top Site" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            <img
             class="mt-n2 mb-n2"
              src="@/static/meutopsite.svg"
              style="width: 100%; max-width: 180px; text-align: center"
              alt="Gestão Bytes"
            />
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </div>

    <v-list-item class="mb-n5" link nuxt to="/" >
      <v-list-item-icon>
        <v-icon>mdi-web</v-icon>
      </v-list-item-icon>

      <v-list-item-content >
        <v-list-item-title>Ver site</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>

    <v-list>
      <v-list-item
        link
        v-for="[icon, text, page, index] in linksUsers"
        :key="index"
        nuxt
        :to="page"
      >
        <v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider v-if="linksUsers"></v-divider>


      <v-list-item
        link
        v-for="[icon, text, page, index] in linksNewspaper"
        :key="index"
        nuxt
        :to="page"
      >
        <v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider v-if="linksNewspaper"></v-divider>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { keyApplicationGB, adminSuper } from "@/global";

export default {
  name: "NavigatorDrawerAdmin",
  computed: {
    isXs() {
      return this.$breakpoints.xs;
    },
    isSm() {
      return this.$breakpoints.sm;
    },
    isMd() {
      return this.$breakpoints.md;
    },
    isLg() {
      return this.$breakpoints.lg;
    },
    isXl() {
      return this.$breakpoints.xl;
    },

    drawer: {
      get() {
        return this.$store.state.sidebarAdmin.drawerStateAdmin;
      },
      set(val) {
        this.$store.dispatch("sidebarAdmin/SET_DRAWER_ADMIN", val);
      },
    },

  },

  data() {
    return {
      linksUsers: [],
      linksNewspaper: [],
      linksSettings: [],
    };
  },

  mounted() {
    const json = localStorage.getItem(keyApplicationGB);
    const userData = JSON.parse(json);

    var menuUsers = [];
    var menuNewspaper = [];
    var menuSettings = [];

    const p = userData.permissions;
    const isSuperADM = p.includes(`${adminSuper}`);

    /**
     * clients and users
     */
    if (isSuperADM || p.includes("user")) {
      let menuRouteUsers = [
        "mdi-account-multiple-outline",
        "Usuários",
        { name: "admin-users" },
      ];
      menuUsers.push(menuRouteUsers);
    }
    if(isSuperADM || p.includes('roles')){
      let menuRouteUsers = ["fas fa-shield-alt", "Perfis", { name: "admin-roles" }]
      menuUsers.push(menuRouteUsers)
    }
    if (isSuperADM || p.includes("permission")) {
      let menuRouteUsers = [
        "mdi-lock-outline",
        "Permissões",
        { name: "admin-permissions" },
      ];
      menuUsers.push(menuRouteUsers);
    }
    /**
     * marketing
     */
    if (isSuperADM || p.includes("category")) {
      let menuRouteNewspaper = [
        "fas fa-tags",
        "Editorias",
        { name: "admin-categories" },
      ];
      menuNewspaper.push(menuRouteNewspaper);
    }
    if (isSuperADM || p.includes("subcategory")) {
      let menuRouteNewspaper = [
        "mdi-tag-outline",
        "Subcategoria",
        { name: "admin-subcategories" },
      ];
      menuNewspaper.push(menuRouteNewspaper);
    }
    // if (isSuperADM || p.includes("blogs")) {
    //   let menuRouteNewspaper = [
    //     "fab fa-blogger-b",
    //     "Blog e Colunas",
    //     { name: "admin-blogs" },
    //   ];
    //   menuNewspaper.push(menuRouteNewspaper);
    // }
    // if (isSuperADM || p.includes("columners")) {
    //   let menuRouteNewspaper = [
    //     "far fa-id-card",
    //     "Colunistas",
    //     { name: "admin-columners" },
    //   ];
    //   menuNewspaper.push(menuRouteNewspaper);
    // }
    if (isSuperADM || p.includes("position")) {
      let menuRouteNewspaper = [
        "mdi-apps",
        "Posições",
        { name: "admin-positions" },
      ];
      menuNewspaper.push(menuRouteNewspaper);
    }
    if (isSuperADM || p.includes("post")) {
      let menuRouteNewspaper = [
        "fab fa-blogger-b",
        "Notícias",
        { name: "admin-posts" },
      ];
      menuNewspaper.push(menuRouteNewspaper);
    }
    if (isSuperADM || p.includes("reaction")) {
      let menuRouteNewspaper = [
        "far fa-smile",
        "Reações",
        { name: "admin-reactions" },
      ];
      menuNewspaper.push(menuRouteNewspaper);
    }
    if (isSuperADM || p.includes("banner")) {
      let menuRouteNewspaper = [
        "fas fa-digital-tachograph",
        "Banners",
        { name: "admin-banners" },
      ];
      menuNewspaper.push(menuRouteNewspaper);
    }

    this.linksUsers = menuUsers;
    this.linksNewspaper = menuNewspaper;
    this.linksSettings = menuSettings;
  },
};
</script>
