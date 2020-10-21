import * as React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Box, Header, DatePicker, TextInput } from "../../components";
import { InventoryRoutes, StackNavigationProps } from "../../navigation/types";
import { makeStyles, Theme } from "../../theme";
import ImagePicker from "../../components/ImagePicker";

import ValuablePicker from "./ValuablePicker";
import Documents from "./Documents";

const initialOptions = [
  { value: 0, label: "Category" },
  { value: 1, label: "Art" },
  { value: 2, label: "Electronics" },
  { value: 3, label: "Jewelry" },
  { value: 4, label: "Music Instruments" },
];

const ValuableObjectSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string(),
  category: Yup.mixed()
    .oneOf(["Art", "Electronics", "Jewelry", "Music Instruments"])
    .required("Required"),
  purchaseDate: Yup.date().max(new Date()).required("Required"),
  mainImage: Yup.string().required("Required"),
  documents: Yup.object({
    receipt: Yup.string().required("Required"),
    picture: Yup.string().required("Required"),
  }),
});

export type FormikHandleChange = {
  (e: React.ChangeEvent<never>): void;
  <T_1 = string | React.ChangeEvent<never>>(
    field: T_1
  ): T_1 extends React.ChangeEvent<never>
    ? void
    : (e: string | React.ChangeEvent<never>) => void;
};

const AddValuableObject = ({
  navigation,
}: StackNavigationProps<InventoryRoutes, "Inventory">) => {
  const styles = useStyles();
  const {
    handleChange,
    handleSubmit,
    // handleBlur,
    // errors,
    // touched,
    values,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: "",
      purchaseDate: "",
      mainImage: "",
      documents: {
        receipt: "",
        picture: "",
      },
    },
    validationSchema: ValuableObjectSchema,
    onSubmit: (formValues) => {
      console.log("FORMIK", JSON.stringify(formValues, null, 2));
    },
  });

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
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
            onPress: handleSubmit,
            // disabled: true, // need to be controlled by formik
          }}
          title="New Object"
        />
        <ImagePicker
          containerStyle={styles.imagePicker}
          image={values.mainImage}
          onImagePick={handleChange("mainImage")}
        />
        <Box paddingHorizontal="ml">
          <TextInput
            value={values.name}
            onChangeText={handleChange("name")}
            onBlur={() => setFieldTouched("name", true)}
            label="Name"
            placeholder="Name"
            containerStyle={styles.field}
          />
          <ValuablePicker
            label="Category"
            initialOptions={initialOptions}
            initialValue={0}
            containerStyle={styles.field}
            onChangeItem={handleChange("category")}
          />
          <DatePicker
            label="Purchase Date"
            containerStyle={styles.field}
            date={values.purchaseDate}
            onChangeDate={handleChange("purchaseDate")}
          />
          <TextInput
            value={values.description}
            onChangeText={handleChange("description")}
            label="Description"
            placeholder="Description(optional)"
            containerStyle={styles.field}
            numberOfLines={1}
          />
          <Documents
            label="Documents"
            documents={values.documents}
            onDocumentPick={handleChange}
          />
        </Box>
      </Box>
    </KeyboardAwareScrollView>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingBottom: theme.spacing.xl,
  },
  field: { marginBottom: theme.spacing.ml },
  imagePicker: {
    paddingHorizontal: theme.spacing.ml,
    paddingVertical: theme.spacing.ml,
  },
}));
export default AddValuableObject;
