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
        <td>{{ data.name }}</td>
        <td width="80px"> {{ data.order }} </td>
        <td width="80px"> {{ data.end | dateBRL }} </td>

        <td width="100px" class="text-right">
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

            <v-col cols="12" sm="4">
              <FormTextField
                label="*Cliente (campanha)"
                nameField="name"
                v-model="dataOfTable.name"
                :minLength="$v.dataOfTable.name.$params.minLength.min"
                :maxLength="$v.dataOfTable.name.$params.maxLength.max"
                :appendIcon="$v.dataOfTable.name.$error ? 'mdi-alert-circle' : ''"
                :validate="$v.dataOfTable.name.$error"
                :msgvalidate="$v.dataOfTable.name"
                :errordata="errors.data && errors.data.name"
                @blur="$v.dataOfTable.name.$touch()"
              />
            </v-col>

            <v-col cols="12" sm="8">
              <FormTextField
                type="url"
                label="*Link"
                nameField="url"
                v-model="dataOfTable.url"
                :appendIcon="$v.dataOfTable.url.$error ? 'mdi-alert-circle' : ''"
                :validate="$v.dataOfTable.url.$error"
                :msgvalidate="$v.dataOfTable.url"
                :errordata="errors.data && errors.data.url"
                @blur="$v.dataOfTable.url.$touch()"
              />
            </v-col>

            <v-col cols="12" sm="6" md="3">
              <FormSelectField
                name="positionbanner_id"
                required
                label="Tipo*"
                v-model="dataOfTable.positionbanner_id"
                :itemsData="positions"
              />
            </v-col>

            <v-col cols="12" sm="6" md="3">
              <FormTextField
                type="numeric"
                label="*Ordem"
                nameField="order"
                v-model="dataOfTable.order"
                :minLength="$v.dataOfTable.order.$params.minValue.min"
                :maxLength="$v.dataOfTable.order.$params.maxValue.max"
                :appendIcon="$v.dataOfTable.order.$error ? 'mdi-alert-circle' : ''"
                :validate="$v.dataOfTable.order.$error"
                :msgvalidate="$v.dataOfTable.order"
                :errordata="errors.data && errors.data.order"
                @blur="$v.dataOfTable.order.$touch()"
              />
            </v-col>


            <v-col cols="12" sm="6" md="3">
              <FormTextField
                type="date"
                label="Inicia em"
                nameField="start"
                v-model='dataOfTable.start'
                :appendIcon="$v.dataOfTable.start.$error ? 'mdi-alert-circle' : ''"
                :validate="$v.dataOfTable.start.$error"
                :msgvalidate="$v.dataOfTable.start"
                :errordata="errors.data && errors.data.start"
                @blur="$v.dataOfTable.start.$touch()"
              />
            </v-col>

            <v-col cols="12" sm="6" md="3">
              <FormTextField
                type="date"
                label="Finaliza em"
                nameField="end"
                v-model='dataOfTable.end'
                :appendIcon="$v.dataOfTable.end.$error ? 'mdi-alert-circle' : ''"
                :validate="$v.dataOfTable.end.$error"
                :msgvalidate="$v.dataOfTable.end"
                :errordata="errors.data && errors.data.end"
                @blur="$v.dataOfTable.end.$touch()"
              />
            </v-col>



            <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
              <vue-editor :editorToolbar="customToolbar" v-model="dataOfTable.image" required></vue-editor>
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
import axios from "axios";
import crud from "~/components/api/_crud";
import { urlAdmin } from "@/global";

import ButtonAdd from '@/components/buttons/ButtonAdd';
import ButtonDelete from '@/components/buttons/ButtonDelete';
import ButtonEdit from '@/components/buttons/ButtonEdit';
import FormTextField from '@/components/forms/FormTextField';
import FormSelectField from '@/components/forms/FormSelectField.vue';
import ViewModalLight from '@/components/views/ViewModalLight';
import TableCustom from '@/components/views/ViewTableCustom.vue';
import ViewTitlePageSearch from '@/components/designs/titles/ViewTitlePageSearch';
import Label from "@/components/forms/Label.vue";

import { VueEditor } from "vue2-editor";
import {
  required,
  url,
  minLength,
  maxLength,
  minValue,
  maxValue,
} from "vuelidate/lib/validators";

export default {
  middleware: ["auth", "clearValidationErrors"],
  mixins: [crud],
  layout: "restrict",

  components: {
    ButtonAdd,
    ButtonDelete,
    ButtonEdit,
    FormTextField,
    FormSelectField,
    ViewModalLight,
    TableCustom,
    ViewTitlePageSearch,
    VueEditor,
    Label,
  },

  data: function () {
    return {
      pageApi: "banners",
      titleModal: "CADASTRAR ANÚNCIOS",
      titlePage: "ANÚNCIOS",
      tableHead: ["Cliente (Campanha)", "Ordem", "Fim"],
      positions: [],
      customToolbar: [
        ["image"],
      ],
    };
  },

  validations() {
    return {
      dataOfTable: {
        name: { required, minLength: minLength(3), maxLength: maxLength(40) },
        url: { required, url },
        start: { required },
        end: { required },
        order: { required, minValue: minValue(0), maxValue: maxValue(999) },
      },







    };
  },

  methods: {

    loadPositions(item) {
      const url = `${urlAdmin}/position-banners/cb`;
      axios.get(url).then((response) => {
        this.positions = response.data.map((position) => {
          return {
            value: position.id,
            text: position.name,
          };
        });
      });
      this.positions = item;
    },

    functionError() {
      return this.$v.dataOfTable.$invalid;
    },
  },

  mounted() {
    this.loadPositions();
  },

};
</script>
