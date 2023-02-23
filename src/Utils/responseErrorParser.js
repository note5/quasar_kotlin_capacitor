import { decrypt } from "./encryptAndDecrypt";
import { negative } from "./notifications";
import router from "src/router";


export default ({ caller, error }) => {
  //
  if (process.env.DEV) console.log("responseErrorParser called from  ", caller, "error: ", error);
  //check if response is present
  const { response } = error;
  if (response) {
    let data = response.data

    // check if we have validation errors
    if (process.env.ENCRYPTION_ENABLED === "yes") data = JSON.parse(decrypt(data));
    const { validation_errors, user_error_message } = data
    if (validation_errors) return validationErrors(data);
    // show other response errors
     responseErrors(data);
     if (user_error_message) return user_error_message;
  }
  //else log the error
  if (process.env.DEV) console.log("responseErrorParser other error  " , error);
}

// show  response errors that are not validation errors
const responseErrors = (data) => {
  const {message} =  data
  negative({
    message: message,
    time: 5000,
    closeBtn: true,
    position: "top",
    color: "red",
  });
  if (process.env.DEV) console.log("error response  ", data);
}

// parse validation errors
const validationErrors = (data) => {
  const { errors } = data;
  let validation_errors = "";
  errors.forEach((error) => {
    const value = Object.values(error);
    if (value.length)
      validation_errors = validation_errors + value[0] + "<br>";
  });
  negative({
    message: validation_errors,
    time: 5000,
    closeBtn: true,
    position: "top",
    color: "red",
  });
  if (process.env.DEV) console.log("validation error response  ",data);
}
