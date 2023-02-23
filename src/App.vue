<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { SplashScreen } from '@capacitor/splash-screen';
SplashScreen.show({
  autoHide: true,
  showDuration: 3000,

});
export default defineComponent({
  name: 'App'
})
</script>
