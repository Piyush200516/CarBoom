// src/data/helpFAQ.ts

export interface FAQItem {
  question: string;
  answer: string;
}

export const helpFAQ: FAQItem[] = [
  {
    question: "How do I rent a vehicle?",
    answer: "Select a vehicle from the Browse page, choose your dates and times, and click ‘Rent Now’. Complete payment to confirm the booking.",
  },
  {
    question: "How do I list my vehicle?",
    answer: "Go to ‘Become an Owner’, fill in the vehicle details, upload images, set your price, and submit for approval.",
  },
  {
    question: "How long can I rent?",
    answer: "Rentals can be as short as 1 hour and up to a maximum of 7 days.",
  },
  {
    question: "What documents are required?",
    answer: "A valid government‑issued ID and a driving licence are mandatory for both renters and owners.",
  },
  {
    question: "How are payments handled?",
    answer: "All payments are processed securely through our integrated gateway. Funds are released to owners after the rental period ends.",
  },
  {
    question: "Can I cancel my booking?",
    answer: "Yes, you can cancel up to 24 hours before the rental start time. A partial refund may apply based on the owner’s policy.",
  },
  {
    question: "How do refunds work?",
    answer: "Refunds are automatically credited to the original payment method within 5‑7 business days after approval.",
  },
  {
    question: "What happens if the vehicle gets damaged?",
    answer: "Our insurance assistance covers minor damages. For major incidents, the renter is liable for repair costs as per the terms.",
  },
];
