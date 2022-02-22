<template>
  <v-carousel
    :height="isXs ? '420' : isSm ? '300' : isMd ? '300' : isLg ? '320' : '370'"
    hide-delimiters
    elevation="2"
  >
    <v-carousel-item
      :height="
        isXs ? '400' : isSm ? '280' : isMd ? '280' : isLg ? '300' : '350'
      "
      v-for="(item, i) in banners"
      :key="i"
    >
      <v-sheet :color="item.color" tile>
        <div class="container">
          <v-img
            :height="
              isXs ? '400' : isSm ? '280' : isMd ? '280' : isLg ? '300' : '350'
            "
            aspect-ratio="2"
            :src="item.src"
          />
        </div>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>



<script>

import { urlStorage } from "@/global";
export default {
  props: ["fontData", "lazyData"],
  data: function () {
    return {
      storage: `${urlStorage}/thumbs/`,
    };
  },
  name: "BannerNews",

  data: function () {
    return {
      model: 0,
      banners: [
        { src: require("@/static/banners/pmw-refis.gif") },
        { src: require("@/static/banners/pmw.jpg") },
        { src: require("@/static/banners/pmw.png") },
      ],
    };
  },

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
  },
};


</script>
