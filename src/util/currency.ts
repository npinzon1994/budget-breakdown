export const formatCurrency = (number: number) =>
  Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    number
  );
