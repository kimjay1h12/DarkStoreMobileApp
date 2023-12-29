import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";

const windowHeight = Dimensions.get("window").height;
import { FontAwesome } from "@expo/vector-icons";
import { useColors } from "../../src/Hoddy-ui";
const CustomPopup = ({ isVisible, toggleModal, children }) => {
  const colors = useColors();
  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onBackdropPress={toggleModal}
      onBackButtonPress={toggleModal}
      backdropOpacity={0.5}
      style={styles.modal}
    >
      <View
        style={[styles.popupContainer, { backgroundColor: colors.light.main }]}
      >
        {children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  popupContainer: {
    height: windowHeight * 0.5, // 50% of the screen height
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  closeButton: {
    padding: 10,
    alignItems: "flex-end",
  },
});

export default CustomPopup;
