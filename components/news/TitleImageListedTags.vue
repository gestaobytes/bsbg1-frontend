<template>
  <table width="100%">
    <tr
      class="pa-3 tr-lasts-posts mb-3"
      v-for="(lastest) in fontData"
      :fontData="fontData"
      :key="lastest.id"
    >
      <router-link
        tag="a"
        style="text-decoration:none"
        :to="{name: 'category-slug', params: {category: `${lastest.slugCategory}`, slug: `${lastest.slug}` } }"
      >
        <td
          style="display: table-cell; vertical-align:top;"
          v-if="!$vuetify.breakpoint.xs && lastest.image!='' && lastest.image!=null"
          width="160px"
          class="pa-2"
        >
          <v-lazy :v-model="lazyData" :options="{threshold: .1}" transition="fade-transition">
            <img width="100%" :src="storageGoogle+folderStorage+lastest.image" />
          </v-lazy>
        </td>

        <td style="display: table-cell; vertical-align:top;" class="pa-2">
          <v-lazy :v-model="lazyData" :options="{threshold: .1}" transition="fade-transition">
            <img
              class="mb-1"
              v-if="$vuetify.breakpoint.xs && lastest.image!='' && lastest.image!=null"
              width="100%"
              :src="storageGoogle+folderStorage+lastest.image"
            />
          </v-lazy>
          <span
            class="retracts-most-accessed"
            v-if="$vuetify.breakpoint.xl || $vuetify.breakpoint.sm || $vuetify.breakpoint.xs"
          >{{lastest.retracts}}</span>
          <span
            class="retracts-most-accessed-lg-md"
            v-if="$vuetify.breakpoint.lg || $vuetify.breakpoint.md"
          >{{lastest.retracts}}</span>

          <p
            class="title-most-accessed"
            v-if="$vuetify.breakpoint.xl || $vuetify.breakpoint.sm || $vuetify.breakpoint.xs"
          >{{lastest.titleadapter}}</p>
          <p
            class="title-most-accessed-lg-md"
            v-if="$vuetify.breakpoint.lg || $vuetify.breakpoint.md"
          >{{lastest.titleadapter}}</p>
          <p v-if="!$vuetify.breakpoint.md" class="tilt-subtitle mt-n3">{{lastest.subtitle}}</p>

          <p class="tilt-tags mt-n3 mb-0" v-if="lastest.tags!=''">#{{lastest.tags}}</p>
        </td>
      </router-link>
    </tr>
  </table>
</template>

<script>
export default {
  props: ["fontData", "lazyData"],
  name: "TitleImageListedTags",
  data: function () {
    return {
      storageGoogle: "https://storage.googleapis.com/bsbg1/",
      folderStorage: "thumbs/",
    };
  },
};
</script>
<style>
.title-most-accessed {
  font-size: 1.2em;
  line-height: 1.3em;
  color: black;
  font-weight: 500;
}
.title-most-accessed-lg-md {
  font-size: 1em;
  line-height: 1.1em;
  color: black;
  font-weight: 550;
}
.retracts-most-accessed {
  margin-top: 7px;
  margin-bottom: 0px;
  font-size: 1em !important;
  color: #ff0000;
  text-transform: uppercase;
  font-weight: 400;
  font-family: "Roboto", sans-serif !important;
  text-decoration: none;
}
.retracts-most-accessed-lg-md {
  margin-top: 7px;
  margin-bottom: 0px;
  font-size: 0.75em !important;
  color: #ff0000;
  text-transform: uppercase;
  font-weight: 400;
  font-family: "Roboto", sans-serif !important;
  text-decoration: none;
}
.tilt-subtitle {
  font-size: 0.9em;
  line-height: 1em;
  color: black;
  font-weight: 350;
}
.tilt-tags {
  font-size: 0.9em;
  line-height: 1em;
  color: #ff0000;
  font-weight: 350;
}
</style>
