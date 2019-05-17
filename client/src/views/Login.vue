<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-8" style="opacity: 0.95;">
          <material-card color="blue" title="Login">
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="username"
                  data-vv-name="username"
                  v-validate="'required|min:4'"
                  :error-messages="errors.collect('username')"
                  prepend-icon="mdi-account"
                  label="Login"
                  type="text"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  data-vv-name="password"
                  v-validate="'required|min:6'"
                  :error-messages="errors.collect('password')"
                  prepend-icon="mdi-lock"
                  name="password"
                  label="Password"
                  id="password"
                  type="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :loading="loading" color="blue" @click.stop="onLoginClick">Login</v-btn>
            </v-card-actions>

            <v-flex xs12 class="text-xs-center pa-2">
              <router-link to="/signup">ลงทะเบียน</router-link>
            </v-flex>
          </material-card>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { ShowBgImage, NotShowBgImage } from "@/utils/bgHelper";
export default {
  data() {
    return {
      username: "",
      password: "",
      submitted: false,
      loading: false
    };
  },
  created() {
    ShowBgImage("/img/bg.png");
  },
  methods: {
    async onLoginClick() {
      const valid = await this.$validator.validateAll();
      if (!valid) {
        alert("กรุณากรอกข้อมูลให้สมบรูณ์");
        return;
      }

      this.loading = true;
      try {
        var res = await this.$store.dispatch("auth/authenticate", {
          strategy: "local",
          UserName: this.username,
          Password: this.password
        });

        this.$router.push("/home");
      } catch (error) {
        alert('login ไม่สำเร็จ ['  + error.message +']');
      } finally {
        this.loading = false;
      }
    }
  },
  destroyed() {
    NotShowBgImage();
  }
};
</script>

<style>
</style>
