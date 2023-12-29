import { Alert } from "react-native";
import client from "../../../api/client";
import { errorMessage } from "../../../utility";

export const checkout = async (data, dispatch) => {
  dispatch({
    type: "LOADING",
  });
  try {
    const res = (await client.post("/customer/checkout", data)).data;
    getOrders(dispatch);
    return res.data;
  } catch (error) {
    console.log("Couldn't checkout", errorMessage(error));
    Alert.alert(
      "Couldn't checkout",
      error.response?.data?.message || "Something went wrong"
    );
    dispatch({
      type: "ERROR",
      payload: errorMessage(error),
    });
    return null;
  }
};
export const getFavourite = async (dispatch) => {
  dispatch({
    type: "LOADING",
  });
  try {
    const res = (await client.get("/customer/product/favourites")).data;
    dispatch({
      type: "FETCHED_DATA",
      payload: res.data,
    });
  } catch (error) {
    console.log("Couldn't get Favourite", error.response);
    dispatch({
      type: "ERROR",
      payload: error.response || "Something went wrong",
    });
  }
};

export const getOrders = async (dispatch) => {
  dispatch({
    type: "LOADING",
  });
  try {
    const res = (await client.get("/customer/orders")).data;

    dispatch({
      type: "FETCHED_DATA",
      payload: res.data,
    });
  } catch (error) {
    console.log("Couldn't get orders", error.response);
    dispatch({
      type: "ERROR",
      payload: error.response || "Something went wrong",
    });
  }
};
