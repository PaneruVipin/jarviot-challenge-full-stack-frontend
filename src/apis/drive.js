import { getFromLocalStorage } from "$/lib/localstorage";
import axios from "axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
export const getFiles = async (page = "") => {
  try {
    const token =
      getFromLocalStorage("token") ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ3STYyZExmVjJ3WlpZbjlLaTdwWCIsImlhdCI6MTY5MTg0MjA3NSwiZXhwIjoxNjkyMTAxMjc1fQ.ZkShKuRWMZF3J9ROh14Q9WfvXEH6N9cm_HJNNC3eXNo";
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
