<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-8">
          <material-card color="green" title="TMS Login">
            <v-card-text>
              <v-form>
                <v-text-field prepend-icon="mdi-account" name="login" label="Login" type="text"></v-text-field>
                <v-text-field
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
              <v-btn color="secondary" @click.stop="onLoginClick">Login</v-btn>
            </v-card-actions>
          </material-card>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { ShowBgImage, NotShowBgImage } from "@/utils/bgHelper";
export default {
  created() {
    ShowBgImage(
      "https://images.unsplash.com/photo-1497733942558-e74c87ef89db?dpr=1&auto=compress,format&fit=crop&w=1650&h=&q=80&cs=tinysrgb&crop="
    );
  },
  methods: {
    onLoginClick() {
      this.$router.push({ path: "/todaytrip" });
    }
  },
  destroyed() {
    NotShowBgImage();
  }
};
</script>

<style>
</style>
