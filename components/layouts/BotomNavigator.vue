<template>
  <div>
    <AccessibilityMobile v-if="accessibility" />
    <v-bottom-navigation app color="#0098b0" grow v-if="this.$nuxt.$vuetify.breakpoint.name == 'xs'">
      <v-btn @click="alternateDrawer()">
        <span>Menu</span>
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <!-- <v-btn>
        <span>Preferidas</span>
        <v-icon>mdi-heart</v-icon>
      </v-btn> -->
      <v-btn @click="accessibility = !accessibility">
        <span>Ajustes</span>
        <v-icon v-if="accessibility">mdi-close</v-icon>
        <v-icon v-else>mdi-cog-outline</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import AccessibilityMobile from '@/components/utils/AccessibilityMobile.vue';

export default {
  name: "BotomNavigator",
  components: {
    AccessibilityMobile
  },


  computed: {
    drawerState() {
      return this.$store.state.sidebar.drawerState;
    }
  },

  data: () => ({
    accessibility: false,
  }),

  methods: {
    alternateDrawer(){
      this.$store.dispatch('sidebar/SET_DRAWER', !this.drawerState);
    },
  }


};
</script>
