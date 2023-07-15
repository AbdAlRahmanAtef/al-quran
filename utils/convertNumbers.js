export const convertNumbers = (num) => {
  const numbers = `۰۱۲۳٤٥٦٧۸۹`;
  let finalNumber = "";

  if (num === undefined) return false;

  if (num?.toString().length === 1) finalNumber = numbers[num];
  else {
    for (let c of num?.toString()) {
      finalNumber += numbers.charAt(+c);
    }
  }

  return finalNumber;
};
