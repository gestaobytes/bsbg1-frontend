<template>
  <table width="100%" v-if="mostAccessedWeek!=''">
    <div v-for="(lastest) in mostAccessedWeek" :key="lastest.id" width="100%">
      <NuxtLink
         class=""
        :to="{ name: 'category-slug', params: { category: lastest.slugCategory, slug: lastest.slug } }" >
        <tr>
          <td width="98%">
            <p class="text--primary" v-if="$vuetify.breakpoint.xl || $vuetify.breakpoint.sm || $vuetify.breakpoint.xs">
              {{ lastest.titleadapter }}
            </p>
            <p class="text--primary" v-if="$vuetify.breakpoint.lg || $vuetify.breakpoint.md">
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
  name: "MostAccessedWeek",
  components: {
    TitleIcon,
  },

  data: function () {
    return {
      mostAccessedWeek: [],
    };
  },

  methods: {
    loadMostAccessedWeek() {
      axios.get(`${urlPublic}/most-accessed-week`).then((res) => {
        if (res != "undefined") {
          this.mostAccessedWeek = res.data;
        }
      });
    },
  },

  mounted() {
    this.loadMostAccessedWeek();
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

hr {
  display: block;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-left: auto;
  margin-right: auto;
  border-style: inset;
  border-width: 1px;
  height:2px;
  color:gray;
  background-color:gray;
}
</style>
