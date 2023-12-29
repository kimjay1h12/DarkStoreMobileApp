export default function riderReducer(state, { type, payload }) {
  switch (type) {
    case "LOADING":
      return { ...state, loading: true, active: false };
    case "ACTIVE_TRIP":
      return { ...state, loading: false, activeTrip: payload, active: true };
    default:
      return state;
  }
}

export const defaultTrip = {
  loading: false,
  active: false,
  activeTrip: null,
  trips: [],
};
