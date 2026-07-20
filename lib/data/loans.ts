export type LoanProduct = {
  name: string;
  summary: string;
  eligibility: string;
  guarantors: string;
  turnaround: string;
};

export const loanProducts: LoanProduct[] = [
  {
    name: "Interest-Free Loan",
    summary: "The cooperative's standard facility — no interest, a transparent processing fee only.",
    eligibility: "Confirmed member, zero arrears, no other active loan",
    guarantors: "4 guarantors required",
    turnaround: "Standard processing",
  },
  {
    name: "Emergency Loan",
    summary: "A fast-track facility for urgent, unplanned needs.",
    eligibility: "Confirmed member, zero arrears",
    guarantors: "2 guarantors required",
    turnaround: "24-hour fast-track review",
  },
  {
    name: "Development Loan",
    summary: "For larger, purpose-driven projects such as home improvement or business expansion.",
    eligibility: "Confirmed member for 12+ months, documented purpose",
    guarantors: "4 guarantors required",
    turnaround: "Standard processing",
  },
  {
    name: "Salary Advance",
    summary: "For members on active payroll deduction, advanced against upcoming salary.",
    eligibility: "Confirmed member, registered employer, active payroll deduction",
    guarantors: "Employer verification in lieu of guarantors",
    turnaround: "Standard processing",
  },
  {
    name: "Education Loan",
    summary: "Supports tuition and education-related expenses for members or their dependents.",
    eligibility: "Confirmed member, valid admission letter",
    guarantors: "3 guarantors required",
    turnaround: "Standard processing",
  },
];

export const loanApplicationSteps = [
  {
    title: "Submit Application",
    description: "Choose a loan product, enter the amount, purpose, and your guarantors' details.",
  },
  {
    title: "Guarantor Consent",
    description: "Your nominated guarantors confirm their consent digitally.",
  },
  {
    title: "Account Officer Review",
    description: "Your Account Officer reviews eligibility and supporting documents.",
  },
  {
    title: "Approval",
    description: "Applications above the standard threshold are routed to the Credit Committee.",
  },
  {
    title: "Offer & Acceptance",
    description: "You review the offer — amount, tenor, and repayment schedule — and accept digitally.",
  },
  {
    title: "Disbursement",
    description: "Funds are disbursed to your account following dual sign-off by Finance.",
  },
];

export const loanFaqs = [
  {
    question: "Are cooperative loans really interest-free?",
    answer:
      "Yes. In line with our non-interest financial model, loans carry no interest — only a transparent processing fee disclosed before you accept any offer.",
  },
  {
    question: "How many guarantors do I need?",
    answer:
      "It depends on the loan product — typically 2 for Emergency Loans and up to 4 for Interest-Free or Development Loans. Your guarantors must also be Confirmed Members in good standing.",
  },
  {
    question: "Can I have more than one loan at a time?",
    answer:
      "You can't hold two active loans of the same product type simultaneously, and your total exposure across all loans is capped relative to your Share & Savings balance.",
  },
  {
    question: "What happens if I miss a repayment?",
    answer:
      "Missed repayments move your loan through a staged review process, with notifications to you and your guarantors. Early contact with the cooperative always helps if you anticipate a difficulty.",
  },
];
