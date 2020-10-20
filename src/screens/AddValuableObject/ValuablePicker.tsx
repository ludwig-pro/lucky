import * as React from "react";
import { StyleSheet, StyleProp, ViewStyle, View } from "react-native";
import SelectInput from "react-native-select-input-ios";
import { Value } from "react-native-reanimated";

import { Box, WithLabel } from "../../components";
import { useReTheme } from "../../theme";
import useReanimatedOpacity from "../../hooks/useReanimatedOpacity";

interface ValuablePickerProps {
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  error?: boolean;
  label?: string;
  initialOptions: { value: number; label: string }[];
  initialValue: number;
  onChangeItem: (item: string) => void;
}

const ValuablePicker = ({
  initialOptions,
  initialValue = 0,
  disabled = false,
  error = false,
  onChangeItem,
  label,
  containerStyle,
}: ValuablePickerProps) => {
  const theme = useReTheme();
  const [value, setValue] = React.useState(initialValue);
  const [focused, setFocused] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const { startAnimation, opacity } = useReanimatedOpacity();

  const startValue = (1 as unknown) as Value<1>;

  React.useEffect(() => {
    if (value !== 0 && show === false) {
      console.log("appear");
      startAnimation.setValue(startValue);
      setShow(true);
    }
    if (value === 0 && show === true) {
      console.log("deappear");

      startAnimation.setValue(startValue);
      setShow(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  let activeColor;
  let outlineColor;

  if (disabled) {
    activeColor = theme.colors.placeholder;
    outlineColor = theme.colors.placeholder;
  } else {
    activeColor = error ? theme.colors.error : theme.colors.primary;
    outlineColor = theme.colors.placeholder;
  }

  const hasActiveOutline = !disabled && (focused || error);

  const outlineStyle = {
    borderColor: hasActiveOutline ? activeColor : outlineColor,
    borderBottomWidth: hasActiveOutline ? 2 : 1,
  };

  return (
    <WithLabel label={label} containerStyle={containerStyle} opacity={opacity}>
      <Box>
        <View style={[styles.outline, outlineStyle]} pointerEvents="none" />
        <SelectInput
          value={value}
          options={initialOptions}
          style={styles.inputContainer}
          buttonsTextStyle={{ fontSize: 16, fontFamily: "SFProDisplay-Medium" }}
          buttonsViewStyle={{
            paddingHorizontal: theme.spacing.sm,
            height: 48,
            alignItems: "center",
            backgroundColor: theme.colors.keyboardBar,
          }}
          labelStyle={{
            textAlign: "left",
            color: value === 0 ? theme.colors.placeholder : theme.colors.dark,
            fontFamily: "SFProDisplay-Regular",
            fontSize: 16,
            lineHeight: 24,
          }}
          pickerViewStyle={{
            backgroundColor: theme.colors.keyboardBackground,
          }}
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
          }}
          onSubmitEditing={(itemValue: number) => {
            setValue(itemValue);
            onChangeItem(initialOptions[itemValue].label);
            setFocused(false);
          }}
        />
      </Box>
    </WithLabel>
  );
};

export default ValuablePicker;

const styles = StyleSheet.create({
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
});
