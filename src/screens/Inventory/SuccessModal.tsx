import * as React from "react";

import { Button, Modal, Text } from "../../components";
import { useReTheme } from "../../theme";

interface SuccessModalProps {
  visible: boolean;
  onPress: () => void;
  name: string;
  price: string;
}

const SuccessModal = ({ visible, name, price, onPress }: SuccessModalProps) => {
  const theme = useReTheme();
  return (
    <Modal visible={visible}>
      <Modal.Header title="Object successfully added" icon="ios-checkmark" />
      <Text textAlign="left" style={{ width: "100%" }}>
        <Text
          variant="label2"
          color="secondary"
          style={{ fontFamily: "SFProDisplay-Regular", lineHeight: 24 }}
        >
          The estimated value of your {name} is{" "}
        </Text>
        <Text
          textAlign="left"
          variant="label2"
          color="secondary"
          style={{ lineHeight: 24 }}
        >
          {price} €.{" "}
        </Text>
      </Text>
      <Text textAlign="left" style={{ width: "100%" }}>
        <Text
          textAlign="left"
          variant="label2"
          color="secondary"
          style={{ fontFamily: "SFProDisplay-Regular", lineHeight: 24 }}
        >
          If something ever happens to it, it’ll be covered and refunded.
        </Text>
      </Text>
      <Button
        containerStyle={{ marginTop: theme.spacing.l }}
        backgroundColor="primary"
        label="Great !"
        onPress={onPress}
      />
    </Modal>
  );
};

export default SuccessModal;
