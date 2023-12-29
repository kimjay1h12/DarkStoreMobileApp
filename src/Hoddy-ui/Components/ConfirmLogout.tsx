import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useColors } from "../hooks";
import ConfirmationModal from "./ConfirmationModal";
import Typography from "./Typography";

const ConfirmLogout = ({
  isVisible,
  setShowModal,
  title = null,
  text,
}: any) => {
  const colors = useColors();
  const styles = StyleSheet.create({
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      width: 272,
      height: title ? 242 : 178,
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
    <ConfirmationModal isVisible={isVisible}>
      <View style={styles.modalView}>
        {title ? (
          <Typography
            variant="body1"
            style={{ color: colors.grey.main, marginBottom: 12 }}
            align="center"
            fontWeight={600}
          >
            {title}
          </Typography>
        ) : null}
        <Typography
          variant="body1"
          style={{ color: colors.grey.main }}
          align="center"
        >
          {text}
        </Typography>
        <View style={styles.buttonFlex}>
          <TouchableOpacity
            onPress={() => setShowModal(false)}
            style={[
              styles.buttonContainer,
              { backgroundColor: colors.white[3], marginRight: 8 },
            ]}
          >
            <Typography
              variant="body1"
              style={{ color: colors.textSecondary.main }}
              align="center"
            >
              No
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonContainer,
              { backgroundColor: colors.blue.main },
            ]}
          >
            <Typography
              variant="body1"
              style={{ color: colors.white[1] }}
              align="center"
            >
              Yes
            </Typography>
          </TouchableOpacity>
        </View>
      </View>
    </ConfirmationModal>
  );
};

export default ConfirmLogout;
