export const CURRENCIES = {
  USD: { symbol: '$', rate: 1, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)' },
  JPY: { symbol: '¥', rate: 155, label: 'JPY (¥)' },
  INR: { symbol: '₹', rate: 83.5, label: 'INR (₹)' },
  AUD: { symbol: 'A$', rate: 1.52, label: 'AUD (A$)' }
};

export function formatCurrency(amount, currencyCode = 'USD') {
  const curr = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const converted = Math.round((amount || 0) * curr.rate);
  return `${curr.symbol}${converted.toLocaleString()}`;
}
