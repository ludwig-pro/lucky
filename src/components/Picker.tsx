import * as React from "react";
import { StyleProp, ViewStyle, View } from "react-native";
import SelectInput from "react-native-select-input-ios";

import { makeStyles, Theme, useReTheme } from "../theme";

import { Box } from "./Themed";
import WithLabel from "./WithLabel";

interface PickerProps {
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  error?: boolean;
  label?: string;
  initialOptions: { value: number; label: string }[];
  initialValue: number;
  onChangeItem: (item: string) => void;
  onBlur: () => void;
}

const Picker = ({
  initialOptions,
  initialValue = 0,
  disabled = false,
  onChangeItem,
  label,
  containerStyle,
  onBlur,
  error,
}: PickerProps) => {
  const theme = useReTheme();
  const styles = useStyles();
  const [value, setValue] = React.useState(initialValue);
  const [focused, setFocused] = React.useState(false);

  let activeColor;
  let outlineColor;
  let labelColor;

  if (disabled) {
    activeColor = theme.colors.placeholder;
    outlineColor = theme.colors.placeholder;
    labelColor = theme.colors.placeholder;
  } else {
    activeColor = error ? theme.colors.error : theme.colors.primary;
    outlineColor = theme.colors.placeholder;
    // eslint-disable-next-line no-nested-ternary
    labelColor = error
      ? theme.colors.error
      : value === 0
      ? theme.colors.placeholder
      : theme.colors.dark;
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
      show={value !== 0 || focused}
    >
      <Box>
        <View style={[styles.outline, outlineStyle]} pointerEvents="none" />
        <SelectInput
          value={value}
          options={initialOptions}
          style={styles.inputContainer}
          buttonsTextStyle={styles.buttonsTextStyle}
          buttonsViewStyle={styles.buttonsViewStyle}
          labelStyle={[styles.labelStyle, { color: labelColor }]}
          pickerViewStyle={styles.pickerViewStyle}
          onValueChange={(itemValue: number) => {
            setValue(itemValue);
            onChangeItem(initialOptions[itemValue].label);
          }}
          onBeginEditing={() => {
            setFocused(true);
          }}
          onEndEditing={() => {
            setFocused(false);
            onChangeItem(initialOptions[0].label);
            setValue(0);
            onBlur();
          }}
          onSubmitEditing={(itemValue: number) => {
            setValue(itemValue);
            onChangeItem(initialOptions[itemValue].label);
            setFocused(false);
            onBlur();
          }}
        />
      </Box>
    </WithLabel>
  );
};

export default React.memo(Picker);

const useStyles = makeStyles((theme: Theme) => ({
  buttonsViewStyle: {
    paddingHorizontal: theme.spacing.sm,
    height: 48,
    alignItems: "center",
    backgroundColor: theme.colors.keyboardBar,
  },
  inputContainer: {
    height: 48,
    justifyContent: "center",
  },
  outline: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 9999,
  },
  labelStyle: {
    textAlign: "left",
    fontFamily: "SFProDisplay-Regular",
    fontSize: 16,
    lineHeight: 24,
  },
  pickerViewStyle: {
    backgroundColor: theme.colors.keyboardBackground,
  },
  buttonsTextStyle: { fontSize: 16, fontFamily: "SFProDisplay-Medium" },
}));
