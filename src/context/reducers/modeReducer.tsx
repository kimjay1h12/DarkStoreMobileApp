export default function modeReducer(state, payload, type) {
  switch (type) {
    case "LOADING":
      return { ...state, error: null, loading: true };
    case "Mode":
      return {
        mode: "",
        loading: false,
        error: null,
      };

    case "ERROR":
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}

export const defaultMode = {
  mode: "",
  loading: false,
  error: null,
};
