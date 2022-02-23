<template>
  <table width="100%" v-if="mostAccessedDay!='' && mostAccessedDay!=[] && mostAccessedDay!={} ">
    <TitleIcon icon="fa fa-star" title="TOP's do Dia" />
    <div v-for="(lastest, index) in mostAccessedDay" :key="lastest.id" width="100%">
      <NuxtLink
         class="tr-lasts-posts pt-3"
        :to="{ name: 'category-slug', params: { category: lastest.slugCategory, slug: lastest.slug } }" >
        <tr>
          <td width="10px">
            <v-avatar color="#a80017" size="30" class="mt-2 mr-2">
              <span class="white--text">{{ index + 1 }}º</span>
            </v-avatar>
          </td>
          <td width="98%">
            <span class="retracts-most-accessed" v-if="$vuetify.breakpoint.xl || $vuetify.breakpoint.sm || $vuetify.breakpoint.xs">
              {{ lastest.retracts }}
            </span>
            <span class="retracts-most-accessed-lg-md" v-if="$vuetify.breakpoint.lg || $vuetify.breakpoint.md" >
              {{ lastest.retracts }}
            </span>
            <p class="title-most-accessed text--primary" v-if="$vuetify.breakpoint.xl || $vuetify.breakpoint.sm || $vuetify.breakpoint.xs">
              {{ lastest.titleadapter }}
            </p>
            <p class="title-most-accessed-lg-md text--primary" v-if="$vuetify.breakpoint.lg || $vuetify.breakpoint.md">
              {{ lastest.titleadapter }}
            </p>
          </td>
        </tr>
      </NuxtLink>
    </div>
  </table>
</template>

<script>
import axios from "axios";
import { urlPublic } from "@/global";
import TitleIcon from "@/components/designs/titles/TitleIcon";

export default {
  name: "MostAccessedDay",
  components: {
    TitleIcon,
  },

  data: function () {
    return {
      mostAccessedDay: [],
    };
  },

  methods: {
    loadMostAccessedDay() {
      axios.get(`${urlPublic}/most-accessed-day`).then((res) => {
        if (res != "undefined" && res != "" && res != [] && res != {}) {
          this.mostAccessedDay = res.data;
        } else {
          this.mostAccessedDay = [];
        }
      });
    },
  },

  mounted() {
    this.loadMostAccessedDay();
  },
};
</script>

<style>
.title-most-accessed {
  font-size: 1em;
  line-height: 1.15em;
  color: black;
  font-weight: 500;
}
.title-most-accessed-lg-md {
  font-size: 0.75em;
  line-height: 1em;
  color: black;
  font-weight: 600;
}
.retracts-most-accessed {
  margin-top: 7px;
  margin-bottom: 0px;
  font-size: 1em !important;
  color: #a80017;
  text-transform: uppercase;
  font-weight: 400;
  font-family: "Roboto", sans-serif !important;
  text-decoration: none;
}
.retracts-most-accessed-lg-md {
  margin-top: 7px;
  margin-bottom: 0px;
  font-size: 0.75em !important;
  color: #a80017;
  text-transform: uppercase;
  font-weight: 400;
  font-family: "Roboto", sans-serif !important;
  text-decoration: none;
}
</style>
