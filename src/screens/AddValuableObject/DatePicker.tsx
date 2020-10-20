import * as React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import Animated from "react-native-reanimated";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";

import { Text, Box } from "../../components";
import { useReTheme } from "../../theme";

import useReanimatedOpacity from "./useReanimatedOpacity";

interface DatePickerProps {
  containerStyle?: StyleProp<ViewStyle>;
  label?: string;
  disabled?: boolean;
  error?: boolean;
  date?: string;
  onChangeDate: (newDate: string | undefined) => void;
}

const DatePicker = ({
  containerStyle,
  label,
  disabled,
  error,
  onChangeDate,
  date,
}: DatePickerProps) => {
  const theme = useReTheme();
  const { startAnimation, opacity } = useReanimatedOpacity();
  const [focused, setFocused] = React.useState(false);
  const [showLabel, setShowLabel] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const startValue = (1 as unknown) as typeof startAnimation;

  const displayPicker = () => {
    setShow(true);
    setFocused(true);
  };

  const cancelHandler = () => {
    setShow(false);
    onChangeDate(undefined);
  };

  const hideDatePicker = () => {
    setShow(false);
  };

  // STYLE
  React.useEffect(() => {
    if (date && showLabel === false) {
      startAnimation.setValue(startValue);
      setShowLabel(true);
    }
    if (date && showLabel === true) {
      startAnimation.setValue(startValue);
      setShowLabel(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const handleConfirm = (selectedDate: Date) => {
    onChangeDate(format(new Date(selectedDate), "MM/dd/yyyy"));
    hideDatePicker();
  };

  let activeColor;
  let outlineColor;
  let textColor;

  if (disabled) {
    textColor = theme.colors.placeholder;
    activeColor = theme.colors.placeholder;
    outlineColor = theme.colors.placeholder;
  } else {
    textColor = theme.colors.dark;
    activeColor = error ? theme.colors.error : theme.colors.primary;
    outlineColor = theme.colors.placeholder;
  }

  const hasActiveOutline = !disabled && (focused || error);

  const outlineStyle = {
    borderColor: hasActiveOutline ? activeColor : outlineColor,
    borderBottomWidth: hasActiveOutline ? 2 : 1,
  };

  return (
    <>
      <Box style={containerStyle}>
        {label && (
          <Animated.View style={{ opacity }}>
            <Text variant="label3" style={styles.label}>
              {label}
            </Text>
          </Animated.View>
        )}
        <View style={[styles.outline, outlineStyle]} pointerEvents="none" />
        <TouchableWithoutFeedback onPress={displayPicker}>
          <Box style={{ height: 48, justifyContent: "center" }}>
            <Text
              style={{
                fontFamily: "SFProDisplay-Regular",
                fontSize: 16,
                lineHeight: 24,
                color: date ? textColor : theme.colors.placeholder,
              }}
            >
              {date || label}
            </Text>
          </Box>
        </TouchableWithoutFeedback>
      </Box>
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
    </>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  label: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 9999,
  },
  outline: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 9999,
  },
});
