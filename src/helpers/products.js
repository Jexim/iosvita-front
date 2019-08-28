import axios from "axios";
import config from "../config";

export async function getProducts(filters) {
  try {
    const productsResponse = await axios({
      method: "get",
      url: `${config.apiUrl}/products`,
      params: { ...filters }
    });

    return productsResponse.data.data;
  } catch (error) {
    throw error;
  }
}
