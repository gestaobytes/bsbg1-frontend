<template>
  <div>
    <!-- <v-input>  -->
      <v-text-field
        :value="value"
        @input="$emit('input', $event)"
        @blur="$emit('blur', $event)"
        :type="defineType"
        :nameField="nameField"
        :label="label"
        color="#0098b0"
        :min="min"
        :max="max"
        :counter="counter"
        :outlined="defineOutlined"
        :dense="defineDense"
        :disabled="defineDisabled"
        :append-icon="appendIcon"
        :validate="validate"
        :msgvalidate="msgvalidate"
        :errordata="errordata"
        :error="validate"
        :complement="complement"
        :hintText="(errordata || validate == true) ? hintText : ''"
      >
        <template slot="append-outer" v-if="complement">
          <div :class="(errordata || validate == true) ? 'complement-error' : 'complement'"> {{complement}} </div>
          <!-- <v-btn disabled tile small class="ml-n2 mt-n2" color="#0098b0" height="40">

          </v-btn> -->
        </template>
      </v-text-field>

      <div class="hint-text-error" :v-if="errordata || validate == true">
        <div v-if="errors.data" class="mb-n5">
          <p v-if="errors.data[nameField]">{{errors.data[nameField][0]}}</p>
        </div>

        <div v-if="validate == true">
          <p v-if="!msgvalidate.required">Campo obrigatório.</p>
          <p v-else-if="defineType=='email' && !msgvalidate.email">E-mail inválido.</p>
          <p v-else-if="defineType=='url' && !msgvalidate.url">URL inválida.</p>

          <p v-else-if="!msgvalidate.minLength"> Mín {{ minLength }} <span v-if="defineType=='text'">caracteres</span> </p>
          <p v-else-if="!msgvalidate.maxLength"> Máx {{ maxLength }} <span v-if="defineType=='text'">caracteres</span> </p>

          <p v-else-if="!msgvalidate.minValue"> Valor mín. {{ minValue }}  </p>
          <p v-else-if="!msgvalidate.maxValue"> Valor máx. {{ maxValue }}  </p>

        </div>
      </div>

      <div class="hint-text" :v-if="hintText && hintText!=''">
        <div class="mt-n4 ml-2">
          <p>{{hintText}}</p>
        </div>
      </div>




  </div>
</template>

<script>
export default {
  name: "FormTextField",
  props: [
    "hintText",
    "type",
    "complement",
    "nameField",
    "label",
    "hint",
    "required",
    "min",
    "max",
    "value",
    "counter",
    "disabled",
    "appendIcon",
    "validate",
    "msgvalidate",
    "errordata",
    "minLength",
    "maxLength",
  ],
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
    defineDisabled: function () {
      return this.disabled || false;
    },
  },
};
</script>

<style scoped>
.complement {
  padding: 10px;
  margin-top: -8px;
  font-weight: 300;
  margin-left: -13px;
  z-index: 5;
  background-color: #0098b0;
  color: white;
  height: 40px;

}
.complement-error {
  padding: 10px;
  margin-top: -9px;
  font-weight: 300;
  margin-left: -13px;
  z-index: 5;
  background-color: #dd2c00;
  color: white;
  height: 41px;

}
.hint-text-error {
  font-size: 0.5em;
}
.hint-text {
  font-size: 0.7em;
  font-weight: 300;

}

</style>
