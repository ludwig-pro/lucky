import React, { FC } from "react";
import {
  View,
  TextInput as NativeTextInput,
  StyleSheet,
  StyleProp,
  TextStyle,
} from "react-native";
import Animated, { Adaptable } from "react-native-reanimated";

import { Text } from "../../components";
import { Theme, useReTheme } from "../../theme";

import useReanimatedOpacity from "./useReanimatedOpacity";

interface TextInputProps extends NativeTextInput {
  disabled?: boolean; // OK
  label?: string; // floating label
  placeholder?: string;
  error?: boolean;
  onChangeText?: (text: string) => void;
  underlineColor?: keyof Theme["colors"];
  value?: string;
  style?: StyleProp<TextStyle>;
  // should i keep this props ?
  editable?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  onFocus?: (args: unknown) => void;
  onBlur?: (args: unknown) => void;
}

export const TextInput: FC<TextInputProps> = ({
  disabled = false,
  editable = true,
  error = false,
  multiline = false,
  numberOfLines = 1,
  label,
  placeholder = "",
  value = "",
  onChangeText,
  onFocus,
  onBlur,
  style,
  ...rest
}) => {
  const theme = useReTheme();
  const { startAnimation, opacity } = useReanimatedOpacity();
  const [focused, setFocused] = React.useState(false);
  const [text, setText] = React.useState(value);
  const height = 48;
  const startValue = 1 as Adaptable<0>;

  const handleFocus = (args: unknown) => {
    if (disabled || !editable) {
      return;
    }
    setFocused(true);
    text.length < 1 && startAnimation.setValue(startValue);
    if (onFocus) {
      onFocus(args);
    }
  };

  const handleBlur = (args: unknown) => {
    if (disabled || !editable) {
      return;
    }
    setFocused(false);
    text.length < 1 && startAnimation.setValue(startValue);
    if (onBlur) {
      onBlur(args);
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
    // textColor = colors.gray800;
    textColor = theme.colors.dark;
    activeColor = error ? theme.colors.error : theme.colors.primary;
    backgroundColor = theme.colors.white;
    placeholderTextColor = theme.colors.placeholder;
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
    <>
      {label && (
        <Animated.View style={{ opacity }}>
          <Text variant="label3" style={[styles.label]}>
            {label}
          </Text>
        </Animated.View>
      )}
      <View>
        <View style={[styles.outline, outlineStyle]} pointerEvents="none" />
        <NativeTextInput
          placeholder={focused ? "" : placeholder}
          style={[
            styles.input,
            styles.textInput,
            textStyle,
            !multiline
              ? { height }
              : { height: 50 + 16 * numberOfLines, paddingVertical: 6 },

            style,
          ]}
          value={text}
          onChangeText={handleChangeText}
          placeholderTextColor={placeholderTextColor}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={!disabled && editable}
          multiline={multiline}
          numberOfLines={numberOfLines}
          {...rest}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    flexGrow: 1,
    borderRadius: 4,
    zIndex: 1,
    paddingBottom: 1,
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
  label: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 9999,
  },
});
export default TextInput;
