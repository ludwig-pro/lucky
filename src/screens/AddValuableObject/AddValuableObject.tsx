import * as React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Box,
  Header,
  DatePicker,
  TextInput,
  ImagePicker,
  Picker,
  CurrencyTextInput,
} from "../../components";
import { InventoryRoutes, StackNavigationProps } from "../../navigation/types";
import { makeStyles, Theme } from "../../theme";

import Documents from "./Documents";
import { convertStringWithCurrencyToNumber, hasError } from "./helpers";

const initialCategoryOptions = [
  { value: 0, label: "Category" },
  { value: 1, label: "Art" },
  { value: 2, label: "Electronics" },
  { value: 3, label: "Jewelry" },
  { value: 4, label: "Music Instruments" },
];

const initialContractOptions = [
  { value: 0, label: "Contract" },
  { value: 1, label: "T_LUKO_HI_1" },
  { value: 2, label: "T_LUKO_HI_2" },
  { value: 3, label: "T_LUKO_HI_3" },
  { value: 4, label: "T_LUKO_HI_4" },
];

const ValuableObjectSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string(),
  category: Yup.mixed()
    .oneOf(["Art", "Electronics", "Jewelry", "Music Instruments"])
    .required("Required"),
  contract: Yup.mixed()
    .oneOf(["T_LUKO_HI_1", "T_LUKO_HI_2", "T_LUKO_HI_3", "Music T_LUKO_HI_4"])
    .required("Required"),
  purchaseDate: Yup.date().max(new Date()).required("Required"),
  purchaseValue: Yup.string()
    .test("isTooMuch", "excessive value", (value) => {
      if (value === undefined || typeof value !== "string") {
        return false;
      }
      const valueToCompare = convertStringWithCurrencyToNumber(value);

      if (valueToCompare <= 0 || valueToCompare > 40000) {
        return false;
      }
      return true;
    })
    .required("Value is required"),
  mainImage: Yup.string().required("Required"),
  documents: Yup.object({
    receipt: Yup.string().required("Required"),
    picture: Yup.string(),
  }),
});

const AddValuableObject = ({
  navigation,
}: StackNavigationProps<InventoryRoutes, "Inventory">) => {
  const styles = useStyles();
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    isValid,
    values,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: "",
      contract: "",
      purchaseDate: "",
      purchaseValue: "",
      mainImage: "",
      documents: {
        receipt: "",
        picture: "",
      },
    },
    validationSchema: ValuableObjectSchema,
    validateOnMount: true,
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
            disabled: !isValid,
          }}
          title="New Object"
        />
        <ImagePicker
          containerStyle={styles.imagePicker}
          image={values.mainImage}
          onImagePick={handleChange("mainImage")}
          error={hasError(errors.mainImage, touched.mainImage)}
          setTouched={() => setFieldTouched("mainImage", true, false)}
        />
        <Box paddingHorizontal="ml">
          <TextInput
            value={values.name}
            onChangeText={handleChange("name")}
            label="Name"
            placeholder="Name"
            containerStyle={styles.field}
            onBlur={handleBlur("name")}
            error={hasError(errors.name, touched.name)}
            errorLabel={errors.name}
          />
          <Picker
            label="Category"
            initialOptions={initialCategoryOptions}
            initialValue={0}
            containerStyle={styles.field}
            onChangeItem={handleChange("category")}
            onBlur={() => setFieldTouched("category", true, false)}
            error={hasError(errors.category, touched.category)}
          />
          <Picker
            label="Contract"
            initialOptions={initialContractOptions}
            initialValue={0}
            containerStyle={styles.field}
            onChangeItem={handleChange("contract")}
            onBlur={() => setFieldTouched("contract", true, false)}
            error={hasError(errors.contract, touched.contract)}
          />
          <DatePicker
            label="Purchase Date"
            containerStyle={styles.field}
            date={values.purchaseDate}
            onChangeDate={handleChange("purchaseDate")}
            onBlur={() => setFieldTouched("purchaseDate", true, false)}
            error={hasError(errors.purchaseDate, touched.purchaseDate)}
          />
          <CurrencyTextInput
            value={values.purchaseValue}
            onChangeText={handleChange("purchaseValue")}
            onBlur={() => setFieldTouched("purchaseValue", true, false)}
            error={hasError(errors.purchaseValue, touched.purchaseValue)}
            errorLabel={errors.purchaseValue}
            label="Purchase Value"
            placeholder="Purchase Value"
            containerStyle={styles.field}
            keyboardType="number-pad"
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
            errors={errors.documents}
            touched={touched.documents}
            setFieldTouched={setFieldTouched}
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
