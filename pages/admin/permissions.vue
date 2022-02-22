<template>
  <div style="width: 100%">
    <!-- cabeçalho com titulo e pesquisa -->
    <ViewTitlePageSearch
      :titlePage="titlePage"
      @clickSubmit="submitFS()"
      nameFS="q"
    />
    <ButtonAdd @add="reset(), (dialog = !dialog)" />

    <!-- exibição dos dados em tabela -->
    <ViewCustomTable :headTH="tableHead" :registers="registersOfTable">
      <tr
        v-for="data in registersOfTable"
        :key="data.id"
        slot="registers-table"
      >
        <td width="150px">{{ data.name }}</td>
        <td>{{ data.description }}</td>
        <td width="120px" class="text-right">
          <ButtonDelete @delete="remove(data)" />
          <br v-if="$vuetify.breakpoint.xs" />
          <ButtonEdit @save="loadRegisterSelect(data), (dialog = !dialog)" />
        </td>
      </tr>
    </ViewCustomTable>

    <!-- formulário com os campos de cadastro -->
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent>
        <ViewModalLight :title="titleModal" @close="dialog = false" @save="save">
          <v-row slot="contentForm">
            <v-col cols="12" xs="12" sm="4" md="4" lg="4" xl="4">
              <FormTextField label="Nome*" v-model="dataOfTable.name" />
              <div class="hint-text-error" v-if="errors.data">
                <p v-if="errors.data.name">{{ errors.data.name }}</p>
              </div>
            </v-col>
            <v-col cols="12" xs="12" sm="8" md="8" lg="8" xl="8">
              <FormTextField
                label="Descrição*"
                v-model="dataOfTable.description"
              />
              <div class="hint-text-error" v-if="errors.data">
                <p v-if="errors.data.description">
                  {{ errors.data.description }}
                </p>
              </div>
            </v-col>
          </v-row>
        </ViewModalLight>
      </v-dialog>
    </v-layout>

    <div class="text-xs-center mt-5">
      <v-pagination
        color="#F5B51F"
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
import crud from "@/components/api/_crud";

import ViewTitlePageSearch from "~/components/designs/titles/ViewTitlePageSearch.vue";
import ButtonAdd from "~/components/buttons/ButtonAdd.vue";
import ButtonEdit from "~/components/buttons/ButtonEdit.vue";
import ButtonDelete from "~/components/buttons/ButtonDelete.vue";
import ButtonGeneric from "~/components/buttons/ButtonGeneric.vue";

import FormTextField from "~/components/forms/FormTextField.vue";
import FormSelectAutocomplete from "~/components/forms/FormSelectAutocomplete.vue";
import FormSelectField from "~/components/forms/FormSelectField.vue";
import ViewCustomTable from "~/components/elements-views/ViewCustomTable.vue";
import ViewModalLight from "~/components/elements-views/ViewModalLight.vue";

export default {
  middleware: ["auth", "clearValidationErrors"],
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
    FormTextField,
  },
  data: function () {
    return {
      pageApi: "permissions",
      titleModal: "CADASTRAR ÓRGÃO",
      titlePage: "PERMISSÕES",
      tableHead: ["NOME", "DESCRIÇÃO"],
      search: "",
      permissionsUser: {},
    };
  },
  mounted() {
    this.permissionsUser = this.$store.state.user.permissions;
    // console.log(this.permissionsUser);
  },
};
</script>

<style>
</style>
