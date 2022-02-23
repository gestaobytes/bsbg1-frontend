<template>
  <div>

    <div class="block-title-category">
      <v-row>
        <v-col cols="12">
          <v-layout class="container">
            <h5 class="ml-3 titles-sharing-tags text-uppercase text--primary mb-1">
              {{ article.category }}
            </h5>
          </v-layout>
        </v-col>
      </v-row>
    </div>

    <div class="container">

      <v-row class="mt-4">
        <v-col xs="12" sm="12" md="6" lg="6" xl="6" cols="12" class="text-center" v-if="load">
          <v-progress-circular  width="3" size="200" color="amber" indeterminate />
        </v-col>

        <v-col xs="12" sm="12" md="6" lg="6" xl="6" cols="12" v-else>

          <div class="posts-articles">
            <h5 class="retracts mb-n1">{{ article.retracts }}</h5>

            <h1 class="title-post text--primary">{{ article.titleadapter }}</h1>
            <h2 class="subtitle-post mt-3 text--primary">{{ article.subtitle }}</h2>

            <h5 class="title-sharing my-10">
              <ButtonSharing :urlLocal="urlComplete" socialMedia="facebook" />
              <ButtonSharing :urlLocal="urlComplete" :title="article.title" :subtitle="article.subtitle" socialMedia="twitter" />
              <ButtonSharing :urlLocal="urlComplete" socialMedia="linkedin" />
              <ButtonSharing :urlLocal="urlComplete" socialMedia="whatsapp" />
            </h5>

            <div class="mt-5 mb-5" justify="center" v-if="article.image">
              <div class="image-post" justify="center">
                <span class="credit text--primary">{{ article.image_credit }}</span>
                <br v-if="article.image_credit" />
                <img v-if="!$vuetify.breakpoint.xs" :src="storage+'/photos/'+article.image" />
                <img v-else :src="storage+'/thumbs/'+article.image" />
                <br v-if="article.image_subtitle" />
                <span v-if="article.image_subtitle" class="legend text--primary">{{article.image_subtitle}}</span>
              </div>
            </div>

            <div>

              <p class="grey--text">
                <i class="far fa-calendar-alt"></i>
                {{article.date_start | dateBRL}}
              </p>

              <div class="video-container text-post text--primary" v-html="article.text"></div>
              <div class="mt-2 mb-10">
                <h5 class="title-sharing">
                  <ButtonSharing :urlLocal="urlComplete" socialMedia="facebook" />
                  <ButtonSharing :urlLocal="urlComplete" :title="article.title" :subtitle="article.subtitle" socialMedia="twitter" />
                  <ButtonSharing :urlLocal="urlComplete" socialMedia="linkedin" />
                  <ButtonSharing :urlLocal="urlComplete" socialMedia="whatsapp" />
                </h5>
              </div>

              <div class="mb-5 mt-5">
                <table>
                  <tr>
                    <td v-for="reaction in reactions" :key="reaction.id" class="td-reactions" @click="pollReactionPost(reaction.id)">
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <span v-html="reaction.emoction" v-on="on"></span>
                        </template>
                        <span>{{ reaction.slug }}</span>
                      </v-tooltip>

                      <b v-for="reactionpost in reactionPost" :key="reactionpost.id">
                        <span v-if="reaction.id === reactionpost.reaction_id">
                          <b class="quant-votes text--primary">{{reactionpost.votes}}</b>
                        </span>
                      </b>
                    </td>
                  </tr>
                </table>
              </div>
            </div>

          </div> <!-- posts-articles -->

        </v-col>

        <!-- divisão -->
        <v-col lg="1" xl="1" v-if="$vuetify.breakpoint.lg || $vuetify.breakpoint.xl" cols="12">
          <div class="box"></div>
          <div class="box linha-vertical"></div>
        </v-col>

        <v-col xs="12" sm="6" md="3" lg="4" xl="4" cols="12">


          <!-- <TitlePage
            title="NOTÍCIAS"
            titleDestak="RECENTES"
            class="intertitle mt-10 mb-n7"
          />
          <NewsRecent :fontData="recentNews" /> -->




          <div class="ads">
            <TitleIcon title="As Mais Lidas" />
            <hr class="hr-home mt-4 mb-4" />
            <div style="clear: both"></div>
            <div class="mt-8 div-lasts" v-if="mostAccessedWeek != ''">
              <MostAccessedWeek lazyData="false" :fontData="mostAccessedWeek" />
            </div>
          </div>
        </v-col>

        <!-- <div class="mb-5" style="clear: both">
            <AdBanners lazyData="false" :fontData="banner03" />
          </div> -->
      </v-row>

    </div>

  </div>
</template>


<script>
import axios from "axios";
import { urlPublic, urlSite, urlStorage } from "@/global";

import bannersData from "~/components/api/_banners-data";
import callsData from "~/components/api/_calls-data";
import mostAccessedData from "~/components/api/_most-accessed-data";

import CallTitleTerciary from "~/components/news/CallTitleTerciary.vue";
import CallTitleSecondary from "~/components/news/CallTitleSecondary.vue";
import CallTitleLight from "~/components/news/CallTitleLight.vue";
import CallTitleImageTerciary from "~/components/news/CallTitleImageTerciary.vue";
import CallTitleImageSecondary from "~/components/news/CallTitleImageSecondary.vue";
import CallTitleImageLight from "~/components/news/CallTitleImageLight.vue";
import CallTitleImage from "~/components/news/CallTitleImage.vue";
import CallTitle from "~/components/news/CallTitle.vue";
import CallMainImageTitle from "~/components/news/CallMainImageTitle.vue";
import CallImageTitleWhite from "~/components/news/CallImageTitleWhite.vue";
import CallImageTitleSecondary from "~/components/news/CallImageTitleSecondary.vue";
import CallImageTitle from "~/components/news/CallImageTitle.vue";
import CallBoxEspecial from "~/components/news/CallBoxEspecial.vue";

import MostAccessedWeek from "@/components/news/MostAccessedWeek";
import MostAccessedDay from "@/components/news/MostAccessedDay";
import TitleIcon from "@/components/designs/titles/TitleIcon";
import TitleListedNews from "@/components/designs/titles/TitleListedNews";

import ButtonSharing from "@/components/buttons/ButtonSharing.vue";



export default {
  mixins: [bannersData, callsData, mostAccessedData],
  loading: {
    color: 'red',
    height: '7px'
  },

  components: {
    TitleIcon,
    TitleListedNews,
    CallBoxEspecial,
    CallImageTitle,
    CallImageTitleSecondary,
    CallImageTitleWhite,
    CallMainImageTitle,
    CallTitle,
    CallTitleImage,
    CallTitleImageLight,
    CallTitleTerciary,
    CallTitleSecondary,
    CallTitleLight,
    CallTitleImageTerciary,
    CallTitleImageSecondary,
    MostAccessedWeek,
    MostAccessedDay,
    ButtonSharing,
  },

  data: function () {
    return {
      load: '',
      storage: `${urlStorage}`,
      urlSite: `${urlSite}`,
      styleDivPhoto: '',
      reactions:'',
      reactionPost:'',
      urlTags: '',
      metaTags: '',
    };
  },

  head() {
    return {
      title: this.article.title,
      meta: [
        { hid: "description", name: "description", content: this.article.subtitle },
        { hid: "keywords", name: "keywords", content: this.article.tags },

        { property: "twitter:title", content: this.article.titleadapter },
        { property: "og:url", content: this.urlComplete },
        { property: "twitter:url", content: this.urlComplete },
        { property: "og:title", content: this.article.titleadapter },
        { property: "og:description", content: this.article.subtitle },
        { property: "twitter:description", content: this.article.subtitle },
        { property: "article:tag", content: this.article.tags },
        { property: "og:image", content: this.storage+'/photos/' + this.article.image },
        { property: "og:image:secure_url", content: this.storage+'/photos/' + this.article.image },
        { property: "twitter:image", content: this.storage+'/photos/' + this.article.image },
        { property: "twitter:card", content: "summary_large_image" },
      ],
      link: [
        { hid: 'canonical', href: this.urlComplete },
      ],
      script: [
        // { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' }
      ],
    };
  },


  async asyncData({ params, $axios }) {
    let response = await $axios.$get(`public/${params.category}/${params.slug}`);
    var tags = response.tags;
    tags = tags.split(",");
    tags = Array.from(tags);

    return {
      article: response.article,
      tags: tags,
      relatedNews: response.relatedNews,
      urlComplete: `https://www.bsbg1.com.br/${params.category}/${params.slug}`,
      load: false,
    };

},


  methods: {
    loadReactions() {
       axios.get(`${urlPublic}/reactions`).then((res) => {
          this.reactions = res.data;
        });
        this.loadReactionsPost();
    },

    loadReactionsPost() {
      axios
        .get(`${urlPublic}/reaction/post/${this.article.id}`)
        .then((res) => {
          this.reactionPost = res.data;
        });
    },

    pollReactionPost(item) {
      axios["post"](
        `${urlPublic}/post/${this.article.id}/reaction/${item}`
      ).then(() => {
        this.loadReactionsPost();
      });
    },

    slugCaracter(urlTags) {
      var slug = "";
      var titleLower = urlTags.toLowerCase();
      slug = titleLower.trim();
      slug = slug.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ|&/gi, "e");
      slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, "a");
      slug = slug.replace(/i|ì|í|î|ï/gi, "i");
      slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, "o");
      slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, "u");
      slug = slug.replace(/$/gi, "");
      slug = slug.replace(/c|ç/gi, "c");
      slug = slug.replace(/n|ñ/gi, "n");
      slug = slug.replace(/đ/gi, "d");
      slug = slug.replace(/\s+/g, "-");
      return slug;
    },

    keywords() {
      const tags = this.article.tags;
      this.tags = tags.split(",");
      this.tags = tags.split(":");
      this.tags = tags.split(";");
      this.tags = tags.split("|");
      this.tags = tags.split("/");
    },
  },
  mounted() {
    this.load = false;
    this.loadReactions();
  },
};
</script>


<style>
.title-post {
  font-size: 2rem;
  font-weight: 600;
}
.subtitle-post {
  font-size: 1.3rem;
  font-weight: 400;
}
.text-post {
  font-size: 0.5rem;
  font-weight: 300;
}
</style>
