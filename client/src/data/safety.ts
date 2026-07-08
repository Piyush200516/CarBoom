// src/data/safety.ts

export interface SafetyFeature {
  title: string;
  description: string;
  icon: string;
  comingSoon?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const safetyFeatures: SafetyFeature[] = [
  {
    title: "Verified Owners",
    description: "Every host undergoes profile checks, vehicle document verification, and background screenings before listing.",
    icon: "UserCheck",
  },
  {
    title: "Verified Renters",
    description: "Renters are verified via valid driver's licenses, government IDs, and contact verification mechanisms.",
    icon: "UserCheck",
  },
  {
    title: "Government ID Verification",
    description: "Secure automated checks verify official identification (Aadhaar, PAN, DL) to prevent identity fraud.",
    icon: "Fingerprint",
  },
  {
    title: "Secure Payments",
    description: "All transactions are fully encrypted. Payments are held securely and released according to our transparent policy.",
    icon: "CreditCard",
  },
  {
    title: "Insurance Assistance",
    description: "Partnership with leading insurance providers offers damage assistance options to secure your journey.",
    icon: "ShieldAlert",
  },
  {
    title: "24/7 Roadside Assistance",
    description: "Breakdown support, towing assistance, and round-the-clock emergency helpline available on all active bookings.",
    icon: "PhoneCall",
  },
  {
    title: "GPS Tracking",
    description: "Real-time location sharing, speed monitoring, and geofencing to ensure vehicle tracking.",
    icon: "MapPin",
    comingSoon: true,
  },
  {
    title: "Zero-Contact Handover",
    description: "Secure, remote digital handovers with photos uploaded directly inside the CarBoom app.",
    icon: "QrCode",
    comingSoon: true,
  },
];

export const renterTips: string[] = [
  "Inspect the vehicle thoroughly and upload photos of all sides before starting the ride.",
  "Always keep communications and transactions within the official CarBoom platform.",
  "Verify the owner's details and check rating reviews before finalizing a request.",
  "Adhere strictly to traffic laws and safety speed limits listed in the city rules.",
  "In case of any issues, use the in-app SOS button or dial our 24/7 Roadside Assistance immediately.",
  "Check and record fuel levels and dashboard warnings before commencing.",
];

export const ownerTips: string[] = [
  "Confirm the renter's identity matches the booking profile upon vehicle handover.",
  "Keep your vehicle regularly serviced, checking tyre pressures, fluids, and brakes.",
  "Document and upload detailed pre-trip and post-trip photos of the vehicle condition.",
  "Clearly list terms, guidelines, and fuel/cleaning expectations on your listing page.",
  "Ensure all vehicle documents (RC, Insurance, PUC) are updated and stored securely inside the glovebox.",
  "Install a recommended tracking device to keep monitor of your vehicle health and telemetry.",
];

export const safetyFAQs: FAQItem[] = [
  {
    question: "How does CarBoom verify users?",
    answer: "Every user (both renters and owners) goes through a mandatory verification process. This includes validating government-issued IDs, driver's licenses, contact numbers, and emails using secure, automated verification checks.",
  },
  {
    question: "What should I do if the vehicle breaks down?",
    answer: "CarBoom provides 24/7 Roadside Assistance. You can trigger an emergency call via the SOS button in the app or call our helpline number immediately. We will arrange towing, mechanical assistance, or a replacement vehicle as needed.",
  },
  {
    question: "Is my vehicle insured during the trip?",
    answer: "Yes, CarBoom offers damage assistance coverage through partner insurance firms. Renter options are chosen during booking. For owners, standard peer-to-peer coverages apply as long as all pre-trip and post-trip verification steps are completed.",
  },
  {
    question: "What happens if a renter gets a traffic fine?",
    answer: "Renters are legally liable for all traffic violations and fines incurred during their booking period. Any fines received by the owner will be forwarded to the renter, along with a processing fee, to be paid via the app.",
  },
  {
    question: "How does GPS tracking work?",
    answer: "We are currently beta-testing in-vehicle tracking. When rolled out, it will provide real-time location access, speed warnings, and geo-fencing safety boundaries to protect both owners and renters.",
  },
];
