/* eslint-disable no-alert */
import * as React from "react";
import {
  // eslint-disable-next-line react-native/split-platform-components
  ActionSheetIOS,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Image,
  StyleProp,
  ViewStyle,
} from "react-native";
import * as ExpoImagePicker from "expo-image-picker";

import { useReTheme } from "../theme";

import { Box, Text } from "./Themed";
import Icon from "./Icon";

interface ImagePickerProps {
  containerStyle?: StyleProp<ViewStyle>;
  iconName?: string;
  label?: string;
  image: string | undefined;
  onImagePick: (URI: string) => void;
  error?: boolean;
  setTouched?: () => void;
}

const ImagePicker = ({
  containerStyle,
  iconName = "ios-camera",
  label = "Add Photo",
  image,
  onImagePick,
  error,
  setTouched,
}: ImagePickerProps) => {
  const theme = useReTheme();
  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status: cameraRollStatus,
        } = await ExpoImagePicker.requestCameraRollPermissionsAsync();
        const {
          status: cameraStatus,
        } = await ExpoImagePicker.requestCameraPermissionsAsync();
        if (cameraRollStatus !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
        if (cameraStatus !== "granted") {
          alert("Sorry, we need camera permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickCamera = async () => {
    const result = await ExpoImagePicker.launchCameraAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const imageURI = result.uri;
      onImagePick(imageURI);
    }
    // 🕵🏻‍♂️ need to wait ?
    setTouched && setTouched();
  };

  const pickCameraRoll = async () => {
    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const imageURI = result.uri;
      onImagePick(imageURI);
    }
    // 🕵🏻‍♂️ need to wait ?
    setTouched && setTouched();
  };

  const onPress = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Take picture", "Image library"],
        cancelButtonIndex: 0,
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          setTouched && setTouched();
        } else if (buttonIndex === 1) {
          await pickCamera();
        } else if (buttonIndex === 2) {
          await pickCameraRoll();
        }
      }
    );

  return (
    <Box style={containerStyle}>
      <Box alignItems="center" justifyContent="center">
        <TouchableOpacity onPress={onPress}>
          <Box
            marginVertical="ml"
            height={128}
            width={128}
            borderRadius="ml"
            alignItems="center"
            justifyContent="center"
            borderStyle={image ? "solid" : "dashed"}
            borderWidth={image ? StyleSheet.hairlineWidth : 2}
            borderColor={error ? "error" : "dash"}
            overflow="hidden"
          >
            {image ? (
              <Image
                source={{ uri: image }}
                style={{
                  ...StyleSheet.absoluteFillObject,
                  width: undefined,
                  height: undefined,
                  borderRadius: theme.borderRadii.ml,
                }}
              />
            ) : (
              <>
                <Icon
                  name={iconName}
                  size={48}
                  color="primary"
                  backgroundColor="white"
                />
                <Text variant="title3">{label}</Text>
              </>
            )}
          </Box>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default ImagePicker;
