import * as React from "react";
import { Modal as RNModal, StyleSheet, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useReTheme } from "../../theme";
import { Box } from "../Themed";

import Header from "./Header";

const wWidth = Dimensions.get("window").width;

interface ModalProps {
  children?: React.ReactNode;
  visible: boolean;
}

const Modal = ({ children, visible }: ModalProps) => {
  const insets = useSafeAreaInsets();
  const theme = useReTheme();
  const modalWidth = wWidth - theme.spacing.sm * 2;

  return (
    <RNModal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        console.log("close");
      }}
    >
      <Box style={[styles.centeredView, { bottom: insets.bottom }]}>
        <Box
          width={modalWidth}
          borderRadius="ml"
          padding="ml"
          paddingTop="l"
          style={styles.modalView}
        >
          {children}
        </Box>
      </Box>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    position: "absolute",
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

Modal.Header = Header;

export default Modal;
