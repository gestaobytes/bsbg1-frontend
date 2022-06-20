<template>
  <div>
    <div class="block-title-category">
      <v-row>
        <v-col cols="12">
          <v-layout class="container">
            <h5 class="ml-3 titles-sharing-tags text-uppercase text--primary mb-1">{{titleCategory}}</h5>
          </v-layout>
        </v-col>
      </v-row>
    </div>

    <v-row class="mt-4">
      <v-col cols="12">
        <v-layout class="container">
          <v-row>
            <v-col cols="12" class="pt-n5">

              <TitleImageListedTags lazyData="true" :fontData="registersOfTable" />

              <div class="text-xs-center mt-5">
                <v-btn
                  color="secondary"
                  block
                  large
                  dark
                  @click="getLoadMore()"
                  class="mt-5 mb-7"
                  v-if="loadMore"
                >CARREGAR MAIS</v-btn>
              </div>
            </v-col>




          </v-row>
        </v-layout>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios'
import { urlPublic, urlApi, urlSite } from '@/global'

import bannersData from "~/components/api/_banners-data";
import callsData from "~/components/api/_calls-data";
import mostAccessedData from "~/components/api/_most-accessed-data";
import TitleImageListedTags from "@/components/designs/titles/TitleImageListedTags";
import MostAccessedWeek from "@/components/news/MostAccessedWeek";
import MostAccessedDay from "@/components/news/MostAccessedDay";

export default {
  mixins: [bannersData, callsData, mostAccessedData],
  components: {
    TitleImageListedTags,
    MostAccessedWeek,
    MostAccessedDay,
  },
  data: function() {
    return {
      urlSite: `${urlSite}`,
      listTags: "",
      tags: "",
      categoryReceive: "",
      urlLocal: "",
      relatedNews: "",
      registersOfTable: [],
      titleCategory: "",
      loadMore: false,
      /** register for pagination */
      page: 1,
      currentPage: 1,
      nextPage: 1,
      count: 0,
      limit: 0,
      paginate: 0,
      qtdRegisters: 0
    };
  },

 methods: {
    loadPostsCategory() {
      axios.get(`${this.url}?page=${this.page}`).then((res) => {
        this.titleCategory = res.data.data[0].category;
        this.registersOfTable = res.data.data;
        this.lastPage = res.data.last_page;
        this.loadMore = this.page < this.lastPage ? true : false;
      });
    },
    getLoadMore() {
      this.page++;
      axios.get(`${this.url}?page=${this.page}`).then((res) => {
        this.registersOfTable = this.registersOfTable.concat(res.data.data);
        this.loadMore = this.page < this.lastPage ? true : false;
      });
    },
  },

  watch: {
    $route() {
      this.url = `${urlPublic}/${this.$route.params.category}`;
      this.urlLocal = `${urlPublic}/${this.$route.params.category}`;
      this.loadPostsCategory();
    },
  },

  mounted() {
    this.url = `${urlPublic}/${this.$route.params.category}`;
    this.urlLocal = `${urlApi}/${this.$route.params.category}`;
    this.categoryReceive = this.$route.params.category;
    this.loadPostsCategory();
  },

  head() {
    return {
      title: this.titleCategory,
      meta: [
        { hid: "description", name: "description", content: "Confira as postagens mais relevantes sobre " + this.titleCategory },
        { hid: "keywords", name: "keywords", content: this.titleCategory + " BSBG1" },

        { property: "twitter:title", content: this.titleCategory + " BSBG1" },
        { property: "og:url", content: this.urlSite },
        { property: "twitter:url", content: this.urlSite },
        { property: "og:title", content: this.titleCategory + " BSBG1" },
        { property: "og:description", content: this.titleCategory + " BSBG1" },
        { property: "twitter:description", content: this.titleCategory + " BSBG1" },
        { property: "article:tag", content: this.titleCategory + " BSBG1" },
      ],
      link: [
        { hid: 'canonical', href: this.urlSite },
      ],
      script: [
        // { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' }
      ],
    };
  },

};
</script>
