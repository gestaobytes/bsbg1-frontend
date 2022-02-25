<template>
  <div style="width: 100%">
    <ViewTitlePageSearch
      :titlePage="titlePage"
      @clickSubmit="submitFS()"
      nameFS="q"
    />
    <ButtonAdd @add="reset(), (dialog = !dialog), $v.dataOfTable.$reset()" />

    <ViewCustomTable :headTH="tableHead" :registers="registersOfTable">
      <tr
        v-for="data in registersOfTable"
        :key="data.id"
        slot="registers-table"
      >
        <td>{{ data.title }}</td>
        <td width="120px" class="text-right">
          <ButtonDelete @delete="remove(data)" />
          <br v-if="$vuetify.breakpoint.xs" />
          <ButtonEdit @save="loadRegisterSelect(data), (dialog = !dialog)" />
        </td>
      </tr>
    </ViewCustomTable>

    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent>
        <ViewModalLight
          :title="titleModal"
          @close="dialog = false"
          @save="save()"
          :errorValidation="functionError()"
        >
          <div slot="contentForm">
            <v-row>

              <v-col cols="12" sm="4" md="3">
                <FormSelectField
                  name="type"
                  required
                  label="Tipo*"
                  v-model="dataOfTable.type"
                  :itemsData="categoryOrPage"
                />
              </v-col>

              <v-col cols="12" sm="8" md="4">
                <FormTextField
                  label="*Nome da Categoria"
                  nameField="title"
                  v-model="dataOfTable.title"
                  :minLength="$v.dataOfTable.title.$params.minLength.min"
                  :maxLength="$v.dataOfTable.title.$params.maxLength.max"
                  :appendIcon="$v.dataOfTable.title.$error ? 'mdi-alert-circle' : ''"
                  :validate="$v.dataOfTable.title.$error"
                  :msgvalidate="$v.dataOfTable.title"
                  :errordata="errors.data && errors.data.title"
                  @blur="$v.dataOfTable.title.$touch()"
                />
              </v-col>

              <v-col cols="12" sm="12" md="5">
                <FormTextField
                  label="*Descrição"
                  nameField="description"
                  v-model="dataOfTable.description"
                  :minLength="$v.dataOfTable.description.$params.minLength.min"
                  :maxLength="$v.dataOfTable.description.$params.maxLength.max"
                  :appendIcon="$v.dataOfTable.description.$error ? 'mdi-alert-circle' : ''"
                  :validate="$v.dataOfTable.description.$error"
                  :msgvalidate="$v.dataOfTable.description"
                  :errordata="errors.data && errors.data.description"
                  @blur="$v.dataOfTable.description.$touch()"
                />
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <FormTextField
                  label="*Background"
                  nameField="topcolor"
                  v-model="dataOfTable.topcolor"
                  :maxLength="$v.dataOfTable.topcolor.$params.maxLength.max"
                  :appendIcon="$v.dataOfTable.topcolor.$error ? 'mdi-alert-circle' : ''"
                  :validate="$v.dataOfTable.topcolor.$error"
                  :msgvalidate="$v.dataOfTable.topcolor"
                  :errordata="errors.data && errors.data.topcolor"
                  @blur="$v.dataOfTable.topcolor.$touch()"
                />
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <FormTextField
                  label="Cor da Fonte"
                  nameField="colorsourcetop"
                  v-model="dataOfTable.colorsourcetop"
                  :maxLength="$v.dataOfTable.colorsourcetop.$params.maxLength.max"
                  :appendIcon="$v.dataOfTable.colorsourcetop.$error ? 'mdi-alert-circle' : ''"
                  :validate="$v.dataOfTable.colorsourcetop.$error"
                  :msgvalidate="$v.dataOfTable.colorsourcetop"
                  :errordata="errors.data && errors.data.colorsourcetop"
                  @blur="$v.dataOfTable.colorsourcetop.$touch()"
                />
              </v-col>

              <v-col cols="12" xs="6" sm="4" md="2" lg="2" xl="1">
                <Label
                class="mt-n4"
                  txtlabel="Link Topo"
                  msgtooltip="Deixe a opção desmarcada caso não queira exibir o link no topo."
                />
                <v-switch class="mt-n1" v-model="dataOfTable.linktop" inset />
              </v-col>

              <v-col cols="12" xs="6" sm="4" md="2" lg="2" xl="1">
                <Label
                class="mt-n4"
                  txtlabel="Link Footer"
                  msgtooltip="Deixe a opção desmarcada caso não queira exibir o link no topo."
                />
                <v-switch class="mt-n1" v-model="dataOfTable.linkfooter" inset />
              </v-col>
            </v-row>
          </div>
        </ViewModalLight>
      </v-dialog>
    </v-layout>

    <div class="text-xs-center mt-5">
      <v-pagination
        color="#0098b0"
        v-if="paginate > 1"
        v-model="page"
        :length="paginate"
        :total-visible="7"
        circle
      />
    </div>
  </div>
</template>


<script>
import axios from "axios";
import { urlAdmin, urlStorage } from "@/global";
import VueCoreImageUpload from "vue-core-image-upload";

import crud from "@/components/api/_crud";
import ViewTitlePageSearch from "@/components/designs/titles/ViewTitlePageSearch";
import ButtonAdd from "@/components/buttons/ButtonAdd";
import ButtonDelete from "@/components/buttons/ButtonDelete";
import ButtonEdit from "@/components/buttons/ButtonEdit";
import ViewCustomTable from "@/components/elements-views/ViewCustomTable";
import ViewModalLight from "@/components/elements-views/ViewModalLight";
import FormSelectAutocomplete from "@/components/forms/FormSelectAutocomplete.vue";
import FormSelectField from "@/components/forms/FormSelectField.vue";
import FormTextField from "@/components/forms/FormTextField";
import Label from "@/components/forms/Label.vue";

import {
  required,
  email,
  minLength,
  maxLength,
  minValue,
  maxValue,
} from "vuelidate/lib/validators";

export default {
  middleware: ["clearValidationErrors"],
  mixins: [crud],
  layout: "restrict",
  components: {
    ViewTitlePageSearch,
    ButtonAdd,
    ButtonDelete,
    ButtonEdit,
    ButtonEdit,
    ViewCustomTable,
    ViewModalLight,
    FormSelectAutocomplete,
    FormSelectField,
    Label,
    FormTextField,
  },

  data: function () {
    return {
      dataOfTable: {},
      registersOfTable: [],
      errorInField: "",
      pageApi: "categories",
      titleModal: "CADASTRAR CATEGORIA",
      titlePage: "CATEGORIAS",
      tableHead: ["CATEGORIA"],
      categoryOrPage: [
        { value: "E", text: "EDITORIAS" },
        { value: "C", text: "COLUNAS" },
        { value: "B", text: "BLOGS" },
        { value: "P", text: "PÁGINA" },
        { value: "H", text: "HOME" },
      ],
    };
  },

  validations() {
    return {
      dataOfTable: {
        title: { required, minLength: minLength(4), maxLength: maxLength(50) },
        description: { required, minLength: minLength(4), maxLength: maxLength(50) },
        topcolor: { maxLength: maxLength(7) },
        colorsourcetop: { maxLength: maxLength(7) },
      },
    };
  },

  methods: {
    functionError() {
      return this.$v.dataOfTable.$invalid;
    },
  },
};
</script>
