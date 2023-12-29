import { Alert } from "react-native";
import client from "../../../api/client";

export const GetAllProducts = async (dispatch) => {
  dispatch({
    type: "LOADING",
  });

  try {
    const res = await client.get("/products");

    dispatch({
      type: "FETCHED_DATA",
      payload: res.data.data,
    });
    // console.log(res)
    // dispatch({});
    // getCurrentUser(dispatch);
    return true;
  } catch (error) {
    console.log("error fetching product", error.response);
    dispatch({
      type: "ERROR",
      payload: error?.response?.data?.message,
    });
    return false;
  }
};
export const GetAllPromotions = async (dispatch) => {
  dispatch({
    type: "LOADING",
  });
  try {
    const res = await client.get("/customer/promotions");

    dispatch({
      type: "FETCHED_DATA",
      payload: res.data.data,
    });
    // dispatch({});
    // getCurrentUser(dispatch);
    return true;
  } catch (error) {
    console.log("Error Fetching Promotion", error.response);

    dispatch({
      type: "ERROR",
      payload: error?.response?.data?.message,
    });
    return false;
  }
};
export const AddProductToFavourite = async (data, dispatch) => {
  dispatch({
    type: "LOADING",
  });
  try {
    const res = await client.post("/customer/product/favourites", data);

    dispatch({
      type: "FETCHED_DATA",
      payload: res.data.data,
    });
    Alert.alert("Product Added To Favourite");
    // dispatch({});
    // getCurrentUser(dispatch);
    return true;
  } catch (error) {
    console.log("Error Fetching Promotion", error.response);

    dispatch({
      type: "ERROR",
      payload: error?.response?.data?.message,
    });
    return false;
  }
};
