import { View, Modal, Pressable, StyleSheet, Dimensions } from "react-native";

import React, { useState } from "react";
import { IconButton } from "./Button";
import { ScaledSheet } from "react-native-size-matters";
import Typography from "./Typography";
import { PopupProps } from "../types";
import { useColors } from "../hooks";

const Popup: React.FC<PopupProps> = ({
  title,
  sheet,
  bare = false,
  children,
  open,
  onClose = () => {},
}) => {
  const colors = useColors();
  const [show, setShow] = useState(open);

  const styles: any = ScaledSheet.create({
    container: {
      marginTop: sheet ? "auto" : "50%",

      minHeight: sheet,
      maxHeight: "80%",
      backgroundColor: colors.white[2],
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomRightRadius: sheet ? 0 : 20,
      borderBottomLeftRadius: sheet ? 0 : 20,
      borderColor: colors.white[5],
      borderWidth: 0,
      alignSelf: "center",
      maxWidth: sheet ? undefined : "90%",
      width: sheet ? "100%" : undefined,
    },
    content: {
      paddingHorizontal: bare ? undefined : "10@ms",

      // flex: 1,
    },
    title: {
      flexDirection: "row",
      alignItems: "center",

      marginBottom: "10@ms",
    },
    backdrop: {
      position: "absolute",
      height: "100%",
      width: "100%",
      zIndex: 10000,
      backgroundColor: "#000b",
    },
  });

  React.useEffect(() => {
    setShow(open);
  }, [open]);

  const closeAction = () => {
    setShow(false);
    onClose();
  };

  return (
    <>
      {open && <Pressable style={styles.backdrop} />}
      <Modal
        transparent
        animationType="slide"
        visible={show}
        onRequestClose={() => setShow(false)}
      >
        {open && (
          <Pressable style={StyleSheet.absoluteFill} onPress={closeAction} />
        )}

        <View style={styles.container}>
          {!bare && (
            <View style={styles.title}>
              <IconButton size={20} icon="close" onPress={closeAction} />
              <View style={{ flex: 1 }}>
                <Typography color="textSecondary" align="center">
                  {title}
                </Typography>
              </View>
            </View>
          )}

          <View style={styles.content}>{children}</View>
        </View>
      </Modal>
    </>
  );
};

export default Popup;
