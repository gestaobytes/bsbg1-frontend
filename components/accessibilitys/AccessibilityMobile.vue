<template>
  <div class="accessibility-mobile">
    <v-btn fab bottom left small @click="changeTheme()" class="mb-10" color="secondary">
      <v-icon>far fa-moon</v-icon>
    </v-btn>
    <v-btn fab bottom left small @click.prevent.stop="increase()" class="mb-2" color="secondary">
      <span class="increase-decrease">A+</span>
    </v-btn>
    <v-btn fab bottom left small @click.prevent.stop="decrease()" color="secondary">
      <span class="increase-decrease">A-</span>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "AccessibilityMobile",
  props: {
    position: {
      type: String,
      default: "left",
    },
    fontSize: {
      type: String,
      default: "20px",
    },
    size: {
      type: String,
      default: "48px",
    },
  },
  data() {
    return {
      isDarken: false,
      styleObject: {
        position: this.position,
        backgroundColor: this.backgroundColor,
        color: this.fontColor,
        width: this.size,
        height: this.size,
        fontSize: this.fontSize,
      },
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
</style>