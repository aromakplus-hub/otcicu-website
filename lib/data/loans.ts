export type LoanProduct = {
  name: string;
  summary: string;
  eligibility: string;
  guarantors: string;
  turnaround: string;
  fee?: string;
};

export const loanProducts: LoanProduct[] = [
  {
    name: "Interest-Free Loan (Standard)",
    summary: "The cooperative's standard facility — no interest, a transparent processing fee only.",
    eligibility: "Confirmed member, zero arrears, no other active loan",
    guarantors: "4 guarantors required",
    turnaround: "Standard processing",
    fee: "5% processing fee · up to 2\u20133\u00d7 your Share & Savings balance",
  },
  {
    name: "Emergency Loan (Short-Term)",
    summary: "A fast-track facility for urgent, unplanned needs.",
    eligibility: "Confirmed member, zero arrears",
    guarantors: "2 guarantors required",
    turnaround: "24-hour fast-track review",
    fee: "10% processing fee · amount subject to approval",
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
      "Yes. In line with our non-interest financial model, loans carry no interest — only a transparent processing fee (5% for the Interest-Free Loan, 10% for the Emergency Loan) disclosed before you accept any offer. This is grounded in the cooperative's by-laws and applicable cooperative law, not a conventional interest-based framework.",
  },
  {
    question: "How much can I borrow?",
    answer:
      "Loan amounts are generally capped at two to three times your Share & Savings balance, subject to the cooperative's approved policies and your eligibility.",
  },
  {
    question: "How many guarantors do I need?",
    answer:
      "It depends on the loan product — typically 2 for the Emergency Loan and up to 4 for the Interest-Free or Development Loan. Your guarantors must also be Confirmed Members in good standing.",
  },
  {
    question: "What happens if I miss a repayment?",
    answer:
      "A late payment attracts a penalty of 2% of the total amount loaned, subject to Board approval. Early contact with the cooperative always helps if you anticipate a difficulty.",
  },
];
