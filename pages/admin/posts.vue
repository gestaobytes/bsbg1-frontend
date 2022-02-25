<template>
  <div style="width: 100%">
    <ViewTitlePageSearch
      :titlePage="titlePage"
      @clickSubmit="submitFS()"
      nameFS="q"
    />
    <ButtonAdd @add="reset(), (dialog = !dialog)" />

    <TableCustom :headTH="tableHead" :registers="registersOfTable">
      <tr
        v-for="data in registersOfTable"
        :key="data.id"
        slot="registers-table"
      >
        <td width="120px">
          <div
            style="background-color: #ccc; text-align: center"
            class="pa-2 ma-2"
          >
            <div>
              <img
                :src="storage + data.image"
                width="100%"
                v-if="data.image != '' && data.image != null"
              />
              <img src="@/static/notImage.png" width="100%" v-else />
              <div class="m-form">
                <input
                  type="hidden"
                  v-model="data.id"
                  class="form-control text"
                />
                <vue-core-image-upload
                  crop="local"
                  extensions="png,gif,jpeg,jpg"
                  @imageuploaded="imageuploaded"
                  @imagechanged="imagechanged"
                  @imageuploading="imageuploading"
                  @errorhandle="errorhandle"
                  :data="data"
                  crop-ratio="16:8"
                  :toCropImgW="800"
                  :toCropImgh="420"
                  :maxWidth="800"
                  :maxHeight="420"
                  :max-file-size="5242880"
                >
                  <v-btn
                    x-small
                    color="yellow darken-3"
                    block
                    tile
                    dark
                    v-if="data.image != '' && data.image != null"
                  >
                    Alterar Imagem
                  </v-btn>
                  <v-btn x-small color="blue darken-3" block tile dark v-else>
                    Inserir Imagem
                  </v-btn>
                </vue-core-image-upload>
              </div>
            </div>
          </div>
        </td>
        <td>
          <p class="title font-weight-bold">{{ data.title }}</p>
          <p class="mt-n6 mb-0">{{ data.subtitle }}</p>
        </td>
        <td width="170px" class="text-right">
          <v-btn
            class="my-1 mr-2 pa-n7"
            color="green"
            fab
            x-small
            outlined
            dark
            @click="openPost(data.slugCategory, data.slug)"
          >
            <v-icon class="my-n3 pa-n7" small>mdi-arrow-right</v-icon>
          </v-btn>
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
            <v-col cols="12" xs="12" sm="4" md="4" lg="4" xl="4">
              <FormSelectAutocomplete
                label="*Editoria"
                v-model="dataOfTable.subcategory_id"
                :itemsData="subcategories"
              />
              <div class="hint-text-error" v-if="errors.data">
                <p v-if="errors.data.subcategory_id">
                  {{ errors.data.subcategory_id }}
                </p>
              </div>
            </v-col>
            <v-col cols="12" xs="12" sm="4" md="4" lg="4" xl="4">
              <FormSelectAutocomplete
                label="*Localização"
                v-model="dataOfTable.position_id"
                :itemsData="positions"
              />
              <div class="hint-text-error" v-if="errors.data">
                <p v-if="errors.data.position_id">
                  {{ errors.data.position_id }}
                </p>
              </div>
            </v-col>

            <v-col cols="12" xs="12" sm="4" md="4" lg="4" xl="4">
              <FormTextField
                label="*Retranca"
                nameField="retracts"
                v-model="dataOfTable.retracts"
                :maxLength="$v.dataOfTable.retracts.$params.maxLength.max"
                :appendIcon="
                  $v.dataOfTable.retracts.$error ? 'mdi-alert-circle' : ''
                "
                :validate="$v.dataOfTable.retracts.$error"
                :msgvalidate="$v.dataOfTable.retracts"
                :errordata="errors.data && errors.data.retracts"
                @blur="$v.dataOfTable.retracts.$touch()"
              />
            </v-col>

            <v-col
              class="column-field-destak"
              cols="12"
              xs="12"
              sm="5"
              md="5"
              lg="5"
              xl="5"
            >
              <FormTextField
                label="*Título"
                nameField="title"
                v-model="dataOfTable.title"
                :minLength="$v.dataOfTable.title.$params.minLength.min"
                :maxLength="$v.dataOfTable.title.$params.maxLength.max"
                :appendIcon="
                  $v.dataOfTable.title.$error ? 'mdi-alert-circle' : ''
                "
                :validate="$v.dataOfTable.title.$error"
                :msgvalidate="$v.dataOfTable.title"
                :errordata="errors.data && errors.data.title"
                @blur="$v.dataOfTable.title.$touch()"
              />
              <b class="info-small">
                Após compartilhamento, não altere esse campo</b
              >
            </v-col>
            <v-col cols="12" xs="12" sm="7" md="7" lg="7" xl="7">
              <FormTextField
                label="*Título Adaptado"
                nameField="titleadapter"
                v-model="dataOfTable.titleadapter"
                :minLength="$v.dataOfTable.titleadapter.$params.minLength.min"
                :maxLength="$v.dataOfTable.titleadapter.$params.maxLength.max"
                :appendIcon="
                  $v.dataOfTable.titleadapter.$error ? 'mdi-alert-circle' : ''
                "
                :validate="$v.dataOfTable.titleadapter.$error"
                :msgvalidate="$v.dataOfTable.titleadapter"
                :errordata="errors.data && errors.data.titleadapter"
                @blur="$v.dataOfTable.titleadapter.$touch()"
              />
            </v-col>
            <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
              <FormTextField
                label="*Subtítulo"
                nameField="subtitle"
                v-model="dataOfTable.subtitle"
                :minLength="$v.dataOfTable.subtitle.$params.minLength.min"
                :maxLength="$v.dataOfTable.subtitle.$params.maxLength.max"
                :appendIcon="
                  $v.dataOfTable.subtitle.$error ? 'mdi-alert-circle' : ''
                "
                :validate="$v.dataOfTable.subtitle.$error"
                :msgvalidate="$v.dataOfTable.subtitle"
                :errordata="errors.data && errors.data.subtitle"
                @blur="$v.dataOfTable.subtitle.$touch()"
              />
            </v-col>

            <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
              <vue-editor
                :editorToolbar="customToolbar"
                v-model="dataOfTable.text"
                required
              ></vue-editor>
            </v-col>

            <v-col cols="12" xs="12" sm="6" md="5" lg="3" xl="3">
              <FormTextField
                label="*Tags (Separe com vírgula)"
                nameField="tags"
                v-model="dataOfTable.tags"
                :minLength="$v.dataOfTable.tags.$params.minLength.min"
                :maxLength="$v.dataOfTable.tags.$params.maxLength.max"
                :appendIcon="
                  $v.dataOfTable.tags.$error ? 'mdi-alert-circle' : ''
                "
                :validate="$v.dataOfTable.tags.$error"
                :msgvalidate="$v.dataOfTable.tags"
                :errordata="errors.data && errors.data.tags"
                @blur="$v.dataOfTable.tags.$touch()"
              />
            </v-col>
            <v-col cols="12" xs="12" sm="6" md="3" lg="3" xl="3">
              <FormTextField
                type="date"
                label="Inicia em"
                nameField="date_start"
                v-model="dataOfTable.date_start"
                :appendIcon="
                  $v.dataOfTable.date_start.$error ? 'mdi-alert-circle' : ''
                "
                :validate="$v.dataOfTable.date_start.$error"
                :msgvalidate="$v.dataOfTable.date_start"
                :errordata="errors.data && errors.data.date_start"
                @blur="$v.dataOfTable.date_start.$touch()"
              />
            </v-col>

            <v-col cols="12" xs="12" sm="6" md="2" lg="3" xl="3">
              <FormSelectField
                label="Status*"
                v-model="dataOfTable.status"
                :itemsData="status"
              />
            </v-col>
            <v-col cols="12" xs="12" sm="6" md="2" lg="3" xl="3">
              <FormSelectField
                label="Restrito?*"
                v-model="dataOfTable.will_restrict_users"
                :itemsData="restrict"
              />
            </v-col>
          </v-row>
        </ViewModalLight>
      </v-dialog>

      <v-dialog v-model="dialogLegend" persistent>
        <ViewModalLight
          title="LEGENDA E CRÉDITO"
          @close="dialogLegend = false"
          @save="save(), dialogLegend = false"
          :errorValidation="functionError()"
        >
          <v-row slot="contentForm">
            <v-col cols="12" sm="12">
              <FormTextField
                label="Crédito"
                nameField="image_credit"
                v-model="dataOfTable.image_credit"
                :maxLength="$v.dataOfTable.image_credit.$params.maxLength.max"
                :appendIcon="$v.dataOfTable.image_credit.$error ? 'mdi-alert-circle' : ''"
                :validate="$v.dataOfTable.image_credit.$error"
                :msgvalidate="$v.dataOfTable.image_credit"
                :errordata="errors.data && errors.data.image_credit"
                @blur="$v.dataOfTable.image_credit.$touch()"
              />
            </v-col>
            <v-col cols="12" sm="12" class="text-center" v-if="lastImage!=''" >
              <img :src="lastImage" width="400px" />
            </v-col>
            <v-col cols="12" sm="12">
              <FormTextField
                label="Legenda"
                nameField="image_subtitle"
                v-model="dataOfTable.image_subtitle"
                :maxLength="$v.dataOfTable.image_subtitle.$params.maxLength.max"
                :appendIcon="$v.dataOfTable.image_subtitle.$error ? 'mdi-alert-circle' : ''"
                :validate="$v.dataOfTable.image_subtitle.$error"
                :msgvalidate="$v.dataOfTable.image_subtitle"
                :errordata="errors.data && errors.data.image_subtitle"
                @blur="$v.dataOfTable.image_subtitle.$touch()"
              />
            </v-col>
          </v-row>
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

import crud from "~/components/api/_crud";
import ButtonAdd from "@/components/buttons/ButtonAdd";
import ButtonDelete from "@/components/buttons/ButtonDelete";
import ButtonEdit from "@/components/buttons/ButtonEdit";
import FormTextField from "@/components/forms/FormTextField";
import FormSelectAutocomplete from "@/components/forms/FormSelectAutocomplete.vue";
import FormSelectField from "@/components/forms/FormSelectField.vue";
import ViewModalLight from "@/components/views/ViewModalLight";
import TableCustom from "@/components/views/ViewTableCustom";
import ViewTitlePageSearch from "@/components/designs/titles/ViewTitlePageSearch";

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
    FormSelectField,
    ViewModalLight,
    TableCustom,
    ViewTitlePageSearch,
    "vue-core-image-upload": VueCoreImageUpload,
    VueEditor,
  },

  data: function () {
    return {
      pageApi: "posts",
      image: "",
      lastImage: "",
      slug: "",
      url: "",
      src: "",
      imgDataUrl: "",
      storage: `${urlStorage}/thumbs/`,

      dialogLegend: false,
      dialogImage: false,
      dialogPhoto: false,
      titleModal: "CADASTRAR POSTAGEM",
      titlePage: "POSTAGENS",
      subcategories: [],
      positions: [],
      tableHead: ["Post", "Imagem"],
      status: [
        { value: 1, text: "ON" },
        { value: 0, text: "OFF" },
      ],
      restrict: [
        { value: 0, text: "NÃO" },
        { value: 1, text: "SIM" },
      ],

      customToolbar: [
        [{ header: [false, 3] }],
        ["bold", "italic", "blockquote"],
        [{ script: "sub" }, { script: "super" }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["image", "link", "video"],
      ],
    };
  },

  validations() {
    return {
      dataOfTable: {
        retracts: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(60),
        },
        title: { required, minLength: minLength(5), maxLength: maxLength(180) },
        titleadapter: {
          required,
          minLength: minLength(5),
          maxLength: maxLength(180),
        },
        subtitle: {
          required,
          minLength: minLength(30),
          maxLength: maxLength(250),
        },
        tags: { required, minLength: minLength(5), maxLength: maxLength(250) },
        date_start: { required },
        image_credit: { maxLength: maxLength(60) },
        image_subtitle: { maxLength: maxLength(250) },
      },
    };
  },

  methods: {
    openPost(slugCategory, slug) {
      this.url = `../../${slugCategory}/${slug}`;
      window.open(this.url);
    },

    loadSubCategories() {
      const url = `${urlAdmin}/subcategories/cb`;
      axios.get(url).then((res) => {
        this.subcategories = res.data.map((subcategory) => {
          return {
            value: subcategory.id,
            text: subcategory.titleCategory,
          };
        });
      });
    },

    loadPositions() {
      const url = `${urlAdmin}/positions/cb`;
      axios.get(url).then((res) => {
        this.positions = res.data.map((position) => {
          return { value: position.id, text: position.title };
        });
      });
    },

    imageuploaded(res, data) {
      let id = data.id;
      let dataImage = {};
      dataImage.id = id;
      dataImage.image = data.base64Code;

      axios
        .put(`${urlAdmin}/${this.pageApi}/${id}/image`, dataImage)
        .then(() => {
          this.$swal({
            icon: "success",
            title: "Imagem inserida!",
            showConfirmButton: false,
            timer: 2000,
          });
          // this.loadRegisterSelect(data), (dialogLegend = !dialogLegend);
          // this.loadRegistersOfTable();
          // this.dialogLegend = true;
          this.registerLegend(id, dataImage.image);
        });

      // <img :src="storage + data.image" width="100%" v-if="data.image != '' && data.image != null" />

      // .catch(
      //   this.$swal({
      //     icon: 'warning',
      //     title: 'Falha na inserção.',
      //     showConfirmButton: false,
      //     timer: 2000
      //   })
      // );
    },

    registerLegend(id, image) {
      this.url = `${urlAdmin}/${this.pageApi}/${id}/details`;
      axios.get(this.url).then((res) => {
        this.dataOfTable = res.data;
        this.lastImage = image;
        this.dialogLegend = true;
      });
    },

    imagechanged(res) {
      // console.log('imagem escolhida:' + res)
    },

    imageuploading(res) {
      // console.log('fazendo upload:' + res)
    },

    errorhandle(res) {
      this.$swal({
        toast: true,
        position: "top-end",
        timerProgressBar: true,
        icon: "error",
        title: res,
        showConfirmButton: false,
        timer: 3500,
      });
    },

    functionError() {
      return this.$v.dataOfTable.$invalid;
    },
  },

  mounted() {
    this.loadSubCategories();
    this.loadPositions();
  },
};
</script>
<style scoped>
.info-small {
  font-size: 12px;
  color: chocolate;
}
</style>
