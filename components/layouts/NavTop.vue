<template>
  <div class="shadow" :menuCategories=menuCategories>
    <div style="background: #003399; margin-top: -20px" height="5px">
      .
    </div>

    <div class="top-header">
      <div class="container text-center">
        <NuxtLink to="/">
          <img
            src="@/static/logo.png"
            alt="BSBG1"
            width="200px"
            style="z-index:999"
            class="mt-1"
          />
        </NuxtLink>
        <!-- <table width="100%">
          <tr>
            <td width="110px" class="text-right">
              &nbsp;
            </td>
            <td min-width="280px" class="text-center">
              <NuxtLink to="/">
                <img
                  src="@/static/logo-bsbg1-color.svg"
                  alt="BSBG1"
                  width="280px"
                  style="z-index:999"
                  class="mt-1"
                />
              </NuxtLink>
            </td>
            <td width="110px" class="text-right">
              <img
                src="@/static/by-raimundo-lira.svg"
                alt="BSBG1"
                width="100%"
                class="mt-1"
              />
            </td>
          </tr>
        </table> -->
      </div>
      <v-card tile color="#ff0000">
        <div class="container">
          <v-tabs height="25" dark background-color="transparent" show-arrows>
            <v-tabs-slider color="teal lighten-3"></v-tabs-slider>
            <v-tab :to="{ name: 'index'}">HOME</v-tab>
            <v-tab v-for="item in menuCategories" :key="item.id" :to="{ name: 'category', params: { category: item.slug} }">{{item.title}}</v-tab>
          </v-tabs>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavTop",
  props: ["categories", "menuCategories"],

  computed: {
    drawerState() {
      return this.$store.state.sidebar.drawerState;
    },
  },

  data() {
    return {
      dialog: false,
      sticky: false,
      inputKeywords: "",
      inputKeywordsMenu: "",
      dateStart: "2010-01-01",
      dateFinish: "2020-05-02",
      dateNow: "",
      errorValidate: false,
      disabledButton: true,
      activeDark: false,
      keywordSearch: "",
      dialogSearch: false,
      textExact: "no",
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    };
  },

  methods: {
    allowedDates: (val) => parseInt(val.split("-")[2], 10) % 2 === 0,

    handleScroll() {
      this.sticky = window.scrollY >= 120 ? true : false;
    },

    alternateDrawer() {
      this.$store.dispatch("sidebar/SET_DRAWER", !this.drawerState);
    },
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll);

    var dateNow = new Date();
    var year = dateNow.getFullYear();
    var month = dateNow.getMonth() + 1;
    var day = dateNow.getDate();
    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;
    this.dateFinish = year + "-" + month + "-" + day;

    this.dateNow = day + "/" + month + "/" + year;
  },
};
</script>

<style scoped>
button > .icon {
  font-size: 1.5em;
}

#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}
.datenow {
  font-size: 0.6em;
  font-weight: 300;
}

.top-header {
  background-color: #fff;
}
.shadow {
  background-color: #fff;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.4);
}
.top-fixed {
  position: fixed;
  z-index: 9999;
  width: 100%;
}
</style>
