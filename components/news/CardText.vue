<template>
  <div class="main-container">
    <div class="grid-container">
      <div class="card card--horizontal">
        <div class="card__side-by-side">
          <div class="card__image flex items-center ">
            <v-lazy
              :v-model="lazyData"
              :options="{ threshold: 0.1 }"
              transition="fade-transition"
            >
              <img
                v-if="fontData.image != 'undefined' && fontData.image != ''"
                :src="storage + fontData.image"
              />
            </v-lazy>
          </div>
          <div class="card__content">
            <p class="retract-lasts-posts mb-n1 mt-n2">
              {{ fontData.retracts }}
            </p>
            <h1 class="title-lasts-posts text--primary">
              {{ fontData.titleadapter }}
            </h1>
          </div>
        </div>
      </div>
    </div>
  </div>
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
  name: "CardText",
};
</script>

<style scoped>
.grid-container {
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, 12.8rem);
  
}
.card__image {
  height: 100%;
  max-height: 100%;
  width: 100%;
  display: flex;
}
.card__image img {
  height: 100%;
  width: 100%;
  -o-object-fit: cover;
  object-fit: cover;
}
.card__side-by-side {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
}
.card__content {
  padding: 1.6rem;
  font-size: 15px;
}
.card__button:hover {
  border-color: #d099a0;
}
.card--featured {
  grid-row: auto/span 3;
  grid-column: auto/span 2;
}
.card--2x {
  grid-row: auto/span 2;
  grid-column: auto/span 2;
}
.card--vertical {
  grid-row: auto/span 2;
}
.card--horizontal {
  grid-column: auto/span 2;
}
.card--frameless {
  background-color: transparent;
  box-shadow: none;
}
</style>
