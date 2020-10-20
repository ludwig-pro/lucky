import * as React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Box, Header } from "../../components";
import { InventoryRoutes, StackNavigationProps } from "../../navigation/types";
import { theme } from "../../theme";

import TextInput from "./TextInput";
import ValuablePicker from "./ValuablePicker";
import Camera from "./Camera";
import DatePicker from "./DatePicker";
import Documents from "./Documents";

const initialOptions = [
  { value: 0, label: "Category" },
  { value: 1, label: "Art" },
  { value: 2, label: "Electronics" },
  { value: 3, label: "Jewelry" },
  { value: 4, label: "Music Instruments" },
];

type DocumentsType = {
  receipt?: string;
  picture?: string;
}; // TODO 🚧

const AddValuableObject = ({
  navigation,
}: StackNavigationProps<InventoryRoutes, "Inventory">) => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [_, setCategory] = React.useState("");
  const [date, setDate] = React.useState<string | undefined>();
  const [mainImage, setMainImage] = React.useState<string | undefined>();
  const [documents, setDocuments] = React.useState<DocumentsType | undefined>();

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ paddingBottom: 40 }}
      scrollEnabled={true}
    >
      <Box flex={1} backgroundColor="white">
        <Header
          left={{
            icon: "ios-close",
            onPress: () => navigation.goBack(),
          }}
          right={{
            label: "Save",
            onPress: () => true,
            disabled: true,
          }}
          title="New Object"
        />
        <Camera
          containerStyle={{
            paddingHorizontal: theme.spacing.ml,
            paddingVertical: theme.spacing.ml,
          }}
          image={mainImage}
          onImagePick={(imageURI: string) => setMainImage(imageURI)}
        />
        <Box paddingHorizontal="ml">
          <TextInput
            value={name}
            label="Name"
            placeholder="Name"
            onChangeText={(text) => setName(text)}
            containerStyle={{ marginBottom: theme.spacing.ml }}
          />
          <ValuablePicker
            label="Category"
            initialOptions={initialOptions}
            initialValue={0}
            containerStyle={{ marginBottom: theme.spacing.ml }}
            onChangeItem={setCategory}
          />
          <DatePicker
            label="Purchase Date"
            containerStyle={{ marginBottom: theme.spacing.ml }}
            date={date}
            onChangeDate={(newDate: string | undefined) => setDate(newDate)}
          />
          <TextInput
            value={description}
            label="Description"
            placeholder="Description(optional)"
            onChangeText={(text) => setDescription(text)}
            containerStyle={{ marginBottom: theme.spacing.ml }}
            multiline
            numberOfLines={1}
          />
          <Documents
            label="Documents"
            documents={documents}
            onDocumentPick={(type) => (documentURI) =>
              setDocuments((prevDocuments?: DocumentsType) => ({
                [type]: documentURI,
                ...prevDocuments,
              }))}
          />
        </Box>
      </Box>
    </KeyboardAwareScrollView>
  );
};

export default AddValuableObject;
