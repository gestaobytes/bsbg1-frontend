<template>
  <table width="100%">
    <div :fontData="fontData" width="100%">
      <router-link
        tag="a"
        class="tl-link"
        :to="{name: 'category-slug', params: {category: fontData.slugCategory, slug: fontData.slug  } }"
      >
        <tr>
          <td>
            <span
              class="retracts-title-light"
              v-if="$vuetify.breakpoint.xl || $vuetify.breakpoint.sm || $vuetify.breakpoint.xs"
            >{{fontData.retracts}}</span>
            <span
              class="retracts-title-light rtl-lg-md"
              v-if="$vuetify.breakpoint.lg || $vuetify.breakpoint.md"
            >{{fontData.retracts}}</span>

            <p
              class="title-light"
              v-if="$vuetify.breakpoint.xl || $vuetify.breakpoint.sm || $vuetify.breakpoint.xs"
            >{{fontData.titleadapter}}</p>
            <p
              class="title-light tl-lg-md"
              v-if="$vuetify.breakpoint.lg || $vuetify.breakpoint.md"
            >{{fontData.titleadapter}}</p>
          </td>
        </tr>
      </router-link>
    </div>
  </table>
</template>

<script>
export default {
  props: ["fontData", "lazyData"],
  name: "TitleLight",
};
</script>
<style>
.title-light {
  font-size: 1em;
  line-height: 1.15em;
  color: black;
  font-weight: 500;
}
.tl-lg-md {
  font-size: 0.75em;
  line-height: 1em;
  color: black;
  font-weight: 600;
}

.retracts-title-light {
  margin-top: 7px;
  margin-bottom: 0px;
  font-size: 1em !important;
  color: #ff0000;
  text-transform: uppercase;
  font-weight: 400;
  font-family: "Roboto", sans-serif !important;
  text-decoration: none;
}
.rtl-lg-md {
  margin-top: 7px;
  margin-bottom: 0px;
  font-size: 0.75em !important;
  color: #ff0000;
  text-transform: uppercase;
  font-weight: 400;
  font-family: "Roboto", sans-serif !important;
  text-decoration: none;
}

.tl-link {
  text-decoration: none;
  color: #ff0000;
}

.tl-link :hover,
:active {
  color: #ff0000;
}
</style>
