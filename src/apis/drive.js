import { getFromLocalStorage } from "$/lib/localstorage";
import axios from "axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
export const getFiles = async (page = "") => {
  try {
    const token = getFromLocalStorage("token");
    const { data } = await axios.get(apiBaseUrl + "/users/drive/files", {
      headers: {
        Authorization: token,
        page,
      },
    });
    return data;
  } catch (e) {
    return { status: "!200" };
  }
};

export const getInfo = async () => {
  try {
    const token = getFromLocalStorage("token");
    const { data } = await axios.get(apiBaseUrl + "/users/drive/info", {
      headers: {
        Authorization: token,
      },
    });
    return data;
  } catch (e) {
    return { status: "!200" };
  }
};
