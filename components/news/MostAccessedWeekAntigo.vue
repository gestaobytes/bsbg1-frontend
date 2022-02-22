<template>
  <div class="main-container" v-if="mostAccessedWeek != ''">
    <div
      class="grid-container"
      v-for="lastest in mostAccessedWeek"
      :key="lastest.id"
    >
    <br/>
      <div class="card card--horizontal">
        <NuxtLink
          class="tr-lasts-posts pt-3"
          :to="{
            name: 'category-slug',
            params: { category: lastest.slugCategory, slug: lastest.slug },
          }"
        >
          <div class="card__side-by-side">
            
            <div class="card__image flex items-center">
              <v-lazy
                :v-model="lazyData"
                :options="{ threshold: 0.1 }"
                transition="fade-transition"
              >
                <img
                  v-if="lastest.image != 'undefined' && lastest.image != ''"
                  :src="storage + lastest.image"
                />
              </v-lazy>
            </div>
            <div class="card__content">
              <p class="retract-lasts-posts mb-n1 mt-n2">
                {{ lastest.retracts }}
              </p>
              <h1 class="title-lasts-posts text--primary">
                {{ lastest.titleadapter }}
              </h1>
            </div>

          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { urlPublic } from "@/global";
import TitleIcon from "@/components/designs/titles/TitleIcon";

export default {
  name: "MostAccessedWeek",
  components: {
    TitleIcon,
  },

  data: function () {
    return {
      mostAccessedWeek: [],
    };
  },

  methods: {
    loadMostAccessedWeek() {
      axios.get(`${urlPublic}/most-accessed-week`).then((res) => {
        if (res != "undefined") {
          this.mostAccessedWeek = res.data;
        }
      });
    },
  },

  mounted() {
    this.loadMostAccessedWeek();
  },
};
</script>

<style>
  
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
