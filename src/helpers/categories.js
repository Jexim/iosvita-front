import axios from "axios";
import config from "../config";

export async function getCategories() {
  try {
    const categoriesResponse = await axios.get(`${config.apiUrl}/categories`);

    return categoriesResponse.data.data;
  } catch (error) {
    throw error;
  }
}
