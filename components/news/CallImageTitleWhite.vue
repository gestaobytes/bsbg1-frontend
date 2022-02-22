<template>
  <NuxtLink
    class="tr-lasts-posts"
    :fontData="fontData"
    :to="{ name: 'category-slug', params: { category: `${fontData.slugCategory}`, slug: `${fontData.slug}`  } }"
  >
    <div style="background:">
      <p class="retract-lasts-posts mb-1 white--text">{{fontData.retracts}}</p>
      <div class="image-home">
        <v-lazy :v-model="lazyData" :options="{threshold: .1}" transition="fade-transition">
          <img v-if="fontData.image!='undefined' && fontData.image!=''" :src="storage+fontData.image" />
        </v-lazy>
      </div>
      <h1 class="title-lasts-posts-secondary-home white--text mt-3">{{fontData.titleadapter}}</h1>
    </div>
  </NuxtLink>
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
  name: "CallImageTitleWhite",
};
</script>
