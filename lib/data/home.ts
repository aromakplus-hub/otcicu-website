export type Stat = {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
};

export const stats: Stat[] = [
  { label: "Active Members", value: 12400, suffix: "+" },
  { label: "Total Member Savings", value: 1.8, prefix: "\u20a6", suffix: "bn" },
  { label: "Loans Disbursed", value: 3200, suffix: "+" },
  { label: "Years of Service", value: 14, suffix: "" },
];
