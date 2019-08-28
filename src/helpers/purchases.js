import axios from "axios";
import config from "../config";
import state from "../store";

export async function createPurchase(productsList) {
  try {
    const purchaseResponse = await axios({
      method: "post",
      url: `${config.apiUrl}/purchases/`,
      data: {
        products: productsList
      },
      headers: {
        "x-access-token": state.getState().auth.token
      }
    });

    return purchaseResponse.data.data;
  } catch (error) {
    throw error;
  }
}
