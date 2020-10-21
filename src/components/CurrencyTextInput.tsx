import React, { FC } from "react";
import {
  View,
  TextInput as NativeTextInput,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";

import { Theme, useReTheme } from "../theme";

import { Box } from "./Themed";
import WithLabel from "./WithLabel";

const CONFIG = {
  precision: 0,
  separator: " ",
  delimiter: " ",
  unit: "",
  suffixUnit: "€",
};

type TextInputProps = React.ComponentProps<typeof NativeTextInput> & {
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  error?: boolean;
  onChangeText?: (text: string) => void;
  underlineColor?: keyof Theme["colors"];
  value?: string;
  style?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  picker?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  errorLabel?: string;
};

type Event = NativeSyntheticEvent<TextInputFocusEventData>;

export const TextInput: FC<TextInputProps> = ({
  disabled = false,
  editable = true,
  error = false,
  multiline = false,
  numberOfLines = 1,
  placeholder = "",
  value = "",
  onChangeText,
  onFocus,
  onBlur,
  style,
  containerStyle,
  label,
  ...rest
}) => {
  const theme = useReTheme();
  const [focused, setFocused] = React.useState(false);
  const [text, setText] = React.useState(value);
  const textInputRef = React.useRef<TextInputMask>(null);

  const handleFocus = (e: Event) => {
    if (disabled || !editable) {
      return;
    }
    setFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e: Event) => {
    if (disabled || !editable) {
      return;
    }
    setFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  const handleChangeText = (newValue: string) => {
    if (disabled || !editable) {
      return;
    }
    setText(newValue);
    if (onChangeText) {
      onChangeText(newValue);
    }
  };

  const hasActiveOutline = !disabled && (focused || error);

  let textColor;
  let backgroundColor;
  let placeholderTextColor;
  let outlineColor;
  let activeColor;

  if (disabled) {
    textColor = theme.colors.placeholder;
    activeColor = theme.colors.placeholder;
    backgroundColor = theme.colors.iosBackground;
    placeholderTextColor = theme.colors.placeholder;
    outlineColor = theme.colors.placeholder;
  } else {
    textColor = error ? theme.colors.error : theme.colors.dark;
    activeColor = error ? theme.colors.error : theme.colors.primary;
    backgroundColor = theme.colors.white;
    placeholderTextColor = error
      ? theme.colors.error
      : theme.colors.placeholder;
    outlineColor = theme.colors.placeholder;
  }

  const textStyle = {
    color: textColor,
    backgroundColor,
  };

  const outlineStyle = {
    borderColor: hasActiveOutline ? activeColor : outlineColor,
    borderBottomWidth: hasActiveOutline ? 2 : 1,
  };

  return (
    <WithLabel
      label={label}
      containerStyle={containerStyle}
      show={text.length > 1 || focused}
    >
      <Box>
        <View style={[styles.outline, outlineStyle]} pointerEvents="none" />
        <TextInputMask
          ref={textInputRef}
          placeholder={focused ? "" : placeholder}
          style={[
            styles.input,
            styles.textInput,
            textStyle,
            !multiline
              ? { height: 48 }
              : { height: 50 + 16 * numberOfLines, paddingVertical: 6 },

            style,
          ]}
          placeholderTextColor={placeholderTextColor}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={!disabled && editable}
          multiline={multiline}
          numberOfLines={numberOfLines}
          {...rest}
          type={"money"}
          options={CONFIG}
          value={text}
          onChangeText={handleChangeText}
          caretHidden
        />
      </Box>
    </WithLabel>
  );
};

const styles = StyleSheet.create({
  input: {
    flexGrow: 1,
    borderRadius: 4,
    zIndex: 1,
    paddingBottom: 1,
    height: 48,
  },
  textInput: {
    fontFamily: "SFProDisplay-Regular",
    fontSize: 16,
    lineHeight: 24,
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
export default TextInput;
