<template>
  <div>
    <div class="container">
      <v-row>
        <v-col cols="12" sm="12" md="8" lg="6" class="px-5">
          <v-card class="pa-7">
            <CallImageTitleAndSubtitle
              lazyData="false"
              :retracts="post[0]"
              :fontData="post[0]"
              v-if="post[0]"
            />
          </v-card>
        </v-col>

        <v-col class="px-5" cols="12" sm="6" md="4" lg="3">
          <div class="mb-7">
            <!-- width="320" height="240" controls="controls" autoplay="autoplay" -->
            <video controls width="100%" autoplay loop muted>
              <source src="@/static/san-marco-hotel.mp4" type="video/mp4" />
              <object>
                <embed src="@/static/san-marco-hotel.mp4" />
              </object>
            </video>

            <!-- <video controls poster="@/static/bg-ads.png">
              <source src="@/static/san-marco-hotel.mp4" type="video/mp4">
              <object>
                <embed src="@/static/san-marco-hotel.mp4" type="application/x-shockwave-flash" 
                allowfullscreen="false" allowscriptaccess="always">  		
              </object>
              Formato não suportado  
            </video> -->

            <!-- <AdBanners lazyData="false" :fontData="banners[0]" v-if="banners[0]" /> -->
          </div>
          <!-- <CallImageTitle
            lazyData="false"
            :retracts="post[1]"
            :fontData="post[1]"
            v-if="post[1]"
          /> -->
        </v-col>

        <v-col class="px-5" cols="12" sm="6" md="4" lg="3">
          <div class="card-border mb-7 pt-4 pb-3">
            <CallTitle
              lazyData="false"
              :retracts="post[2]"
              :fontData="post[2]"
              v-if="post[2]"
            />
          </div>

          <CallImageTitle
            lazyData="false"
            :retracts="post[3]"
            :fontData="post[3]"
            v-if="post[3]"
          />
        </v-col>

        <v-col class="px-5" cols="12" sm="6" md="4" lg="3">
          <CallImageTitle
            lazyData="false"
            :retracts="post[4]"
            :fontData="post[4]"
            v-if="post[4]"
          />
          <hr class="hr-home mt-4 mb-4" />
          <div class="mt-5">
            <AdBanners
              lazyData="false"
              :fontData="banners[1]"
              v-if="banners[1]"
            />
          </div>
        </v-col>

        <v-col class="px-5" cols="12" sm="6" md="4" lg="3">
          <CallImageTitle
            lazyData="false"
            :retracts="post[5]"
            :fontData="post[5]"
            v-if="post[5]"
          />
          <hr class="hr-home mt-4 mb-4" />
          <div class="mt-5">
            <CallTitle
              lazyData="false"
              :retracts="post[6]"
              :fontData="post[6]"
              v-if="post[6]"
            />
          </div>
        </v-col>

        <v-col
          class="px-5"
          cols="12"
          sm="6"
          md="3"
          lg="3"
          v-if="!$vuetify.breakpoint.lg || !$vuetify.breakpoint.xl"
        >
          <div class="mb-5">
            <AdBanners
              lazyData="false"
              :fontData="banners[2]"
              v-if="banners[2]"
            />
          </div>

          <CallImageTitle
            lazyData="false"
            :retracts="post[7]"
            :fontData="post[7]"
            v-if="post[7]"
          />
        </v-col>

        <v-col
          class="px-5"
          cols="12"
          sm="6"
          md="3"
          lg="3"
          xl="2"
          v-if="!$vuetify.breakpoint.lg || !$vuetify.breakpoint.xl"
        >
          <CallImageTitle
            lazyData="false"
            :retracts="post[8]"
            :fontData="post[8]"
            v-if="post[8]"
          />
          <hr class="hr-home mt-4 mb-4" />
          <div class="mt-5">
            <CallTitle
              lazyData="false"
              :retracts="post[9]"
              :fontData="post[9]"
              v-if="post[9]"
            />
          </div>
        </v-col>
      </v-row>

      <v-row>
        <!-- essa coluna será exibida somente se diferente de SM.
        Atenção para a 5 coluna, deve ser o mesmo banner -->
        <v-col
          class="px-5"
          xs="12"
          md="4"
          lg="3"
          xl="2"
          cols="12"
          v-if="!$vuetify.breakpoint.sm"
        >
          <AdBanners
            lazyData="false"
            :fontData="banners[0]"
            v-if="banners[0]"
          />
        </v-col>

        <v-col sm="12" md="8" lg="6" xl="4" cols="12" class="px-5">
          <CallMainImageTitle
            lazyData="false"
            :fontData="post[10]"
            v-if="post[10]"
          />
        </v-col>
        <!-- essa coluna será exibida somente se for SM.
        A razão, é pra colocar os banners lado a lado -->
        <v-col class="px-5" sm="6" cols="12" v-if="$vuetify.breakpoint.sm">
          <AdBanners
            lazyData="false"
            :fontData="banners[1]"
            v-if="banners[1]"
          />
        </v-col>

        <v-col class="px-5" sm="6" md="4" lg="3" xl="2" cols="12">
          <AdBanners
            lazyData="false"
            :fontData="banners[3]"
            v-if="banners[3]"
          />
        </v-col>

        <v-col
          class="px-5"
          sm="6"
          md="4"
          lg="3"
          xl="2"
          cols="12"
          v-if="!$vuetify.breakpoint.lg"
        >
          <CallTitleImage
            lazyData="false"
            :fontData="post[11]"
            v-if="post[11]"
          />
        </v-col>

        <v-col
          class="px-5"
          sm="6"
          md="4"
          lg="3"
          xl="2"
          cols="12"
          v-if="!$vuetify.breakpoint.lg"
        >
          <hr class="hr-home mt-5 mb-5" v-if="$vuetify.breakpoint.xs" />
          <CallTitleImage
            lazyData="false"
            :fontData="post[12]"
            v-if="post[12]"
          />
        </v-col>
      </v-row>

      <v-row class="mt-5">
        <v-col sm="12" md="4" lg="6" xl="4" cols="12" class="px-5">
          <v-card class="pa-5">
            <CallImageTitle
              lazyData="false"
              :fontData="post[14]"
              v-if="post[14]"
            />

            <hr class="hr-home mt-5 mb-10" />
            <CallText :fontData="post[15]" v-if="post[15]" />
          </v-card>
        </v-col>

        <v-col sm="6" md="4" lg="3" xl="2" cols="12">
          <v-card class="pa-5" color="#003399" elevation="0" dark>
            <CallImageTitle
              lazyData="false"
              :fontData="post[16]"
              v-if="post[16]"
            />
            <hr class="hr-home mt-5 mb-10" />
            <CallText :fontData="post[17]" v-if="post[17]" />
          </v-card>
        </v-col>

        <v-col class="px-5" sm="6" md="4" lg="3" xl="2" cols="12">
          <AdBanners
            lazyData="false"
            :fontData="banners[4]"
            v-if="banners[4]"
          />
          <hr class="hr-home mt-7 mb-7" />
          <CallText :fontData="post[18]" v-if="post[18]" />
          <hr class="hr-home mt-5 mb-7" />
          <CallText :fontData="post[19]" v-if="post[19]" />
        </v-col>

        <v-col
          class="px-5"
          xs="12"
          sm="6"
          md="3"
          lg="3"
          xl="2"
          cols="12"
          v-if="
            $vuetify.breakpoint.xs ||
            $vuetify.breakpoint.sm ||
            $vuetify.breakpoint.xl
          "
        >
          <hr class="hr-home mt-n1 mb-5" v-if="$vuetify.breakpoint.xs" />
          <CallTitleImage
            lazyData="false"
            :fontData="post[20]"
            v-if="post[20]"
          />
          <hr class="hr-home mt-6 mb-6" />
          <CallTitleImage
            lazyData="false"
            :fontData="post[21]"
            v-if="post[21]"
          />
        </v-col>
        <v-col
          class="px-5"
          xs="12"
          sm="6"
          md="3"
          lg="3"
          xl="2"
          cols="12"
          v-if="
            $vuetify.breakpoint.xs ||
            $vuetify.breakpoint.sm ||
            $vuetify.breakpoint.xl
          "
        >
          <hr class="hr-home mt-n1 mb-5" v-if="$vuetify.breakpoint.xs" />
          <CallTitleImage
            lazyData="false"
            :fontData="post[22]"
            v-if="post[22]"
          />
          <hr class="hr-home mt-6 mb-6" />
          <CallTitleImage
            lazyData="false"
            :fontData="post[23]"
            v-if="post[23]"
          />
        </v-col>
      </v-row>
    </div>

    <v-row class="mt-5" style="background: #ff0000">
      <v-col cols="12">
        <div class="container">
          <v-row>
            <v-col class="px-5" sm="6" md="3" lg="3" xl="2" cols="12">
              <hr class="hr-home mt-n5 mb-5" v-if="$vuetify.breakpoint.xs" />
              <CallImageTitleWhite
                lazyData="false"
                :fontData="post[24]"
                v-if="post[24]"
              />
            </v-col>
            <v-col class="px-5" sm="6" md="3" lg="3" xl="2" cols="12">
              <hr class="hr-home mt-n1 mb-5" v-if="$vuetify.breakpoint.xs" />
              <CallImageTitleWhite
                lazyData="false"
                :fontData="post[25]"
                v-if="post[25]"
              />
            </v-col>
            <v-col class="px-5" sm="6" md="3" lg="3" xl="2" cols="12">
              <hr class="hr-home mt-n1 mb-5" v-if="$vuetify.breakpoint.xs" />
              <CallImageTitleWhite
                lazyData="false"
                :fontData="post[26]"
                v-if="post[26]"
              />
            </v-col>
            <v-col class="px-5" sm="6" md="3" lg="3" xl="2" cols="12">
              <hr class="hr-home mt-n1 mb-5" v-if="$vuetify.breakpoint.xs" />
              <CallImageTitleWhite
                lazyData="false"
                :fontData="post[27]"
                v-if="post[27]"
              />
            </v-col>

            <v-col
              class="px-5"
              xs="12"
              sm="6"
              md="3"
              lg="3"
              xl="2"
              cols="12"
              v-if="
                $vuetify.breakpoint.xs ||
                $vuetify.breakpoint.sm ||
                $vuetify.breakpoint.xl
              "
            >
              <hr class="hr-home mt-n1 mb-5" v-if="$vuetify.breakpoint.xs" />
              <CallImageTitleWhite
                lazyData="false"
                :fontData="post[28]"
                v-if="post[28]"
              />
            </v-col>
            <v-col
              class="px-5"
              xs="12"
              sm="6"
              md="3"
              lg="3"
              xl="2"
              cols="12"
              v-if="
                $vuetify.breakpoint.xs ||
                $vuetify.breakpoint.sm ||
                $vuetify.breakpoint.xl
              "
            >
              <hr class="hr-home mt-n1 mb-5" v-if="$vuetify.breakpoint.xs" />
              <CallImageTitleWhite
                lazyData="false"
                :fontData="post[29]"
                v-if="post[29]"
              />
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>

    <!-- <div class="container">
      <v-row class="mt-1">
        <v-col class="px-5" sm="6" md="3" lg="3" xl="3" cols="12">
          <hr class="hr-home mt-n5 mb-5" v-if="$vuetify.breakpoint.xs" />
          <CardText
            lazyData="false"
            :retracts="post[21]"
            :fontData="post[21]"
            v-if="post[21]"
          />
          <hr class="hr-home mt-4 mb-4" />
          <CardText
            lazyData="false"
            :retracts="post[22]"
            :fontData="post[22]"
            v-if="post[22]"
          />
        </v-col>

        <v-col class="px-5" sm="6" md="3" lg="3" xl="3" cols="12">
          <hr class="hr-home mt-n5 mb-5" v-if="$vuetify.breakpoint.xs" />
          <CardText
            lazyData="false"
            :retracts="post[23]"
            :fontData="post[23]"
            v-if="post[23]"
          />
          <hr class="hr-home mt-4 mb-4" />
          <CardText
            lazyData="false"
            :retracts="post[24]"
            :fontData="post[24]"
            v-if="post[24]"
          />
        </v-col>

        <v-col class="px-5" sm="6" md="3" lg="3" xl="3" cols="12">
          <hr class="hr-home mt-n5 mb-5" v-if="$vuetify.breakpoint.xs" />
          <AdBanners lazyData="false" :fontData="banners[4]" v-if="post[4]" />
        </v-col>

        <v-col class="px-5" sm="6" md="3" lg="3" xl="3" cols="12">
          <hr class="hr-home mt-n5 mb-5" v-if="$vuetify.breakpoint.xs" />
          <CardText
            lazyData="false"
            :retracts="post[25]"
            :fontData="post[25]"
            v-if="post[25]"
          />
          <hr class="hr-home mt-4 mb-4" />
          <CardText
            lazyData="false"
            :retracts="post[26]"
            :fontData="post[26]"
            v-if="post[26]"
          />
        </v-col>
      </v-row>
    </div> -->

    <div class="container">
      <v-row class="mt-10">
        <v-col sm="6" lg="3" cols="12">
          <hr class="hr-home mt-n5 mb-5" v-if="$vuetify.breakpoint.xs" />
          <CallImageTitle
            lazyData="false"
            :retracts="post[31]"
            :fontData="post[31]"
            v-if="post[31]"
          />
        </v-col>
        <v-col sm="6" lg="3" cols="12">
          <hr class="hr-home mt-n5 mb-5" v-if="$vuetify.breakpoint.xs" />
          <CallImageTitle
            lazyData="false"
            :retracts="post[32]"
            :fontData="post[32]"
            v-if="post[32]"
          />
        </v-col>
        <v-col sm="6" lg="3" cols="12">
          <hr class="hr-home mt-n5 mb-5" v-if="$vuetify.breakpoint.xs" />
          <CallImageTitle
            lazyData="false"
            :retracts="post[33]"
            :fontData="post[33]"
            v-if="post[33]"
          />
        </v-col>
        <v-col sm="6" lg="3" cols="12">
          <hr class="hr-home mt-n5 mb-5" v-if="$vuetify.breakpoint.xs" />
          <AdBanners
            lazyData="false"
            :fontData="banners[2]"
            v-if="banners[2]"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {
  keyApplicationGB,
  urlApi,
  urlStorage,
  layoutApplication,
  urlPublic,
} from "@/global";

import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";

import AdBanners from "@/components/news/AdBanners";

import CallImageTitle from "@/components/news/CallImageTitle";
import CallTitleImage from "@/components/news/CallTitleImage";
import CallImageTitleWhite from "@/components/news/CallImageTitleWhite";
import CallTitleTerciary from "@/components/news/CallTitleTerciary";
import CallTitle from "@/components/news/CallTitle";

import CallTitleImageSecondary from "@/components/news/CallTitleImageSecondary";
import CallMainImageTitle from "@/components/news/CallMainImageTitle";
import CardText from "@/components/news/CardText";
import CallTitleUpDowndImage from "@/components/news/CallTitleUpDowndImage";
import CallText from "@/components/news/CallText";
import BannerNews from "@/components/news/BannerNews";
import CallImageTitleAndSubtitle from "@/components/news/CallImageTitleAndSubtitle";

export default {
  components: {
    CallTitleImage,
    CallImageTitleWhite,
    CallTitleTerciary,
    CallTitle,
    CallTitleImageSecondary,
    CallMainImageTitle,
    CallImageTitle,
    AdBanners,
    CardText,
    CallTitleUpDowndImage,
    CallText,
    BannerNews,
    CallImageTitleAndSubtitle,
  },

  data() {
    return {
      post: [],
      banners: [],
    };
  },

  head() {
    return {
      title: "Página Inicial",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Acompanhe as notícias sobre política, análise e opinião, eleições, palmas, goiânia, brasíla no site feito sob medida para leitores exigentes. Raimundo Lira ",
        },
        {
          hid: "keywords",
          name: "keywords",
          content:
            "Notícias Tocantins, Notícias Goiás, Notícias Palmas, Notícias Goiânia, Notícias Brasília, Política Goiás, Política Tocantins, Política Brasília",
        },
      ],
      link: [{ hid: "canonical", href: "https://bsbg1.com.br" }],
    };
  },

  methods: {
    loadPosts() {
      const url = `${urlPublic}/all-posts`;
      axios.get(url).then((res) => {
        this.post = res.data;
      });
    },
    loadBanners() {
      const url = `${urlPublic}/lasts-banners`;
      axios.get(url).then((res) => {
        this.banners = res.data.banners;
      });
    },
  },

  mounted() {
    this.loadPosts();
    this.loadBanners();
  },
};
</script>
