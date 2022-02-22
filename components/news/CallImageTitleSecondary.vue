<template>
  <NuxtLink
    
    class="tr-lasts-posts"
    :fontData="fontData"
    :to="{ name: 'category-slug', params: { category: `${fontData.slugCategory}`, slug: `${fontData.slug}`  } }"
    
  >
    <div style="background:">
      <div class="image-home mb-3">
        <v-lazy :v-model="lazyData" :options="{threshold: .1}" transition="fade-transition">
          <img v-if="fontData.image!='undefined' && fontData.image!=''" :src="storage+fontData.image" />
        </v-lazy>
      </div>
      <p class="retract-lasts-posts mb-n1">{{fontData.retracts}}</p>
      <h1 class="title-lasts-posts-secondary-home text--primary">{{fontData.titleadapter}}</h1>
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
  name: "CallImageTitleSecondary",
};
</script>



















      
