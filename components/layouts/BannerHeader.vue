<template>
<div style="max-height: 200px">

  <section class="banner-section banner-two" style="max-height: 230px">
    <div class="banner-carousel">
      <no-ssr>
        <carousel :items="1">
          <div class="slide-item">
            <div class="image-layer" style="background-image: url(/images/main-slider/city.jpg)"></div>
            <div class="auto-container">
            <div class="content-box" style="max-height: 230px">
              <h1 class="mt-15 mb-5" style="color:white; font-weight:600; text-align: center">
                <span class="mt-15 inner" style="color:white; text-transform:uppercase;">
                  <br class="mt-5"/>{{titleHeader}}
                </span>
              </h1>
            </div>
            </div>
          </div>
        </carousel>
      </no-ssr>
    </div>
  </section>
<!-- <div class="">
<div class="content">
<div class="inner"> -->



</div>
</template>

<script>
export default {
  props: ["titleHeader"],
  name: "BannerHeader",
};
</script>
