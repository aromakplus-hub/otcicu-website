export type SavingsAccount = {
  code: string;
  name: string;
  audience: string;
  description: string;
  features: string[];
};

export const savingsAccounts: SavingsAccount[] = [
  {
    code: "SSA",
    name: "Share & Savings Account",
    audience: "Guest & Confirmed Members",
    description:
      "Your core cooperative account. Monthly contributions build this balance steadily and it forms the basis of your loan eligibility.",
    features: [
      "Minimum monthly contribution of \u20a65,000, credited automatically",
      "Protected — no self-debit; withdrawable on exit only",
      "Determines your loan exposure limit",
    ],
  },
  {
    code: "SPA",
    name: "Special Savings Account",
    audience: "Guest & Confirmed Members",
    description:
      "A flexible everyday account for transfers, airtime, and other transactions within your daily limit.",
    features: [
      "Includes a compulsory \u20a61,000 monthly Development Levy",
      "Unrestricted member-initiated transactions",
      "No overdraft permitted",
    ],
  },
  {
    code: "IVA",
    name: "Investment Account",
    audience: "Confirmed Members only",
    description:
      "Unlocked once you reach Confirmed membership. Grows through cooperative investment yield per board policy.",
    features: [
      "Available to Confirmed (OCFD) members",
      "10% annual return, subject to yearly financial performance and Board approval",
      "Debits require Account Officer and Finance Manager approval",
    ],
  },
];

export const savingsFaqs = [
  {
    question: "When do my monthly contributions get processed?",
    answer:
      "Contributions are processed monthly through your registered payment channel — card, bank transfer, USSD, or payroll deduction where applicable. You'll receive a reminder a few days before your due date.",
  },
  {
    question: "Can I withdraw from my Share & Savings Account at any time?",
    answer:
      "The Share & Savings Account is a protected, long-term balance. It's designed to be withdrawn when you exit the cooperative, not for everyday spending — that's what your Special Savings Account is for.",
  },
  {
    question: "What happens if I miss a contribution?",
    answer:
      "A short grace period applies before a missed contribution is treated as arrears. Extended arrears can affect loan eligibility, so it's best to keep contributions current or contact us if you're facing difficulty.",
  },
  {
    question: "When can I access an Investment Account?",
    answer:
      "Investment Accounts are available once you become a Confirmed Member — typically after six months of consistent contributions as a Guest Member with no outstanding arrears.",
  },
  {
    question: "Are there any other fees I should know about?",
    answer:
      "An annual maintenance fee of \u20a65,000 applies for administrative and operational support. If you exit the cooperative, a 4% administrative processing fee is deducted from your balance where applicable.",
  },
];
