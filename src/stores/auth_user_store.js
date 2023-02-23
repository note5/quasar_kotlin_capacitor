import { defineStore } from 'pinia';
import { decrypt, encrypt } from 'src/Utils/encryptAndDecrypt';

export const useAuthUserStore = defineStore('auth_user_store', {
  state: () => ({
    auth_user_details: "",
    more_user_details:"",
  }),
  getters: {
    getAuthUserDetails: (state) => {
      if (state.auth_user_details) return state.auth_user_details
      if (state.auth_user_details === "") {
        let auth_user = localStorage.getItem('user_auth_data');
        if (!auth_user) return "";
        state.auth_user_details = JSON.parse(decrypt(auth_user))
        return state.auth_user_details
      }
    },
    getMoreUserDetails: (state) => state.more_user_details,
  },
  actions: {
    setAuthUserDetails(auth_user_details) {
      this.auth_user_details = auth_user_details;
      localStorage.setItem('user_auth_data', encrypt(JSON.stringify(auth_user_details)))
    },
    setMoreUserDetails(more_user_details){
      this.more_user_details =  more_user_details
    },
    // logout
    logout(){
      localStorage.removeItem("user_auth_data");
      this.auth_user_details = ""
    }

  },
});
