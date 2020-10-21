export const convertStringWithCurrencyToNumber = (string: string) => {
  // leave currency " €"
  const step1 = string.slice(0, string.length - 2);
  // trim white space
  const step2 = step1.replace(/\s+/g, "");
  //
  return Number(step2);
};

export const hasError = (error?: string, touched?: boolean) => {
  if (error !== undefined && touched) {
    return true;
  } else {
    return false;
  }
};
