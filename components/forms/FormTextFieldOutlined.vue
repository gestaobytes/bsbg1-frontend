<template>
  <v-text-field
    :class="text-field-form"
    :placeholder="placeholder"
    color="orange"

    v-bind:value="value"
    @input="$emit('input', $event)"
    @blur="$emit('blur', $event)"
    :hint="hint"
    :type="defineType"
    :label="label"
    persistent-hint
    :counter="counter"
    :rules="rules"
    :outlined=defineOutlined
    :dense=defineDense
    :disabled=defineDisabled
    :msgttip=defineTooltipMsg
    :iconttip=defineTooltipIcon
    >

    <template v-slot:prepend v-if="defineTooltip==true">
      <v-tooltip top >
        <template v-slot:activator="{ on }" >
          <a href="https://buscacepinter.correios.com.br/app/endereco/index.php" target="_blank">
            <v-btn fab outlined x-small color="red" v-on="on" class="pa-n2 mr-2 mt-n1">
              <v-icon v-on="on" small class="ma-n1"> {{iconttip}} </v-icon>
            </v-btn>
          </a>
        </template>
        {{ msgttip }}
      </v-tooltip>
    </template>
  </v-text-field>
</template>

<script>
export default {
  inheritAttrs: false,
  props: ["type", "name", "label", "hint", "required", "min", "max", "value","counter","rules","disabled","ttip","msgttip","iconttip"],
  computed: {
    defineType: function () {
      return this.type || "text";
    },
    defineOutlined: function () {
      return this.outlined || true;
    },
    defineDense: function () {
      return this.dense || true;
    },
    defineRequired: function () {
      return this.required || false;
    },
    defineCounter: function () {
      return this.counter || false;
    },
    defineRules: function () {
      return this.rules || "";
    },
    defineDisabled: function () {
      return this.disabled || false;
    },
    defineTooltip: function () {
      return this.ttip || false;
    },
    defineTooltipMsg: function () {
      return this.msgttip || "Tooltip in Top";
    },
    defineTooltipIcon: function () {
      return this.iconttip || "mdi-help";
    },
  },
  name: "FormTextField",
};
</script>
