export type Stat = {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
};

// Figures supplied by the cooperative, as of July 2026.
export const stats: Stat[] = [
  { label: "Active Members", value: 950, suffix: "+" },
  { label: "Total Member Savings", value: 285.45, prefix: "\u20a6", suffix: "m" },
  { label: "Loans Disbursed", value: 1960, suffix: "+" },
  { label: "Years Registered", value: 7, suffix: "" },
];
