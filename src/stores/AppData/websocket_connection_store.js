import { defineStore } from 'pinia';

export const useWebsocketConnectionStore = defineStore('websocket_connection_store', {
  state: () => ({
   ws: null, // holds the ws instance
  }),
  getters: {
    getWSInstance: (state) => {
      return state.ws
    },
  },
  actions: {
    setWSInstance (ws) {
      this.ws = ws
    },
  },
});
