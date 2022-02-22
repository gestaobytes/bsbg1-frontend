<template>
  <div style="width: 100%">

    <ViewTitlePageSearch :titlePage="titlePage"  @clickSubmit="submitFS()" nameFS="q"/>
    <ButtonAdd @add="reset(), (dialog = !dialog)" />

    <ViewCustomTable :headTH="tableHead">
      <tr v-for="data in registersOfTable" :key="data.id" slot="registers-table">
        <td>
          <p class="mb-n1">{{ data.email }} | {{ data.cpf }}</p>
          <v-btn-toggle
            class="my-2 mr-2"
            color="#006E80"
            x-small
            v-for="role in data.roles"
            :key="role.pivot.id"
            outlined
          >
            <v-btn x-small outlined>{{role.role}}</v-btn>
            <v-btn x-small color="red" dark @click="removeRole(role.pivot.id)">
              <v-icon x-small>mdi-close</v-icon>
            </v-btn>
          </v-btn-toggle>
        </td>
        <td width="220px" class="text-right">
          <ButtonGeneric iconButton="far fa-address-card" titleButton="FUNÇÕES" @actionClick="loadRoles(data.id),dialogRoles = !dialogRoles"/>
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

              <v-col sm="4" md="4" lg="4" xl="4">
                <FormTextField
                  type="text"
                  label="Nome*"
                  nameField="name"
                  v-model='dataOfTable.name'
                  :minLength="$v.dataOfTable.name.$params.minLength.min"
                  :maxLength="$v.dataOfTable.name.$params.maxLength.max"
                  :appendIcon="$v.dataOfTable.name.$error ? 'mdi-alert-circle' : ''"
                  :validate="$v.dataOfTable.name.$error"
                  :msgvalidate="$v.dataOfTable.name"
                  :errordata="errors.data && errors.data.name"
                  @blur="$v.dataOfTable.name.$touch()"
                />
              </v-col>

              <v-col sm="4" md="4" lg="4" xl="4">
                <FormTextField
                  v-mask="'(##)#####-####'"
                  label="Celular*"
                  nameField="phone"
                  v-model='dataOfTable.phone'
                  :maxLength="$v.dataOfTable.phone.$params.maxLength.max"
                  :appendIcon="$v.dataOfTable.phone.$error ? 'mdi-alert-circle' : ''"
                  :validate="$v.dataOfTable.phone.$error"
                  :msgvalidate="$v.dataOfTable.phone"
                  :errordata="errors.data && errors.data.phone"
                  @blur="$v.dataOfTable.phone.$touch()"
                />
              </v-col>

              <v-col sm="4" md="4" lg="4" xl="4">
                <FormTextField
                  v-mask="'(##)#####-####'"
                  label="Celular 2"
                  nameField="cellphone"
                  v-model='dataOfTable.cellphone'
                  :minLength="$v.dataOfTable.cellphone.$params.minLength.min"
                  :maxLength="$v.dataOfTable.cellphone.$params.maxLength.max"
                  :appendIcon="$v.dataOfTable.cellphone.$error ? 'mdi-alert-circle' : ''"
                  :validate="$v.dataOfTable.cellphone.$error"
                  :msgvalidate="$v.dataOfTable.cellphone"
                  :errordata="errors.data && errors.data.cellphone"
                  @blur="$v.dataOfTable.cellphone.$touch()"
                />
              </v-col>

              <v-col cols="12" sm="6" md="4" lg="3" xl="3">
                <v-card outlined>
                  <v-radio-group
                    class="ml-2 mt-n1 mb-n5"
                    mandatory
                    v-model="dataOfTable.type"
                    row
                  >
                    <v-radio label="Cliente" value="C" />
                    <v-radio label="Colaborador" value="F" />
                  </v-radio-group>
                </v-card>
              </v-col>

              <v-col sm="5" md="5" lg="5" xl="5">
                <FormTextField
                  type="text"
                  label="Registro*"
                  nameField="registration "
                  v-model='dataOfTable.registration '
                  :minLength="$v.dataOfTable.registration .$params.minLength.min"
                  :maxLength="$v.dataOfTable.registration .$params.maxLength.max"
                  :appendIcon="$v.dataOfTable.registration .$error ? 'mdi-alert-circle' : ''"
                  :validate="$v.dataOfTable.registration .$error"
                  :msgvalidate="$v.dataOfTable.registration "
                  :errordata="errors.data && errors.data.registration "
                  @blur="$v.dataOfTable.registration .$touch()"
                />
              </v-col>

              <v-col sm="5" md="5" lg="5" xl="5">
                <FormTextField
                  type="email"
                  label="Email*"
                  nameField="email"
                  v-model='dataOfTable.email'
                  :maxLength="$v.dataOfTable.email.$params.maxLength.max"
                  :appendIcon="$v.dataOfTable.email.$error ? 'mdi-alert-circle' : ''"
                  :validate="$v.dataOfTable.email.$error"
                  :msgvalidate="$v.dataOfTable.email"
                  :errordata="errors.data && errors.data.email"
                  @blur="$v.dataOfTable.email.$touch()"
                />
              </v-col>

              <v-col sm="3" md="3" lg="3" xl="3">
                <FormTextField label="Senha*" v-model="dataOfTable.password" />
                <div class="hint-text-error" v-if="errors.data">
                  <p v-if="errors.data.password">{{ errors.data.password }}</p>
                </div>
              </v-col>

              <v-col cols="12" sm="6" md="4" lg="3" xl="3">
                <v-card outlined>
                  <v-radio-group
                    class="ml-2 mt-n1 mb-n5"
                    mandatory
                    v-model="dataOfTable.status"
                    row
                  >
                    <v-radio label="ON" value="1" />
                    <v-radio label="OFF" value="0" />
                    <v-radio label="STANDBY" value="-" />
                  </v-radio-group>
                </v-card>
              </v-col>

            </v-row>

          </div>
        </ViewModalLight>
      </v-dialog>

      <v-dialog v-model="dialogRoles" persistent>
        <ViewModalLight title="ADICIONAR PERFIL" @close="dialogRoles = false" @save="addRolesOfUser">
          <div slot="contentForm">
            <v-row>
              <v-col cols="12">
                <FormSelectField label="Perfis*" v-model="dataOfTable.role_id" :itemsData="roles"/>
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
import VueMask from "v-mask";

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
  middleware: ["auth", "clearValidationErrors"],
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
      pageApi: "users",
      titleModal: "CADASTRAR USUÁRIOS",
      titlePage: "USUÁRIOS",
      tableHead: ["USUÁRIO | E-MAIL"],
      dialogRoles: false,
      roles: [],
      userIdRole: "",
      rolesOfUser: [],
    };
  },

  validations() {
    return {
      dataOfTable: {
        name: { required, minLength: minLength(5), maxLength: maxLength(80) },
        email: { required, email, maxLength: maxLength(120) },
        phone: { maxLength: maxLength(14) },
        cellphone: { required,  minLength: minLength(13), maxLength: maxLength(14) },
        registration: { required,  minLength: minLength(3), maxLength: maxLength(20) },
      },
    };
  },



  methods: {

    loadRoles(item) {
      const url = `${urlAdmin}/roles/cb`;
      axios.get(url).then((res) => {
        this.roles = res.data.map((role) => {
          return {
            value: role.id,
            text: role.name,
          };
        });
      });
      this.userIdRole = item;
    },

    addRolesOfUser() {
      this.rolesOfUser = [
        { role_id: this.dataOfTable.role_id, user_id: this.userIdRole },
      ];
      this.dataOfTable = this.rolesOfUser;

      axios["post"](`${urlAdmin}/roles/users`, this.dataOfTable).then(
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
          this.hideModalRoles();
        }
      );
    },

    removeRole(item) {
      this.hideModalRoles(),
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
            axios.delete(`${urlAdmin}/roles/users/${id}`).then(() => {
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

    hideModalRoles() {
      this.reset();
      this.dialogRoles = false;
    },

    functionError(){
      return this.$v.dataOfTable.$invalid
    }
  },

  mounted() {
    this.loadRoles();
  },


};
</script>

<style>
.bg-app-geddo {
  background-color: #cfd8dc;
}
</style>
