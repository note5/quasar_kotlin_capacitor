
<template>
  <q-page class="flex flex-center">
    <div class="">
      <div class="q-my-xl">
        <div class="text-h4">{{ emitted_data }}</div>
      </div>
      <!-- start  -->
      <div class="q-my-lg">
        <q-btn color="green" class="full-width" @click="startService">Start Service</q-btn>
      </div>
      <!-- start  -->
      <div class="q-my-lg">
        <q-btn color="green" class="full-width" @click="startForeground">Start Service</q-btn>
      </div>
      <!-- stop  -->
      <div class="q-my-lg">
        <q-btn color="red" class="full-width" @click="stopService">Stop Service</q-btn>
      </div>
      <!-- stop  -->
      <div class="q-my-lg">
        <q-btn color="red" class="full-width" @click="stopForegroundService">Stop ForegroundService</q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import Player from 'src/Plugins/Player'

export default {
  data(){
    return {
      emitted_data:[],
    }
  },
  created() {
    Player.addListener('myPluginEvent', (data) => {
      this.emitted_data.push( data)
  console.log('CHEMAIN Response from native 888888 :', JSON.stringify(data));
});
  },
  methods: {
    async startService() {
      const { value } = await Player.echo({ value: 'start' });
      console.log('CHEMAIN Response from native:', value);
    },
    async startForeground() {
      const { value } = await Player.echo({ value: 'start_foreground' });
      console.log('CHEMAIN Response from native:', value);
    },
    async stopService() {
      const { value } = await Player.echo({ value: 'stop' });
      console.log('CHEMAIN Response from native:', value);
    },
    async stopForegroundService() {
      const { value } = await Player.echo({ value: 'stop_foreground' });
      console.log('CHEMAIN Response from native:', value);
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
