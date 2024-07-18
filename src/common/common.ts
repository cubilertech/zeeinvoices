//Calculate Amount
export const calculateAmount = (cartData : any) => {
    let total = 0;
    cartData.map(
      (data :any) =>
        (total += data.subTotal ));
    return total;
  };