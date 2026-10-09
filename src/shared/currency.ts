export type Currency = "jpy" | "usd";
export const CURRENCIES: Currency[] = ["jpy", "usd"];

// Fixed reference rate. Display the rate explicitly; billing remains in USD.
export const DEFAULT_USD_JPY_RATE = 158.1;
export function usdJpyRate(value?: string): number {
  const rate = Number(value);
  return Number.isFinite(rate) && rate > 0 ? rate : DEFAULT_USD_JPY_RATE;
}

export function yen(cost: number, rate = DEFAULT_USD_JPY_RATE): string {
  const amount = cost * rate;
  return amount > 0 && amount < 0.01
    ? "¥0.01未満"
    : `¥${amount.toLocaleString("ja-JP", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function dollars(cost: number, digits = 4): string {
  const floor = 10 ** -digits;
  return cost > 0 && cost < floor ? `<$${floor.toFixed(digits)}` : `$${cost.toFixed(digits)}`;
}

/** A USD amount in the viewer's chosen currency. Yen is a fixed-rate reference, marked "約". */
export function money(cost: number, currency: Currency, rate: number, usdDigits = 4): string {
  return currency === "jpy" ? `約${yen(cost, rate)}` : dollars(cost, usdDigits);
}

export function rateNote(currency: Currency, rate: number): string {
  return currency === "jpy"
    ? `円は参考レート1 USD＝¥${rate.toFixed(2)}で固定換算。請求はUSDです。`
    : "請求はUSDです。";
}
