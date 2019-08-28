import axios from "axios";
import config from "../config";

export async function login(userData) {
  try {
    const singInResponse = await axios({
      method: "post",
      url: `${config.apiUrl}/users/signin`,
      data: userData
    });

    return singInResponse.data.data;
  } catch (error) {
    throw error;
  }
}

export async function registration(userData) {
  try {
    const singUpResponse = await axios({
      method: "post",
      url: `${config.apiUrl}/users/signup`,
      data: userData
    });

    return singUpResponse.data.data;
  } catch (error) {
    throw error;
  }
}
