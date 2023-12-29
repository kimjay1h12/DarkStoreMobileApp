export default function cartReducer(state, { payload, type }) {
  switch (type) {
    case "LOADING":
      return { ...state, error: null, loading: true };
    case "FETCHED_DATA":
      return {
        error: null,
        loading: false,
        data: payload,
      };

    case "ERROR":
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}

export const defaultCart = {
  error: null,
  data: [],
  loading: false,
};
