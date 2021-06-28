export const codes = {
  MOW: "Москва",
  HKT: "Пхукет (Таиланд)",
  KUL: "Куала-Лумпур (Малайзия)",
  AUH: "Абу-Даби (ОАЭ)",
  SHA: "Шанхай (Китай)",
  SIN: "Сингапур",
  BKK: "Бангкок (Таиланд)",
  HKG: "Гонконг",
  DXB: "Дубай (ОАЭ)",
  IST: "Истамбул (Турция)",
};

export type Codes = keyof typeof codes;
export const aviaCodes = (code: Codes) => codes[code] || code;
