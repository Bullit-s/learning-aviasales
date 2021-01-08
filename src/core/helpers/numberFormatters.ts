const _priceFormatter = new Intl.NumberFormat("ru-RU", {
  // style: "currency",
  // currency: "RUR",
  minimumFractionDigits: 0,
});

export const priceFormatter = (value: number) => _priceFormatter.format(value);
