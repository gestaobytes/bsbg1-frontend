<template>
  <div style="width: 100%">
    <ViewTitlePageSearch :titlePage="titlePage" @clickSubmit="submitFS()" nameFS="q"/>

    <ButtonAdd @add="reset(), (dialog = !dialog)" />

    <TableCustom :headTH="tableHead" :registers="registersOfTable">
      <tr
        v-for="data in registersOfTable"
        :key="data.id"
        slot="registers-table"
      >
        <td width="70px">
          <div class="img-responsive mt-2" v-html="data.emoction"></div>
        </td>
        <td>{{ data.slug }}</td>
        <td width="170px" class="text-right">
          <ButtonDelete @delete="remove(data)" />
          <br v-if="$vuetify.breakpoint.xs" />
          <ButtonEdit @save="loadRegisterSelect(data), (dialog = !dialog)" />
        </td>
      </tr>
    </TableCustom>

    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent>

        <ViewModalLight
          :title="titleModal"
          @close="dialog = false"
          @save="save()"
          :errorValidation="functionError()"
        >
          <v-row slot="contentForm">

            <v-col cols="12" xs="10" sm="9" md="10" lg="10" xl="11">
              <FormTextField
                label="*Texto"
                nameField="slug"
                v-model="dataOfTable.slug"
                :minLength="$v.dataOfTable.slug.$params.minLength.min"
                :maxLength="$v.dataOfTable.slug.$params.maxLength.max"
                :appendIcon="$v.dataOfTable.slug.$error ? 'mdi-alert-circle' : ''"
                :validate="$v.dataOfTable.slug.$error"
                :msgvalidate="$v.dataOfTable.slug"
                :errordata="errors.data && errors.data.slug"
                @blur="$v.dataOfTable.slug.$touch()"
              />
            </v-col>

            <v-col cols="12" xs="2" sm="3" md="2" lg="2" xl="1">
              <Label
              class="mt-n4"
                txtlabel="Ativo?"
                msgtooltip="Deixe a opção desmarcada caso não queira exibir essa reação."
              />
              <v-switch class="mt-n1" v-model="dataOfTable.status" inset />
            </v-col>
            <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
              <vue-editor :editorToolbar="customToolbar" v-model="dataOfTable.emoction" required></vue-editor>
            </v-col>
          </v-row>
        </ViewModalLight>
      </v-dialog>
    </v-layout>

    <div class="text-xs-center mt-5">
      <v-pagination color="#0098b0" v-if="paginate > 1" v-model="page" :length="paginate" :total-visible="7" circle/>
    </div>

  </div>
</template>

<script>
import crud from "~/components/api/_crud";
import ButtonAdd from '@/components/buttons/ButtonAdd';
import ButtonDelete from '@/components/buttons/ButtonDelete';
import ButtonEdit from '@/components/buttons/ButtonEdit';
import FormTextField from '@/components/forms/FormTextField';
import FormSelectAutocomplete from '@/components/forms/FormSelectAutocomplete.vue';
import ViewModalLight from '@/components/views/ViewModalLight';
import TableCustom from '@/components/views/ViewTableCustom';
import ViewTitlePageSearch from '@/components/designs/titles/ViewTitlePageSearch';
import Label from "@/components/forms/Label.vue";

import { VueEditor } from "vue2-editor";
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
    ButtonAdd,
    ButtonDelete,
    ButtonEdit,
    FormTextField,
    FormSelectAutocomplete,
    ViewModalLight,
    TableCustom,
    ViewTitlePageSearch,
    VueEditor,
    Label,
  },

  data: function () {
    return {
      pageApi: "reactions",
      titleModal: "CADASTRAR REAÇÕES",
      titlePage: "REAÇÕES",
      tableHead: ["", "Descrição"],
      status: ["ON", "OFF"],
      customToolbar: [
        ["image"],
      ],
    };
  },

  validations() {
    return {
      dataOfTable: {
        slug: { required, minLength: minLength(3), maxLength: maxLength(40) },
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
