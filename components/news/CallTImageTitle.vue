<template>
  
    <div style="background:" :fontData="fontData" :lazyData="lazyData" :retracts="retracts">
      <div class="image-home">
        <v-lazy :v-model="lazyData" :options="{threshold: .1}" transition="fade-transition">
          <!-- <img :src="storageGoogle+folderStorage+fontData.image" /> -->
        </v-lazy>
      </div>
      <p class="retract-lasts-posts mb-n1">{{retracts}}</p>
      <h1 class="title-lasts-posts-secondary-home">{{fontData}}</h1>
    </div>
</template>

<script>
export default {
  props: ["fontData", "lazyData", "retracts"],
  data: function () {
    return {
      storageGoogle: "https://storage.googleapis.com/poptvnews/",
      folderStorage: "thumbs/",
    };
  },
  name: "CallTImageTitle",
};
</script>



















      
