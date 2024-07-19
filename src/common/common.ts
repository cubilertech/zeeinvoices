//Calculate Amount
export const calculateAmount = (cartData : any) => {
    let total = 0;
    cartData.map(
      (data :any) =>
        (total += data.subTotal ));
    return total;
  };
export const calculateTax = (cartData : any) => {
    let totalTax = 0;
    cartData.map(
      (data :any) =>
        (totalTax += data.taxAmount ));
    return totalTax;
  };