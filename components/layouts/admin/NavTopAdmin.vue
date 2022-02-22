<template>
  <div>
    <v-app-bar app color="orange" dark>
      <v-app-bar-nav-icon  @click="alternateDrawer()" v-if="!isSmOrXs"/>

      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-avatar size="32px" v-if="imageUser != '' && imageUser != null">
              <img :src="storage + /users/ + imageUser" />
            </v-avatar>
            <v-avatar color="orange" size="32px" v-else>
              {{ initialNameUser }}
            </v-avatar>
          </v-btn>
          <div class="mr-2">
            <p class="text-right subtitle-2 mt-3 mb-n1">{{ nameUser }}</p>
            <p class="text-right body-2 mt-n1">{{ emailUser }}</p>
          </div>
        </template>
        <v-list dense>
          <!-- <v-list-item to="/admin">
            <v-list-item-icon>
              <v-icon>mdi-tag-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Editar perfil</v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->

          <v-list-item @click="logout()">
            <v-list-item-icon>
              <v-icon>mdi-close-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Sair</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>


  </div>
</template>

<script>
import { keyApplicationGB } from "@/global";
export default {
  name: "NavTopAdmin",
  computed: {
    drawerStateAdmin() {
        return this.$store.state.sidebarAdmin.drawerStateAdmin;
    },

    isSmOrXs() { return this.$breakpoints.sm || this.$breakpoints.xs },
  },

  data() {
    return {
      dataUser: "",
      nameUser: "",
      initialNameUser: "",
      emailUser: "",
      imageUser: "",
      sticky: false,
    };
  },

  methods: {
    logout() {
      localStorage.removeItem(keyApplicationGB);
      this.$store.commit("setUser", null);
      this.$auth.logout();
    },
    handleScroll() {
      this.sticky = window.scrollY >= 120 ? true : false;
    },
    alternateDrawer(){
      this.$store.dispatch('sidebarAdmin/SET_DRAWER_ADMIN', !this.drawerStateAdmin);
    },
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll);

    const json = localStorage.getItem(keyApplicationGB);
    const userData = JSON.parse(json);

    this.dataUser = userData;
    this.nameUser = userData.user.username;

    if (userData.user.image != "undefined") {
      this.imageUser = userData.user.image;
      this.initialNameUser = this.nameUser;
    }
    if (userData.user.email != "undefined") {
      this.emailUser = userData.user.email;
    }
  },

};
</script>
