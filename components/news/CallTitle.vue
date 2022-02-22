<template>
    <NuxtLink
      
      class="tr-lasts-posts"
      :fontData="fontData"
      :to="{ name: 'category-slug', params: { category: `${fontData.slugCategory}`, slug: `${fontData.slug}`  } }"
    >
      <div style="background:">
        <p class="retract-lasts-posts mb-n1 mt-n2">{{fontData.retracts}}</p>
        <h1 class="title-lasts-posts text--primary">{{fontData.titleadapter}}</h1>
      </div>
    </NuxtLink>
</template>

<script>
export default {
  props: ["fontData", "lazyData"],
  name: "CallTitle"
};
</script>



















      
