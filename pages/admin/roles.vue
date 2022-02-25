<template>
  <div style="width: 100%">

    <ViewTitlePageSearch :titlePage="titlePage"  @clickSubmit="submitFS()" nameFS="q"/>
    <ButtonAdd @add="reset(), (dialog = !dialog)" />

    <ViewCustomTable :headTH="tableHead">
      <tr v-for="data in registersOfTable" :key="data.id" slot="registers-table">
        <td>
          <p class="mb-n1">{{ data.name }}</p>
          <v-btn-toggle
            class="my-2 mr-2"
            color="#006E80"
            x-small
            v-for="permission in data.permissions"
            :key="permission.pivot.id"
            outlined
          >
            <v-btn x-small outlined>{{permission.permission}}</v-btn>
            <v-btn x-small color="red" dark @click="removeRole(permission.pivot.id)">
              <v-icon x-small>mdi-close</v-icon>
            </v-btn>
          </v-btn-toggle>
        </td>
        <td width="220px" class="text-right">
          <!-- <v-btn class="my-1 mr-2 pa-n7" color="#006E80" fab x-small outlined dark :to="{name: 'admin-user', params: {id: data.id  } }" nuxt>
            <v-icon class="my-n3 pa-n7" small>mdi-arrow-right</v-icon>
          </v-btn> -->
          <ButtonGeneric iconButton="far fa-address-card" titleButton="FUNÇÕES" @actionClick="loadPermissions(data.id),dialogRoles = !dialogRoles"/>
          <ButtonDelete @delete="remove(data)" />
          <ButtonEdit @save="loadRegisterSelect(data), (dialog = !dialog)" />
        </td>
      </tr>
    </ViewCustomTable>

    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent>
        <ViewModalLight :title="titleModal" @close="dialog = false" @save="save">
          <div slot="contentForm">
            <v-row>
              <v-col cols="12" xs="12" sm="4" md="4" lg="4" xl="4">
                <FormTextField
                  label="Email*"
                  nameField="name"
                  v-model='dataOfTable.name'
                  :maxLength="$v.dataOfTable.name.$params.maxLength.max"
                  :appendIcon="$v.dataOfTable.name.$error ? 'mdi-alert-circle' : ''"
                  :validate="$v.dataOfTable.name.$error"
                  :msgvalidate="$v.dataOfTable.name"
                  :errordata="errors.data && errors.data.name"
                  @blur="$v.dataOfTable.name.$touch()"
                />
                <div class="hint-text-error" v-if="errors.data">
                  <p v-if="errors.data.name">
                    {{ errors.data.name }}
                  </p>
                </div>
              </v-col>
              <v-col cols="12" xs="12" sm="8" md="8" lg="8" xl="8">
                <FormTextField
                  label="description*"
                  nameField="description"
                  v-model='dataOfTable.description'
                  :minLength="$v.dataOfTable.description.$params.minLength.min"
                  :maxLength="$v.dataOfTable.description.$params.maxLength.max"
                  :appendIcon="$v.dataOfTable.description.$error ? 'mdi-alert-circle' : ''"
                  :validate="$v.dataOfTable.description.$error"
                  :msgvalidate="$v.dataOfTable.description"
                  :errordata="errors.data && errors.data.description"
                  @blur="$v.dataOfTable.description.$touch()"
                />
                <div class="hint-text-error" v-if="errors.data">
                  <p v-if="errors.data.description">
                    {{ errors.data.description }}
                  </p>
                </div>
              </v-col>



            </v-row>
          </div>
        </ViewModalLight>
      </v-dialog>

      <v-dialog v-model="dialogRoles" persistent>
        <ViewModalLight title="ADICIONAR PERFIL" @close="dialogRoles = false" @save="addPermissionsRole">
          <div slot="contentForm">
            <v-row>
              <v-col cols="12">
                <FormSelectField label="Perfis*" v-model="dataOfTable.permission_id" :itemsData="permissions"/>
              </v-col>
            </v-row>
          </div>
        </ViewModalLight>
      </v-dialog>


    </v-layout>

    <div class="text-xs-center mt-5">
      <v-pagination color="#F5B51F" v-if="paginate > 1" v-model="page" :length="paginate" :total-visible="7" circle/>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import crud from "@/components/api/_crud";
import { urlApi, urlAdmin, urlStorage } from "@/global";

import ViewTitlePageSearch from "~/components/designs/titles/ViewTitlePageSearch.vue";
import ButtonAdd from "~/components/buttons/ButtonAdd.vue";
import ButtonEdit from "~/components/buttons/ButtonEdit.vue";
import ButtonDelete from "~/components/buttons/ButtonDelete.vue";
import ButtonGeneric from "~/components/buttons/ButtonGeneric.vue";

import FormTextField from "~/components/forms/FormTextField.vue";
import FormSelectField from "~/components/forms/FormSelectField.vue";
import ViewCustomTable from "~/components/elements-views/ViewCustomTable.vue";
import ViewModalLight from "~/components/elements-views/ViewModalLight.vue";

import { required, email, minLength, maxLength, minValue, maxValue } from "vuelidate/lib/validators";

export default {
  middleware: ["clearValidationErrors"],
  mixins: [crud],
  layout: "restrict",
  components: {
      ButtonAdd,
      ButtonEdit,
      ButtonDelete,
      ButtonGeneric,
      ViewTitlePageSearch,
      FormTextField,
      FormSelectField,
      ViewCustomTable,
      ViewModalLight,
    },

  data: function () {
    return {
      pageApi: "roles",
      titleModal: "CADASTRAR PERFIL",
      titlePage: "PERFIL",
      tableHead: ["PERFIL | E-MAIL"],
      dialogRoles: false,
      permissions: [],
      userIdRole: "",
      permissionsRole: [],
    };
  },

  validations() {
    return {
      dataOfTable: {
        name: { required, minLength: minLength(5), maxLength: maxLength(20) },
        description: { required, minLength: minLength(5), maxLength: maxLength(120) },
      },
    };
  },



  methods: {

    loadPermissions(item) {
      const url = `${urlAdmin}/permissions/cb`;
      axios.get(url).then((res) => {
        this.permissions = res.data.map((permission) => {
          return {
            value: permission.id,
            text: permission.name,
          };
        });
      });
      this.userIdRole = item;
    },

    addPermissionsRole() {
      this.permissionsRole = [
        { permission_id: this.dataOfTable.permission_id, role_id: this.userIdRole },
      ];
      this.dataOfTable = this.permissionsRole;

      axios["post"](`${urlAdmin}/permissions/roles`, this.dataOfTable).then(
        () => {
          const Toast = this.$swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
          });
          Toast.fire({
            icon: "success",
            title: "Registro salvo!",
          });
          this.loadRegistersOfTable();
          this.hideModalPermissions();
        }
      );
    },

    removeRole(item) {
      this.hideModalPermissions(),
        this.$swal({
          title: "Deseja excluir?",
          text: "Você não poderá reverter essa ação!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Excluir",
          cancelButtonText: "Cancelar",
          showCloseButton: true,
        }).then((result) => {
          const id = item;
          if (result.value) {
            axios.delete(`${urlAdmin}/permissions/roles/${id}`).then(() => {
              this.loadRegistersOfTable();
            }),
            this.$swal({
              icon: "success",
              title: "Arquivo excluído",
              showConfirmButton: false,
              timer: 2000,
            });
          } else {
            this.$swal({
              icon: "warning",
              title: "Sem alteração.",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        });
    },

    hideModalPermissions() {
      this.reset();
      this.dialogRoles = false;
    },

    functionError(){
      return this.$v.dataOfTable.$invalid
    }
  },

  mounted() {
    this.loadPermissions();
  },


};
</script>

<style>
.bg-app-geddo {
  background-color: #cfd8dc;
}
</style>
