<template>
  <v-main>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs11 sm6 md4 lg3 xl3>
          <v-card class="elevation-8">
            <div style="width: 100%; text-align: center">
              <NuxtLink to="/">
                <img
                  class="ma-5 mb-2"
                  alt="Gestão Bytes"
                  style="width: 100%; max-width: 270px; text-align: center"
                  src="@/static/verticalLogoGB.svg"
                />
              </NuxtLink>
            </div>
            <v-card-text>
              <v-form @submit.prevent="userLogin" v-if="isLogin">
                <v-flex xs12 sm12 md12>
                  <v-alert v-if="errors == 'Unauthorized'" dense type="error" class="mb-4">E-mail ou senha incorreta.</v-alert>
                  <v-text-field
                    v-model.trim="form.email"
                    type="email"
                    name="email"
                    label="Email"
                    color="#0098b0"
                    outlined
                    dense
                    :append-icon="$v.form.email.$error ? 'mdi-alert-circle' : ''"
                    @blur="$v.form.email.$touch()"
                    :error="$v.form.email.$error"
                  />
                  <div class="hint-text-error" v-if="errors.email || $v.form.email.$error">
                    <p v-if="errors.email">{{ errors.email[0] }}</p>
                    <p v-else-if="!$v.form.email.required">E-mail é obrigatório.</p>
                    <p v-else-if="!$v.form.email.email">Endereço de e-mail inválido</p>
                  </div>
                </v-flex>

                <v-flex xs12 sm12 md12 class="mt-n2">
                  <v-text-field
                    v-model.trim="form.password"
                    type="password"
                    name="password"
                    label="Password"
                    color="#0098b0"
                    outlined
                    dense
                    :append-icon="$v.form.password.$error ? 'mdi-alert-circle' : ''"
                    :error="$v.form.password.$error"
                    @blur="$v.form.password.$touch()"
                  />
                  <div class="hint-text-error" v-if="errors.password || $v.form.password.$error">
                    <p v-if="errors.password">{{ errors.password[0] }}</p>
                    <p v-else-if="!$v.form.password.required">Senha é obrigatória.</p>
                    <p v-else-if="!$v.form.password.minLength || !$v.form.password.maxLength">
                      {{ $v.form.password.$params.minLength.min }} a
                      {{ $v.form.password.$params.maxLength.max }} caracteres.
                    </p>
                  </div>
                </v-flex>
                <v-btn
                  :disabled="this.$v.form.$invalid"
                  :dark="!this.$v.form.$invalid"
                  color="#0098b0"
                  block
                  type="submit"
                  :loading="loadingBtn"
                >
                  {{ this.$v.form.$invalid ? "Preencha o Formulário" : "Entrar" }}
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";
import { keyApplicationGB, urlApi } from "@/global";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";

export default {
  layout: "empty",
  middleware: ["guest", "clearValidationErrors"],

  data() {
    return {
      isLogin: true,
      loadingBtn: false,
      emailInUse: false,
      msgEmailInUse: null,
      dialogTerms: false,
      dialogPolicy: false,
      form: {
        email: "",
        password: "",
      },
    };
  },

  validations() {
    return {
      form: {
        email: { required, email },
        password: { required, minLength: minLength(6), maxLength: maxLength(20) },
      }
    };
  },
  methods: {
    userLogin() {
      this.loadingBtn = true;
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        this.login();
      } else {
        this.loadingBtn = false
        console.log("❌ Invalid form");
      }
    },


    async login() {
      try {
        let response = await this.$auth.loginWith("local", { data: this.form });
        this.$store.commit("setUser", response.data);
        localStorage.setItem(keyApplicationGB, JSON.stringify(response.data));
        this.$auth.setUser(response.data.user);
        this.$router.push("/admin");
      } catch (err) {
        this.loadingBtn = false;
        console.log(err);
      }
    },

  },

  head(){
    return {
      title: "LOGIN"
    }
  },

}
</script>
<style>
.v-input--selection-controls .v-input__slot > .v-label, .v-input--selection-controls .v-radio > .v-label {
  margin-top: 10px;
  margin-right: -2px;
    align-items: center;
    display: inline-flex;
}

</style>
