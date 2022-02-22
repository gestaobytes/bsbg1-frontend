<template>
    <table width="100%">
      <div v-for="(lastest) in fontData" :fontData="fontData" :key="lastest.id" width="100%">
        <router-link
          tag="a"
          class="tr-lasts-posts pt-3"
          :to="{name: 'category-slug', params: {category: `${lastest.slugCategory}`, slug: `${lastest.slug}` } }"
        >
          <tr>
            <td width="98%">
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
            </td>
          </tr>
        </router-link>
      </div>
    </table>
</template>

<script>
export default {
  props: ["fontData", "lazyData"],
  name: "TitleListedNews",
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
</style>
