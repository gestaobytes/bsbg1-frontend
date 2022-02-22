<template>
  <div>
    <label :txtlabel="txtlabel" :msgtooltip="msgtooltip" class="label">
      {{ txtlabel }}
      <v-tooltip top max-width="200" v-if="msgtooltip">
        <template v-slot:activator="{ on, attrs }">
          <v-icon dark v-bind="attrs" v-on="on">
            far fa-question-circle
          </v-icon>
        </template>
        <span>{{ msgtooltip }}</span>
      </v-tooltip>
    </label>
  </div>
</template>

<script>
export default {
  name: "Label",
  props: ["txtlabel", "msgtooltip"],
};
</script>

<style scoped>
.label {
  font-size: 0.8em;
  font-weight: 300;
}
.label > i {
  margin-left: 10px;
  margin-top: -5px;
  font-size: 1.2em;
  font-weight: 200;
  color: #0098b0;
}
</style>
