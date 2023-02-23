
//pinia
import { storeToRefs } from "pinia";
import { useAuthUserStore } from "src/stores/auth_user_store";
const { getAuthUserDetails } = storeToRefs(useAuthUserStore()); // store getters
export default () => {
  const userDetails = getAuthUserDetails.value || '';
  const token = userDetails.token ? { 'authorization': userDetails.token } : {};
  let content_type = "text/html"
  if (process.env.ENCRYPTION_ENABLED === "no") content_type = "application/json"
  return {
    "Content-Type": content_type,
    "Accept": content_type,
    "type": 'mobile_application', //specify if client is web or mobile app
    ...token,
  }
};
