<template>
  <div class="accessibility-admin">

    <v-btn class="ml-2" fab small @click="changeTheme()" color="secondary">
      <v-icon>far fa-moon</v-icon>
    </v-btn> 

    <v-btn class="ml-2" fab small @click.prevent.stop="increase()" color="secondary">
      <span class="increase-decrease">A+</span>
    </v-btn>

    <v-btn class="ml-2" fab small @click.prevent.stop="decrease()" color="secondary">
      <span class="increase-decrease">A-</span>
    </v-btn>

  </div>
</template>

<script>
export default {
  name: "AccessibilityAdmin",
  data() {
    return {
      isDarken: false,
    };
  },
  methods: {
    increase() {
      let elements = document.querySelector("body").querySelectorAll("*");
      let fonts = [];

      function getFontSize() {
        for (let i = 0; i < elements.length; i++) {
          let fontSize = window
            .getComputedStyle(elements[i], null)
            .getPropertyValue("font-size");
          fonts.push(parseFloat(fontSize));
        }
      }
      getFontSize();
      for (let i = 0; i < elements.length; i++) {
        ++fonts[i];
        elements[i].style.fontSize = fonts[i] + "px";
      }
    },

    decrease() {
      let elements = document.querySelector("body").querySelectorAll("*");
      let fonts = [];

      function getFontSize() {
        for (let i = 0; i < elements.length; i++) {
          let fontSize = window
            .getComputedStyle(elements[i], null)
            .getPropertyValue("font-size");
          fonts.push(parseFloat(fontSize));
        }
      }
      getFontSize();
      for (let i = 0; i < elements.length; i++) {
        --fonts[i];
        elements[i].style.fontSize = fonts[i] + "px";
      }
    },

    adjust() {

      let className = "contrast";
      let el = document.querySelector("body");
      el.classList.toggle(className);
    },

    changeTheme() {
      this.isDarken = !this.isDarken;
      if(this.isDarken) {
        this.$vuetify.theme.dark = true
      } else {
        this.$vuetify.theme.dark = false
      }
    }
  },
};
</script>
<style scoped>
.increase-decrease {
  font-size: 1.5em;
  font-weight: bold;
  letter-spacing: -1pt;
}
.accessibility-admin {
  position: fixed;
  left: 10px;
  bottom: 3%;
  text-align: left;
  z-index: 100;
}
</style>