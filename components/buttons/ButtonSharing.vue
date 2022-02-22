<template>
  <span>
    <v-btn
      :url="defineUrl"
      :social="socialMedia"
      :href="'https://www.facebook.com/sharer.php?u=' + urlLocal"
      fab
      small
      class="btn-sharing"
      target="_blank"
      v-if="socialMedia == 'facebook'"
    >
      <v-icon small class="ma-n1">fab fa-facebook-f</v-icon>
    </v-btn>

    <v-btn
      :url="defineUrl"
      :href="
        'https://twitter.com/intent/tweet?text=' + title + ';url=' + urlLocal
      "
      :social="socialMedia"
      :title="title"
      :subtitle="subtitle"
      data-via="@bsbg1"
      :data-url="urlLocal"
      :data-text="subtitle"
      data-lang="pt"
      fab
      small
      class="btn-sharing"
      target="_blank"
      v-if="socialMedia == 'twitter'"
    >
      <v-icon small class="ma-n1">fab fa-twitter</v-icon>
    </v-btn>

    <v-btn
      :url="defineUrl"
      :social="socialMedia"
      :href="'http://www.linkedin.com/shareArticle?mini=true&amp;url=' + urlLocal + '&amp;title=&amp;summary=As'"
      fab
      small
      class="btn-sharing"
      target="_blank"
      v-if="socialMedia == 'linkedin'"
    >
      <v-icon small class="ma-n1">fab fa-linkedin</v-icon>
    </v-btn>

    <v-btn
      :url="defineUrl"
      :href="'https://api.whatsapp.com/send?text=' + urlLocal"
      :social="socialMedia"
      fab
      small
      class="btn-sharing"
      target="_blank"
      v-if="socialMedia == 'whatsapp'"
    >
      <v-icon small class="ma-n1">fab fa-whatsapp</v-icon>
    </v-btn>

    <v-btn
      :url="defineUrl"
      :title="title"
      :social="socialMedia"
      fab
      rel="telegram-share-btt"
      id="telegram-share-btt"
      small
      class="btn-sharing"
      target="_blank"
      v-if="socialMedia == 'telegram'"
    >
      <v-icon small class="ma-n1">fab telegram-plane</v-icon>
    </v-btn>
  </span>
</template>

<script>
export default {
  props: ["urlLocal", "socialMedia", "title", "subtitle"],
  name: "ButtonSharing",
  computed: {
    defineUrl: function () {
      return this.urlLocal || window.location.href;
    },
  },
};

// document.addEventListener(
//   "DOMContentLoaded",
//   function () {
//     //conteúdo que será compartilhado: Título da página + URL
//     var conteudo = encodeURIComponent(
//       document.title + " " + window.location.href
//     );
//     //altera a URL do botão
//     document.getElementById("whatsapp-share-btt").href =
//       "https://api.whatsapp.com/send?text=" + conteudo;
//   },
//   false
// );

// document.addEventListener(
//   "DOMContentLoaded",
//   function () {
//     var url = encodeURIComponent(window.location.href); //url
//     var title = encodeURIComponent(document.title); //título
//     var telegramLink =
//       "https://telegram.me/share/url?url=" + url + "&text=" + title;
//     document.getElementById("telegram-share-btt").href = telegramLink;
//   },
//   false
// );
</script>
