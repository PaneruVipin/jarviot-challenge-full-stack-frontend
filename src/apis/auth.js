import { getFromLocalStorage } from "$/lib/localstorage";
import axios from "axios";
const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
export const revokeAccess = () => {
  try {
    const token = getFromLocalStorage("token");
    axios.delete(apiBaseUrl + "/google/revoke", {
      headers: {
        Authorization: token,
      },
    });
    return;
  } catch (e) {
    return;
  }
};
