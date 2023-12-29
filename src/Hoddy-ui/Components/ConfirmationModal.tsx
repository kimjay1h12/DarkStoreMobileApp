import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";

import { colors, Typography, useColors } from "../../Hoddy-ui";

const ConfirmationModal = ({ isVisible, children }: any) => {
  const { width, height } = useWindowDimensions();
  const colors = useColors();

  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      width: 272,
      height: 178,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    buttonFlex: {
      flexDirection: "row",
      marginTop: 20,
    },
    buttonContainer: {
      width: 100,
      height: 40,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  return (
    <Modal
      visible={isVisible}
      transparent
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        width,
        height,
      }}
    >
      <View style={styles.centeredView}>{children}</View>
    </Modal>
  );
};

export default ConfirmationModal;
