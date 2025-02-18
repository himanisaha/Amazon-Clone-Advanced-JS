export function formatCurrency(priceCents) {

  // Convert the price from cents to dollars by rounding it and dividing by 100
  return (Math.round(priceCents) / 100).toFixed(2);

  // The .toFixed(2) ensures the result has exactly two decimal places (e.g., 10.50 instead of 10.5)
}


  