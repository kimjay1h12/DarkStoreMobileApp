import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import client from "../../../api/client";
import { errorMessage } from "../../../utility";

export const signupHandler = async (data, dispatch) => {
  dispatch({
    type: "LOADING",
  });
  try {
    const res = await client.post("/users/signup", data);

    await AsyncStorage.setItem("nd-rest-tkn", res.data?.token);
    await AsyncStorage.setItem("userData", JSON.stringify(res.data.data));
    dispatch({
      type: "SUCCESS",
      payload: {
        ...res.data.data,
        token: res.data.token,
      },
    });
    return true;
  } catch (error) {
    Alert.alert(error.response.data.error);
    console.log(error.response);
    dispatch({
      type: "ERROR",
      payload: error?.response?.data?.message,
    });

    return false;
  }
};

export const resendOtpHandler = async (data, dispatch) => {
  // return alert(data.otp, data.email);
  dispatch({
    type: "LOADING",
  });
  try {
    const res = await client.post("/users/resendotp", data);
    dispatch({});
    return true;
  } catch (error) {
    console.log("Error", error.response);
    dispatch({
      type: "ERROR",
      payload: error?.response?.data?.message,
    });

    return false;
  }
};
export const GetResetPasswordOtp = async (data) => {
  // return alert(data.otp, data.email);

  try {
    const res = await client.post("/customer/password/reset/otp", data);
    Alert.alert("success", `An Otp han been sent to ${data?.email}`);
    return true;
  } catch (error) {
    console.log("Error", error.response);
    Alert.alert(error.response?.data?.message);

    return false;
  }
};
export const verifyOTP = async (data, dispatch) => {
  // return alert(data.otp, data.email);
  const token = await AsyncStorage.getItem("nd-rest-tkn");
  console.log("data", data);
  dispatch({
    type: "LOADING",
  });
  try {
    const res = await client.get(`/users/verify/${data}`, );

    getCurrentUser(dispatch);

    dispatch({
      type: "SUCCESS",
      payload: {
        ...res.data.data,
        token: token,
      },
    });
    // dispatch({});
    return true;
  } catch (error) {
    Alert.alert(error.response?.data?.message);
    dispatch({
      type: "ERROR",
      payload: error?.response?.data?.message,
    });
    return false;
  }
};
export const verifyResetPasswodOTP = async (data) => {
  // return alert(data.otp, data.email);

  try {
    const res = await client.post("/customer/password/reset/otp/verify", data);

    // dispatch({});
    return true;
  } catch (error) {
    Alert.alert(error.response?.data?.message);

    return false;
  }
};
export const ResetPassword = async (data) => {
  // return alert(data.otp, data.email);

  try {
    const res = await client.post("/customer/password/reset", data);
    Alert.alert("success", "Password Reset Successful Proceed To login");
    // dispatch({});
    return true;
  } catch (error) {
    Alert.alert(error.response?.data?.message);

    return false;
  }
};

export const signoutHandler = async (dispatch) => {
  try {
    await AsyncStorage.multiRemove(["userData", "nd-rest-tkn","cartData" ]);
  } catch (error) {
    console.log("Storage already removed");
  }
  dispatch({
    type: "LOGGED_OUT",
  });
};

export const signInHandler = async (data, dispatch) => {
  dispatch({
    type: "LOADING",
  });
  try {
    const res = await client.post("/users/login", data);
    await AsyncStorage.setItem("nd-rest-tkn", res.data?.token);
    await AsyncStorage.setItem("userData", JSON.stringify(res.data.data));
    dispatch({
      type: "SUCCESS",
      payload: {
        ...res.data.data,
        token: res.data.token,
      },
    });
    // dispatch({});
    // getCurrentUser(dispatch);
    return true;
  } catch (error) {
    Alert.alert(error.response?.data?.error);
    dispatch({
      type: "ERROR",
      payload: error?.response?.data?.message,
    });
    return false;
  }
};
export const Perferences = async (data, dispatch) => {
  dispatch({
    type: "LOADING",
  });
  const token = await AsyncStorage.getItem("nd-rest-tkn");
  try {
    const res = await client.post("/customer/category", data);

    dispatch({
      type: "SUCCESS",
      payload: {
        ...res.data.data,
        token: token,
      },
    });
    // dispatch({});
    getCurrentUser(dispatch);
    return true;
  } catch (error) {
    console.log("Error", error.response || error);
    dispatch({
      type: "ERROR",
      payload: error?.response?.data?.message,
    });
    return false;
  }
};

export const getCurrentUser = async (dispatch) => {
  const token = await AsyncStorage.getItem("nd-rest-tkn");
  dispatch({
    type: "LOADING",
  });
  try {
    const user = (await client.get("/users/current")).data;
    await AsyncStorage.setItem("userData", JSON.stringify(user.data.data));
    console.log("user", user);
    dispatch({
      type: "SUCCESS",
      payload: {
        ...user.data.data,
        token: token,
      },
    });
  } catch (error) {
    console.log("Couldn't get user", errorMessage(error));
    if (error?.response?.status === 401)
      Alert.alert("Session expired", "Please login again");
    dispatch({
      type: "ERROR",
      payload: errorMessage(error),
    });
  }
};

export const forgotPassword = async (email) => {
  try {
    const res = (await client.post("customer/forgotPassword", { email })).data;
    return true;
  } catch (error) {
    Alert.alert(
      "Error sending reset email",
      error?.response?.data?.message || "Something went wrong"
    );
    return false;
  }
};

export const updateUser = async (data, dispatch) => {
  dispatch({
    type: "LOADING",
  });
  try {
    const res = (await client.post("/customer/info/edit", data)).data;
    Alert.alert("Success");
    getCurrentUser(dispatch);
    return true;
  } catch (error) {
    Alert.alert("Error updating user", errorMessage(error));
    console.log("Error updating user", error.response);
    return false;
  }
};
