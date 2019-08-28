import axios from "axios";
import config from "../config";

export async function getDks() {
  try {
    const dksResponse = await axios.get(`${config.apiUrl}/dks`);

    return dksResponse.data.data;
  } catch (error) {
    throw error;
  }
}
