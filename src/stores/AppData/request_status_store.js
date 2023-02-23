import { defineStore } from 'pinia';

export const useRequestStatusStore = defineStore('request_status_store', {
  state: () => ({
   request_status: "completed", // holds  status of requests as either completed or pending
  }),
  getters: {
    getRequestStatus: (state) => {
      return state.request_status
    },
  },
  actions: {
    setRequestStatus (status) {
      this.request_status = status
    },
  },
});
