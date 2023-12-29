import AsyncStorage from "@react-native-async-storage/async-storage";

export default function authReducer(state, { type, payload }) {
  switch (type) {
    case "LOADING":
      return { ...state, loading: true, error: null };
    case "VERIFIED":
      return {
        loading: false,
        loggedIn: false,
        isOtpVerfified: true,
        error: null,
        data: { ...payload },
      };
    case "ERROR":
      return { ...state, loading: false, error: payload };
    case "LOGGED_OUT":
      return { ...state, data: {}, loggedIn: false };
    case "UPDATED_USER":
      AsyncStorage.setItem(
        "userData",
        JSON.stringify({ ...state.data, ...payload })
      );
      return {
        ...state,
        loading: false,
        error: null,
        data: { ...state.data, ...payload },
      };
    case "SUCCESS":
      return {
        loading: false,
        loggedIn: true,
        error: null,
        data: { ...payload },
      };
    default:
      return { ...state, loading: false };
  }
}

export const defaultAuth = {
  loading: false,
  loggedIn: false,
  isOtpVerfified: false,
  data: {},
  error: null,
};
