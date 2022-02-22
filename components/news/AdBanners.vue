<template>
  <div :fontData="fontData">
    <v-lazy
      :v-model="lazyData"
      :options="{ threshold: 0.8 }"
      transition="fade-transition"
      v-if="fontData"
    >
      <div class="ads">
        <v-layout row>
          <v-flex>
            <a class="mt-3" :href="fontData.url">
              <v-lazy
                :v-model="lazyData"
                :options="{ threshold: 0.1 }"
                transition="fade-transition"
              >
                <div class="mb-n5" v-html="fontData.image"></div>
              </v-lazy>
            </a>
          </v-flex>
        </v-layout>
      </div>
    </v-lazy>
  </div>
</template>

<script>
import { urlStorage } from "@/global";
export default {
  props: ["fontData", "lazyData"],
  data: function () {
    return {
      storage: `${urlStorage}/banners/`,
    };
  },
  name: "AdBanners",
};
</script>


<style scoped>

.ads{
  padding: 1.5em 1.5em 2em 1.5em;
  background:#f4f7ff;
  background-position-x: initial;
  background-position-y: initial;
  background-size: initial;
  background-repeat-x: initial;
  background-repeat-y: initial;
  background-attachment: initial;
  background-origin: initial;
  background-clip: initial;
}

.ads img {
  width: 100%;
}

.ads span{
  font-size: 0.5em;
  color: darkgray;
  margin-top: 0.5em;
}
</style>

