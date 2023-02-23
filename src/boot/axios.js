import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { decrypt } from 'src/Utils/encryptAndDecrypt'
import { Loading, QSpinnerClock } from "quasar";
import { useRequestStatusStore } from "src/stores/AppData/request_status_store"; // request status store
const { setRequestStatus } = useRequestStatusStore()

let baseURL = ""
let server_ip = "192.168.100.157:3000"
if (process.env.DEV) {
  baseURL = "http://192.168.100.157:3000"
  // if (process.env.DEV) baseURL = "https://core.saidiwa.com"
  // if (process.env.DEV) baseURL = "http://localhost:3000"
  // if (process.env.DEV) baseURL = "https://core.saidiwa.com"
}
else {
  baseURL = "https://core.saidiwa.com"
  server_ip = "core.saidiwa.com"
}
const api = axios.create({ baseURL })

export default boot(({ app, router }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api;
  //check request
  let pending_requests = 0;
  api.interceptors.request.use((config) => {
    const hide_loading_progress = config?.hide_loading_progress; //check if loader is shown or hidden
    pending_requests++;
    // if (!hide_loading_progress) Loading.show({
    //   spinner: QSpinnerClock,
    //   // message: "Requesting ...",
    //   spinnerColor: "amber"
    // });
    if (!hide_loading_progress) setRequestStatus("pending"); // set request status as pending
    return config;
  }, (error) => {
    pending_requests--;
    setTimeout(() => {
      Loading.hide();
    }, 500)
    setRequestStatus("completed"); // set status as request completed
    return Promise.reject(error);
  });
  //check response
  api.interceptors.response.use((config) => {
    pending_requests--;
    if (pending_requests <= 0) {
      setTimeout(() => {
        Loading.hide();
      }, 500);
      setRequestStatus("completed"); // set status as request completed
    }
    return config;
  }, (error) => {
    pending_requests--;
    if (pending_requests <= 0) {
      setTimeout(() => {
        Loading.hide();
      }, 1000);
      setRequestStatus("completed")
    }
    if (error?.response?.status === 401) {
      let force_logout = error.response.data?.results?.force_logout
      if (process.env.ENCRYPTION_ENABLED === "yes") {
        force_logout = JSON.parse(decrypt(error.response.data))?.results?.force_logout
      }
      console.log("************ axios error ", force_logout);
      if (force_logout) router.push("/auth/login")
    }
    return Promise.reject(error);
  });

})

export { api, baseURL, server_ip }
