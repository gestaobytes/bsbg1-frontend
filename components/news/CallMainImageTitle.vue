<template>
  <div :fontData=fontData>
    <v-lazy
      :v-model="lazyData"
      :options="{ threshold: 0.8 }"
      transition="fade-transition"
    >
      <NuxtLink
      class="tr-lasts-posts"
      :fontData="fontData"
      :to="{name: 'category-slug', params: {category: fontData.slugCategory, slug: fontData.slug  } }"
    >
      <v-card>
        <v-img
          v-if="$vuetify.breakpoint.md"
          :src="storage + '/thumbs/' + fontData.image"
          class="white--text align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="230px"
        >
        <div class="title-card pa-4">{{fontData.titleadapter}}</div>
          <!-- <v-card-title>{{fontData.titleadapter}}</v-card-title> -->
        </v-img>
        <v-img
          v-else-if="$vuetify.breakpoint.sm"
          :src="storage + '/thumbs/' + fontData.image"
          class="white--text align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="350px"
        >
          <div class="title-card pa-4">{{fontData.titleadapter}}</div>
        </v-img>
        <v-img
          v-else
          :src="storage + '/thumbs/' + fontData.image"
          class="white--text align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="290px"
        >
          <div class="title-card pa-4">{{fontData.titleadapter}}</div>
        </v-img>
      </v-card>
    </NuxtLink>
    </v-lazy>
  </div>
</template>



<script>
import { urlStorage } from "@/global";
export default {
  props: ["fontData", "lazyData"],
  data: function () {
    return {
      storage: `${urlStorage}`,
    };
  },
  name: "CallMainImageTitle",
};
</script>
<style scoped>
.title-card {
  line-height: 2rem;
  font-size: 1.5rem !important;
  font-weight: 600;
  color: white;
  font-family: 'Roboto Serif', sans-serif !important;
  text-decoration: none;
}

.title-card :hover {
    background-color: rgb(0, 0, 0, 0.30);
    color: #fff;
    font-weight: 400;
    line-height: 2rem;
}
</style>
