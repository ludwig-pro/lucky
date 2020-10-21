import * as React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";

import { useReTheme } from "../theme";

import WithLabel from "./WithLabel";
import { Text, Box } from "./Themed";

interface DatePickerProps {
  containerStyle?: StyleProp<ViewStyle>;
  label?: string;
  disabled?: boolean;
  error?: boolean;
  onBlur: () => void;
  date: string;
  onChangeDate: (e: string) => void;
}

const DatePicker = ({
  containerStyle,
  label,
  disabled,
  error,
  onChangeDate,
  date,
  onBlur,
}: DatePickerProps) => {
  const theme = useReTheme();
  const [focused, setFocused] = React.useState(false);
  const [show, setShow] = React.useState(false);

  const displayPicker = () => {
    setShow(true);
    setFocused(true);
  };

  const cancelHandler = () => {
    setShow(false);
    onChangeDate("");
    onBlur();
  };

  const hideDatePicker = () => {
    setShow(false);
    onBlur();
  };

  const handleConfirm = (selectedDate: Date) => {
    onChangeDate(selectedDate.toISOString());
    hideDatePicker();
  };

  let activeColor;
  let outlineColor;
  let textColor;
  let placeholderColor;

  if (disabled) {
    textColor = theme.colors.placeholder;
    activeColor = theme.colors.placeholder;
    outlineColor = theme.colors.placeholder;
    placeholderColor = theme.colors.placeholder;
  } else {
    textColor = error ? theme.colors.error : theme.colors.dark;
    activeColor = error ? theme.colors.error : theme.colors.primary;
    outlineColor = theme.colors.placeholder;
    placeholderColor = error ? theme.colors.error : theme.colors.placeholder;
  }

  const hasActiveOutline = !disabled && (focused || error);

  const outlineStyle = {
    borderColor: hasActiveOutline ? activeColor : outlineColor,
    borderBottomWidth: hasActiveOutline ? 2 : 1,
  };
  return (
    <WithLabel
      label={label}
      containerStyle={containerStyle}
      show={date.length > 1 || focused}
    >
      <Box>
        <View style={[styles.outline, outlineStyle]} pointerEvents="none" />
        <TouchableWithoutFeedback onPress={displayPicker}>
          <Box style={styles.displayBox}>
            <Text
              style={[
                styles.text,
                {
                  color: date ? textColor : placeholderColor,
                },
              ]}
            >
              {date.length > 0 ? format(new Date(date), "dd/MM/yyyy") : label}
            </Text>
          </Box>
        </TouchableWithoutFeedback>
        <DateTimePickerModal
          isVisible={show}
          mode="date"
          headerTextIOS={label}
          onConfirm={handleConfirm}
          onCancel={cancelHandler}
          onHide={() => setFocused(false)}
          isDarkModeEnabled={false}
          textColor={theme.colors.dark}
        />
      </Box>
    </WithLabel>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  outline: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 9999,
  },
  displayBox: { height: 48, justifyContent: "center" },
  text: { fontFamily: "SFProDisplay-Regular", fontSize: 16, lineHeight: 24 },
});
