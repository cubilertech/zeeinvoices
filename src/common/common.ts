import dayjs from "dayjs";

//Calculate Amount
export const calculateAmount = (cartData: any) => {
  let total = 0;
  if (cartData) {
    cartData?.map((data: any) => (total += data.subTotal));
  }
  return total;
};
//Calculate Tax
export const calculateTax = (cartData: any) => {
  let totalTax = 0;
  cartData?.map((data: any) => (totalTax += data.taxAmount));
  return totalTax;
};
// Formated Date
export const formattedDate = (date: string) => {
  const parsedDate = dayjs(date);
  const formattedDate = parsedDate.format("DD-MMM-YY");
  return formattedDate;
};
export const tableFormatDate = (date: string) => {
  const parsedDate = dayjs(date);
  const formattedDate = parsedDate.format("DD MMMM YYYY");
  return formattedDate;
};
