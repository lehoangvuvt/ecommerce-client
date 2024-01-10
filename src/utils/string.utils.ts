const formatLongString = (
  stringValue: string,
  desiredLength: number
): string => {
  let formattedString = "";
  if (stringValue.length > desiredLength) {
    formattedString = stringValue.substring(0, desiredLength) + "...";
  } else {
    formattedString = stringValue;
  }
  return formattedString;
};

const convertNumberToCurrencyString = (number: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "VND",
  });
  return formatter.format(number);
};

const getTextWithEllipsis = (originText: string, limit: number) => {
  if (originText.length <= limit) return originText;
  return `${originText.substring(0, limit)}...`;
};

export { formatLongString, convertNumberToCurrencyString, getTextWithEllipsis };
