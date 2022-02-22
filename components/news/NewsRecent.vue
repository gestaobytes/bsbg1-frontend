<template>
  <div :fontData="fontData">
    <v-row class="py-4">
      <v-col cols="12" sm="6" v-for="(item, i) in fontData" :key="i">
        <NuxtLink
          :to="{
            name: 'noticias-id-slug',
            params: {
              id: item.id,
              slug: item.slug,
            },
          }"
        >
          <v-img
            width="100%"
            :height="imgSize"
            :src="storage + item.images[0].src"
            :alt="item.title"
            :title="item.title"
          />

          <p class="text-uppercase it mt-3" color="#757575">
            <span v-if="item.intertitle != ''">
              {{ item.intertitle }}
            </span>
            <span v-else>EDITORIA</span>
          </p>
          <h2 class="tm text--primary mt-n4 mb-n2">{{ item.title }}</h2>
        </NuxtLink>
      </v-col>
    </v-row>


    <v-btn block color="#38969f" class="my-10" large dark nuxt to="/noticias">VER TODAS AS NOTÍCIAS</v-btn>
  </div>
</template>

<script>

import { urlStorage } from "@/global";

export default {
  name: "NewsRecent",
  props: ["fontData"],
  data: function () {
    return {
      storage: `${urlStorage}/posts/thumbs/`,
      heightSize: 200,
      colsImg: 4,
      colsTitle: 8,
    };
  },
  computed: {
    qtdColsImg() {
      if (this.$breakpoints.width >= 960 && this.$breakpoints.width <= 1263) {
        return 12;
      } else {
        return this.colsImg;
      }
    },
    qtdColsTitle() {
      if (this.$breakpoints.width >= 960 && this.$breakpoints.width <= 1263) {
        return 12;
      } else {
        return this.colsTitle;
      }
    },
    imgSize() {
      if (this.$breakpoints.xs) {
        return 100;
      }
      if (this.$breakpoints.sm) {
        return 100;
      }
      if (this.$breakpoints.width >= 960 && this.$breakpoints.width <= 1263) {
        return 150;
      }
    },

    // imgSize() {
    //   if (this.$breakpoints.xs) {
    //     return 200;
    //   }
    //   if (this.$breakpoints.width >= 500) {
    //     return 100;
    //   }
    // },
  },
};
</script>

<style scoped>
.it {
  font-size: 0.9rem;
  line-height: 16pt;
  font-weight: 700;
  color: #38969f;
}
.tm {
  font-size: 1.2rem;
  font-weight: 300;
}

.tb-news {
  margin-bottom: 10px;
  border: 1px solid #38969f;
  border-radius: 15px;
}
.link-news:hover {
  background-color: #e9f3f5;
}
.lines-division {
  margin-bottom: 10px;
  border-top: 1px solid #38969f;
}
</style>
