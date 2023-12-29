import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    zIndex: 0,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  origin: {
    width: 50,
  },
  user: {},
});
export default styles;
