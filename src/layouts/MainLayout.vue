<template>
  <q-layout view="lHh Lpr lFf">
    <q-header >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"

        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
//pinia
import { storeToRefs } from "pinia";
import { useAuthUserStore } from "src/stores/auth_user_store.js"; // authenticated status store
import { useWebsocketConnectionStore } from "src/stores/AppData/websocket_connection_store"; // websocket store
const { getAuthUserDetails } = storeToRefs(useAuthUserStore()); // auth user store getters
const { setMoreUserDetails } = useAuthUserStore(); // store user details from api
const { setWSInstance } = useWebsocketConnectionStore(); // setter for ws instance

export default {
  mounted() {
    this.navigationGuard();
  },
  methods: {
    // check if authenticated
    navigationGuard() {
      if (!this.getAuthUserDetails) this.$router.replace('/auth/login')
      this.$router.beforeEach((to, from) => {
        const exception_pages = ['auth-page', 'registration-page']
        if (!this.getAuthUserDetails && !exception_pages.includes(to.name)) {
          return { path: '/auth/login' }
        }

      })
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
