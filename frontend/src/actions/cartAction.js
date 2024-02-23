import axios from "axios";
import { ADD_TO_CART } from "../constants/cartConstants";

//getState to access the states
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.Stock,
      quantity,
    },
  });

  //Adding cart Items to local storage to prevent them vanishing when reloading app
  //cart here is store cart:cartReducers
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
