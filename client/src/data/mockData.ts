// src/data/mockData.ts

export interface Vehicle {
  id: string;
  name: string;
  type: "car" | "bike" | "scooter" | "cycle";
  category: string; // SUV, Sedan, Cruiser, EV, Sports, Commuter, etc.
  image: string;
  images: string[];
  fuelType: "Petrol" | "Diesel" | "Electric" | "Hybrid" | "None";
  transmission: "Automatic" | "Manual" | "None";
  seats: number;
  rating: number;
  reviewsCount: number;
  hourlyPrice: number;
  dailyPrice: number;
  mileage: string;
  ownerName: string;
  ownerAvatar: string;
  ownerRating: number;
  description: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: "Renter" | "Owner";
  avatar: string;
  rating: number;
  comment: string;
  location: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: "General" | "Booking" | "Payments" | "Insurance" | "Owner";
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export const mockVehicles: Vehicle[] = [
  {
    id: "1",
    name: "Tesla Model Y Performance",
    type: "car",
    category: "EV",
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800"
    ],
    fuelType: "Electric",
    transmission: "Automatic",
    seats: 5,
    rating: 4.9,
    reviewsCount: 124,
    hourlyPrice: 450,
    dailyPrice: 3500,
    mileage: "525 km range",
    ownerName: "Aarav Sharma",
    ownerAvatar: "https://i.pravatar.cc/150?img=33",
    ownerRating: 4.8,
    description: "Premium all-electric SUV with autopilot capabilities, high acceleration, and panoramic glass roof. Pristine condition and fully sanitized for your safety.",
    features: ["Autopilot", "Panoramic Sunroof", "Leather Seats", "GPS Navigation", "Heated Seats", "Premium Audio", "USB Charger"]
  },
  {
    id: "2",
    name: "Thar Earth Edition 4x4",
    type: "car",
    category: "SUV",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=800"
    ],
    fuelType: "Diesel",
    transmission: "Manual",
    seats: 4,
    rating: 4.7,
    reviewsCount: 88,
    hourlyPrice: 300,
    dailyPrice: 2400,
    mileage: "12 km/l",
    ownerName: "Vikram Malhotra",
    ownerAvatar: "https://i.pravatar.cc/150?img=12",
    ownerRating: 4.6,
    description: "Ready to explore the rugged terrains or cruise the city in style. The Earth Edition features standard 4x4 capability, high ground clearance, and an imposing road presence.",
    features: ["4x4 Drive", "Convertible Soft Top", "Touchscreen Infotainment", "Reverse Parking Camera", "Android Auto / Apple CarPlay"]
  },
  {
    id: "3",
    name: "BMW G 310 RR",
    type: "bike",
    category: "Sports",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800"
    ],
    fuelType: "Petrol",
    transmission: "Manual",
    seats: 2,
    rating: 4.8,
    reviewsCount: 42,
    hourlyPrice: 180,
    dailyPrice: 1200,
    mileage: "30 km/l",
    ownerName: "Rohan Verma",
    ownerAvatar: "https://i.pravatar.cc/150?img=60",
    ownerRating: 4.9,
    description: "Experience pure track-bred racing adrenaline. Equipped with ride-by-wire technology, slipper clutch, and multiple riding modes (Track, Urban, Rain, Sport).",
    features: ["Riding Modes", "Dual Channel ABS", "Slipper Clutch", "LED Headlights", "TFT Console"]
  },
  {
    id: "4",
    name: "Royal Enfield Meteor 350",
    type: "bike",
    category: "Cruiser",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800"
    ],
    fuelType: "Petrol",
    transmission: "Manual",
    seats: 2,
    rating: 4.6,
    reviewsCount: 95,
    hourlyPrice: 150,
    dailyPrice: 950,
    mileage: "35 km/l",
    ownerName: "Neha Sen",
    ownerAvatar: "https://i.pravatar.cc/150?img=47",
    ownerRating: 4.7,
    description: "The quintessential highway cruiser. Relaxed ergonomics, smooth J-series engine, and Tripper navigation pod. Perfect for weekend getaways and long road trips.",
    features: ["Tripper Navigation", "Backrest", "Windshield", "Dual Channel ABS", "Mobile Charging Port"]
  },
  {
    id: "5",
    name: "Ola S1 Pro Gen 2",
    type: "scooter",
    category: "EV",
    image: "https://images.unsplash.com/photo-1597501849790-78f731c83b23?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1597501849790-78f731c83b23?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800"
    ],
    fuelType: "Electric",
    transmission: "Automatic",
    seats: 2,
    rating: 4.5,
    reviewsCount: 56,
    hourlyPrice: 70,
    dailyPrice: 490,
    mileage: "195 km range",
    ownerName: "Amit Patel",
    ownerAvatar: "https://i.pravatar.cc/150?img=65",
    ownerRating: 4.5,
    description: "Smart electric scooter with Hyper mode, touch navigation screen, bluetooth speakers, and spacious boot space. Effortless city commuting.",
    features: ["Hyper Mode", "Touch Navigation", "Bluetooth Speakers", "Proximity Unlock", "Cruise Control", "34L Boot Space"]
  },
  {
    id: "6",
    name: "Trek Marlin 7 Gen 3",
    type: "cycle",
    category: "Mountain",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=800"
    ],
    fuelType: "None",
    transmission: "None",
    seats: 1,
    rating: 4.8,
    reviewsCount: 19,
    hourlyPrice: 40,
    dailyPrice: 250,
    mileage: "Pedal Assist",
    ownerName: "Devanand S.",
    ownerAvatar: "https://i.pravatar.cc/150?img=11",
    ownerRating: 4.9,
    description: "High-quality cross-country mountain bike with a lockable suspension fork, Shimano 1x10 drivetrain, and Shimano hydraulic disc brakes. Perfect for trails or urban exploration.",
    features: ["Shimano Drivetrain", "Hydraulic Disc Brakes", "Lockout Suspension", "Lightweight Frame", "Helmet Included"]
  },
  {
    id: "7",
    name: "Honda City Hybrid e:HEV",
    type: "car",
    category: "Sedan",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=800"
    ],
    fuelType: "Hybrid",
    transmission: "Automatic",
    seats: 5,
    rating: 4.8,
    reviewsCount: 63,
    hourlyPrice: 250,
    dailyPrice: 1990,
    mileage: "26.5 km/l",
    ownerName: "Kunal Gupta",
    ownerAvatar: "https://i.pravatar.cc/150?img=20",
    ownerRating: 4.7,
    description: "Premium mid-size sedan with strong self-charging hybrid power. Delivers exceptional fuel efficiency, silent electric motor cruising, and Honda Sensing ADAS features.",
    features: ["ADAS Safety", "Sunroof", "Automatic Climate Control", "LED Auto Headlamps", "LaneWatch Camera", "Ventilated Seats"]
  },
  {
    id: "8",
    name: "Ather 450X Apex",
    type: "scooter",
    category: "EV",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800"
    ],
    fuelType: "Electric",
    transmission: "Automatic",
    seats: 2,
    rating: 4.9,
    reviewsCount: 37,
    hourlyPrice: 80,
    dailyPrice: 550,
    mileage: "150 km range",
    ownerName: "Sanjay Dutta",
    ownerAvatar: "https://i.pravatar.cc/150?img=59",
    ownerRating: 4.8,
    description: "High performance electric scooter with Warp+ mode, styling with translucent body panels, fast charging, and Google Maps built into the dashboard.",
    features: ["Warp+ Mode", "Google Maps Navigation", "Regenerative Braking", "Alloy Wheels", "Fast Charger Included"]
  }
];

export const mockTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Priya Nair",
    role: "Renter",
    avatar: "https://i.pravatar.cc/150?img=49",
    rating: 5,
    comment: "I rented the Royal Enfield Meteor for a weekend trip to Coorg. The booking was seamless, and the bike was in absolute showroom condition. Highly recommend CarBoom for Tier-2 cities!",
    location: "Mysore, Karnataka"
  },
  {
    id: "2",
    name: "Rajesh Khandelwal",
    role: "Owner",
    avatar: "https://i.pravatar.cc/150?img=68",
    rating: 5,
    comment: "Listing my Thar on CarBoom has helped me cover my monthly EMI and even make a profit. The verification process for renters is robust, so I never worry about vehicle safety.",
    location: "Jaipur, Rajasthan"
  },
  {
    id: "3",
    name: "Ananya Deshmukh",
    role: "Renter",
    avatar: "https://i.pravatar.cc/150?img=45",
    rating: 5,
    comment: "Excellent service! Rented an Ola S1 Pro for a few hours to run errands around town. Much cheaper than booking auto-rickshaws or cabs, and I got to drive at my own pace.",
    location: "Nashik, Maharashtra"
  },
  {
    id: "4",
    name: "Mohammad Yusuf",
    role: "Owner",
    avatar: "https://i.pravatar.cc/150?img=22",
    rating: 4,
    comment: "Great experience as an owner. The team support is always responsive, and the insurance cover provides peace of mind. Listing multiple cars now.",
    location: "Coimbatore, Tamil Nadu"
  }
];

export const mockFAQs: FAQ[] = [
  {
    id: "q1",
    question: "What documents do I need to rent a vehicle?",
    answer: "You need a valid Indian Driving License (appropriate for the vehicle category) and an Aadhaar Card or Passport for identity verification. All documents are verified online before pickup.",
    category: "General"
  },
  {
    id: "q2",
    question: "How does the insurance work in case of an accident?",
    answer: "CarBoom provides fully integrated insurance coverage. In case of an accident, your maximum liability is capped at the security deposit amount, provided you followed all traffic laws and CarBoom terms of service.",
    category: "Insurance"
  },
  {
    id: "q3",
    question: "Can I book a vehicle for just 2 hours?",
    answer: "Yes, rentals on CarBoom are extremely flexible. You can book any vehicle (Cars, Bikes, Scooters, Cycles) for as short as 1 hour up to a full week.",
    category: "Booking"
  },
  {
    id: "q4",
    question: "How do I list my vehicle and start earning?",
    answer: "Sign up as an Owner, upload your RC book, Insurance, Pollution Certificate, and photos of your vehicle. Once verified by our team (typically within 24 hours), your vehicle will be live for booking.",
    category: "Owner"
  },
  {
    id: "q5",
    question: "Are there any speed limit restrictions?",
    answer: "Yes, to ensure safety, speed limits are capped: Cars at 100 km/h, Bikes at 80 km/h, and Scooters at 60 km/h. Exceeding these limits will incur a safety fine.",
    category: "General"
  }
];

export const mockTeam: TeamMember[] = [
  {
    id: "t1",
    name: "Piyush Mishra",
    role: "Co-Founder & CEO",
    avatar: "https://i.pravatar.cc/150?img=67",
    bio: "Former product manager at Uber India. Committed to revolutionizing last-mile and self-drive mobility for India's growing towns and cities."
  },
  {
    id: "t2",
    name: "Divya Rao",
    role: "Co-Founder & COO",
    avatar: "https://i.pravatar.cc/150?img=43",
    bio: "Operations lead with 8+ years of experience managing vehicle fleets. Passionate about scaling logistics and building trust-based marketplaces."
  },
  {
    id: "t3",
    name: "Arjun Mehta",
    role: "VP of Engineering",
    avatar: "https://i.pravatar.cc/150?img=15",
    bio: "Full stack wizard who built high-scale systems at Stripe. Enjoys optimizing animations, performance, and real-time mapping."
  }
];
