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
              <v-col cols="12" xs="12">
                <FormTextField
                  label="*Posição"
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
            </v-row>
          </div>
        </ViewModalLight>
      </v-dialog>
    </v-layout>

    <div class="text-xs-center mt-5">
      <v-pagination
        color="orange"
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
  //middleware: ["auth", "clearValidationErrors"],
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
      pageApi: "positions",
      titleModal: "CADASTRAR POSIÇÕES",
      titlePage: "POSIÇÕES",
      tableHead: ["POSIÇÕES"],
    };
  },

  validations() {
    return {
      dataOfTable: {
        title: { required, minLength: minLength(3), maxLength: maxLength(40) },
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
