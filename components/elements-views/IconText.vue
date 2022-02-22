<template>
  <v-card
    shaped
    tile
    elevation="0"
    color="rgb(0,0,0, 0)"
    :icon="icon"
    :title="title"
    :link="link"
    :to="to"
    :badge="badge"
    class="text-center mx-1"
  >
    <v-badge
      bordered
      color="#0098b0"
      offset-x="20"
      offset-y="10"
      v-if="badge"
      :content="badge"
    >
      <NuxtLink v-if="to && to != ''" :to="to">
        <p primary class="icon mb-1"><i :class="icon"></i></p>
        <p primary class="label-icon">{{ title }}</p>
      </NuxtLink>
      <a v-if="link && link != ''" :href="link" target="_blank">
        <p primary class="icon mb-n1"><i :class="icon"></i></p>
        <p primary class="label-icon">{{ title }}</p>
      </a>
    </v-badge>

    <div v-else>
      <NuxtLink v-if="to && to != ''" :to="to">
        <p primary class="icon mb-n1"><i :class="icon"></i></p>
        <p primary class="label-icon">{{ title }}</p>
      </NuxtLink>
      <a v-if="link && link != ''" :href="link" target="_blank">
        <p primary class="icon mb-n1"><i :class="icon"></i></p>
        <p primary class="label-icon">{{ title }}</p>
      </a>
    </div>
  </v-card>
</template>

<script>

export default {
  name: "IconText",
  props: ["icon", "title", "subtitle", "link", "to", "badge"],
};
</script>
<style scoped>
.label-icon {
  color: white;
  font-weight: 400;
  font-size: 0.5em;
}
.icon {
  color: white;
  font-weight: 600;
  font-size: 1em;
}
</style>
