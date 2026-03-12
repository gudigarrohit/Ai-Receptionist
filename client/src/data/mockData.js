import {
  Heart,
  Brain,
  Baby,
  Bone,
  Eye,
  Stethoscope,
  Syringe,
  Activity,
  Ear,
  UserRound,
  ShieldPlus,
  Microscope
} from "lucide-react";

export const departments = [
  {
    id: 1,
    name: "Cardiology",
    icon: Heart,
    description: "Advanced heart care including diagnosis and treatment of cardiovascular diseases",
    doctors: 1,
    color: "medical-coral"
  },
  {
    id: 2,
    name: "General Medicine",
    icon: Stethoscope,
    description: "Primary healthcare, routine checkups and preventive medical care",
    doctors: 1,
    color: "medical-blue"
  },
  {
    id: 3,
    name: "Orthopedics",
    icon: Bone,
    description: "Treatment for bones, joints, fractures and musculoskeletal conditions",
    doctors: 1,
    color: "medical-amber"
  },
  {
    id: 4,
    name: "Pediatrics",
    icon: Baby,
    description: "Specialized healthcare for infants, children and adolescents",
    doctors: 1,
    color: "medical-teal"
  },
  {
    id: 5,
    name: "Neurology",
    icon: Brain,
    description: "Comprehensive care for brain, spinal cord and nervous system disorders",
    doctors: 1,
    color: "medical-purple"
  },
  {
    id: 6,
    name: "Gynecology",
    icon: Activity,
    description: "Women's health services including pregnancy and reproductive care",
    doctors: 1,
    color: "medical-coral"
  },
  {
    id: 7,
    name: "Dermatology",
    icon: Syringe,
    description: "Skin, hair and nail care with modern dermatological treatments",
    doctors: 1,
    color: "medical-teal"
  },
  {
    id: 8,
    name: "ENT",
    icon: Ear,
    description: "Diagnosis and treatment for ear, nose and throat disorders",
    doctors: 1,
    color: "medical-green"
  },
  {
    id: 9,
    name: "General Surgery",
    icon: ShieldPlus,
    description: "Surgical treatments including abdominal, trauma and emergency surgeries",
    doctors: 1,
    color: "medical-amber"
  },
  {
    id: 10,
    name: "Ophthalmology",
    icon: Eye,
    description: "Complete eye care including vision correction and eye disease treatment",
    doctors: 1,
    color: "medical-green"
  },
  {
    id: 11,
    name: "Urology",
    icon: Microscope,
    description: "Treatment of urinary tract conditions and male reproductive health",
    doctors: 1,
    color: "medical-blue"
  },
  {
    id: 12,
    name: "Endocrinology",
    icon: Activity,
    description: "Hormone-related disorders including diabetes and thyroid problems",
    doctors: 1,
    color: "medical-purple"
  },
  {
    id: 13,
    name: "Psychiatry",
    icon: UserRound,
    description: "Mental health support including therapy and psychiatric treatment",
    doctors: 1,
    color: "medical-coral"
  },
  {
    id: 14,
    name: "Pulmonology",
    icon: Activity,
    description: "Respiratory care for lungs and breathing-related disorders",
    doctors: 1,
    color: "medical-blue"
  },
  {
    id: 15,
    name: "Emergency Medicine",
    icon: Activity,
    description: "24/7 emergency treatment for accidents and critical conditions",
    doctors: 1,
    color: "medical-red"
  }
];

export const doctors = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    department: "Cardiology",
    specialization: "Cardiologist",
    experience: 18,
    qualification: "MD, DM Cardiology",
    fee: 1500,
    availability: "8:00 AM – 4:00 PM (Mon–Sat) & 9:00 AM – 2:00 PM(Sun)",
    rating: 4.9,
    image: ""
  },

  {
    id: 2,
    name: "Dr. Priya Sharma",
    department: "General Medicine",
    specialization: "General Physician",
    experience: 12,
    qualification: "MBBS, MD",
    fee: 800,
    availability: "9:00 AM – 6:00 PM (Mon–Sat) & 9:00 AM – 2:00 PM(Sun)",
    rating: 4.7,
    image: ""
  },

  {
    id: 3,
    name: "Dr. Arjun Mehta",
    department: "Orthopedics",
    specialization: "Orthopedic Surgeon",
    experience: 15,
    qualification: "MS Orthopedics",
    fee: 1200,
    availability: "10:00 AM – 7:00 PM (Mon–Sat) & 9:00 AM – 2:00 PM(Sun)",
    rating: 4.8,
    image: ""
  },

  {
    id: 4,
    name: "Dr. Sneha Reddy",
    department: "Pediatrics",
    specialization: "Pediatrician",
    experience: 11,
    qualification: "MD Pediatrics",
    fee: 900,
    availability: "8:30 AM – 5:30 PM (Mon–Sat) & 9:00 AM – 2:00 PM(Sun)",
    rating: 4.9,
    image: ""
  },

  {
    id: 5,
    name: "Dr. Vikram Desai",
    department: "Neurology",
    specialization: "Neurologist",
    experience: 17,
    qualification: "DM Neurology",
    fee: 1600, availability: "11:00 AM – 8:00 PM (Mon–Sat) & 9:00 AM – 2:00 PM(Sun)",
    rating: 4.8,
    image: ""
  },

  {
    id: 6,
    name: "Dr. Ananya Rao",
    department: "Gynecology",
    specialization: "Gynecologist",
    experience: 13,
    qualification: "MS Gynecology",
    fee: 1000,
    availability: "9:00 AM – 5:00 PM (Mon–Sat) & 9:00 AM – 2:00 PM(Sun)",
    rating: 4.7,
    image: ""
  },

  {
    id: 7,
    name: "Dr. Karthik Nair",
    department: "Dermatology",
    specialization: "Dermatologist",
    experience: 10,
    qualification: "MD Dermatology",
    fee: 900,
    availability: "10:00 AM – 6:00 PM (Mon–Sat) & 9:00 AM – 2:00 PM(Sun)",
    rating: 4.6,
    image: ""
  },


  {
    id: 8,
    name: "Dr. Meera Iyer",
    department: "ENT",
    specialization: "ENT Specialist",
    experience: 14,
    qualification: "MS ENT",
    fee: 950,
    availability: "8:00 AM – 3:00 PM (Mon–Sat) & 9:00 AM – 2:00 PM(Sun)",
    rating: 4.7,
    image: ""
  },

  {
    id: 9,
    name: "Dr. Suresh Patil",
    department: "Surgery", specialization: "General Surgeon",
    experience: 19,
    qualification: "MS General Surgery",
    fee: 1400,
    availability: "11:00 AM – 9:00 PM (Mon–Sat) & 9:00 AM – 2:00 PM(Sun)",
    rating: 4.8,
    image: ""
  },

  {
    id: 10,
    name: "Dr. Lavanya Shetty",
    department: "Ophthalmology",
    specialization: "Ophthalmologist",
    experience: 12,
    qualification: "MS Ophthalmology",
    fee: 1000,
    availability: "9:30 AM – 4:30 PM (Mon–Sat) & 9:00 AM – 2:00 PM(Sun)",
    rating: 4.7,
    image: ""
  },

  {
    id: 11,
    name: "Dr. Harish Bhat",
    department: "Urology",
    specialization: "Urologist",
    experience: 16,
    qualification: "MCh Urology",
    fee: 1500,
    availability: "10:00 AM – 7:00 PM (Mon–Sat) & 9:00 AM – 2:00 PM(Sun)",
    rating: 4.8,
    image: ""
  },


  {
    id: 12,
    name: "Dr. Nisha Verma",
    department: "Endocrinology",
    specialization: "Endocrinologist",
    experience: 14,
    qualification: "DM Endocrinology",
    fee: 1300,
    availability: "8:00 AM – 2:00 PM (Mon–Sat) & 9:00 AM – 2:00 PM(Sun)",
    rating: 4.7,
    image: ""
  },

  {
    id: 13,
    name: "Dr. Amit Khanna",
    department: "Psychiatry",
    specialization: "Psychiatrist",
    experience: 11,
    qualification: "MD Psychiatry",
    fee: 1000,
    availability: "1:00 PM – 9:00 PM (Mon–Sat) & 9:00 AM – 2:00 PM(Sun)",
    rating: 4.6,
    image: ""
  },

  {
    id: 14,
    name: "Dr. Kavya Menon",
    department: "Pulmonology",
    specialization: "Pulmonologist",
    experience: 13,
    qualification: "DM Pulmonology",
    fee: 1200,
    availability: " 9:00 AM – 6:00 PM (Mon–Sat) & 9:00 AM – 2:00 PM(Sun)",
    rating: 4.8,
    image: ""
  },

  {
    id: 15,
    name: "Dr. Deepak Gowda",
    department: "Emergency Medicine",
    specialization: "Emergency Medicine Specialist",
    experience: 20,
    qualification: "MD Emergency Medicine",
    fee: 0,
    availability: "24/7 Emergency Coverage",
    rating: 4.9,
    image: ""
  }
];

export const facilities = [
  {
    id: 1,
    name: "24/7 Emergency & Trauma Care",
    description: "Round-the-clock emergency services with trauma specialists ready to handle critical situations.",
    icon: "🚑"
  },
  {
    id: 2,
    name: "Advanced Cardiac Care Unit",
    description: "Specialized cardiac monitoring and treatment for heart-related emergencies and conditions.",
    icon: "❤️"
  },
  {
    id: 3,
    name: "Operation Theatres (Modular OT)",
    description: "State-of-the-art modular operation theatres equipped with advanced surgical technology.",
    icon: "🏥"
  },
  {
    id: 4,
    name: "ICU & NICU",
    description: "Intensive Care Unit and Neonatal Intensive Care Unit with modern life-support systems.",
    icon: "🩺"
  },
  {
    id: 5,
    name: "Digital X-ray & MRI",
    description: "High-precision imaging facilities including digital X-ray, MRI and advanced diagnostics.",
    icon: "📡"
  },
  {
    id: 6,
    name: "Laboratory & Diagnostics",
    description: "Fully equipped laboratory providing accurate diagnostic tests and reports.",
    icon: "🔬"
  },
  {
    id: 7,
    name: "Pharmacy (In-house)",
    description: "24/7 in-house pharmacy providing all essential medicines and prescriptions.",
    icon: "💊"
  },
  {
    id: 8,
    name: "Ambulance Service",
    description: "Fast and reliable ambulance services with advanced life-support equipment.",
    icon: "🚨"
  },
  {
    id: 9,
    name: "Cashless Insurance Facility",
    description: "Partnership with major insurance providers for seamless cashless treatment.",
    icon: "💳"
  },
  {
    id: 10,
    name: "Health Checkup Packages",
    description: "Comprehensive preventive health checkup packages for early disease detection.",
    icon: "📋"
  }
];
export const testimonials = [
  {
    id: 1,
    name: "Ramesh Gowda",
    text: "I received excellent treatment from Dr. Rajesh Kumar for my heart condition. The cardiology department at Geeth HealthCare Hospital is very professional and supportive.",
    rating: 5,
    department: "Cardiology"
  },
  {
    id: 2,
    name: "Lakshmi Shetty",
    text: "Dr. Sneha Reddy took great care of my child during treatment. The pediatric team is very friendly and the hospital environment is very comfortable.",
    rating: 5,
    department: "Pediatrics"
  },
  {
    id: 3,
    name: "Mahesh Patil",
    text: "I had severe knee pain and Dr. Arjun Mehta treated me with great care. The orthopedic department provided excellent guidance and recovery support.",
    rating: 5,
    department: "Orthopedics"
  },
  {
    id: 4,
    name: "Anitha Rao",
    text: "Dr. Ananya Rao is very experienced and supportive. The gynecology services at Geeth HealthCare Hospital are very reliable and patient-friendly.",
    rating: 5,
    department: "Gynecology"
  },
  {
    id: 5,
    name: "Prakash Nair",
    text: "The dermatology treatment from Dr. Karthik Nair was excellent. My skin condition improved quickly and the consultation process was very smooth.",
    rating: 5,
    department: "Dermatology"
  },
  {
    id: 6,
    name: "Savitri Verma",
    text: "The emergency team led by Dr. Deepak Gowda responded very quickly during a medical emergency in my family. The hospital staff handled everything professionally.",
    rating: 5,
    department: "Emergency"
  }
];
export const appointments = [
  { id: 1, patientName: "Alice Johnson", age: 34, phone: "+1-555-0101", doctor: "Dr. Sarah Mitchell", department: "Cardiology", date: "2026-02-28", time: "10:00 AM", problem: "Chest pain and shortness of breath", status: "confirmed" },
  { id: 2, patientName: "Bob Smith", age: 45, phone: "+1-555-0102", doctor: "Dr. James Rodriguez", department: "Neurology", date: "2026-02-28", time: "11:30 AM", problem: "Recurring headaches", status: "pending" },
  { id: 3, patientName: "Carol Davis", age: 28, phone: "+1-555-0103", doctor: "Dr. Emily Chen", department: "Pediatrics", date: "2026-03-01", time: "09:00 AM", problem: "Child vaccination schedule", status: "confirmed" },
  { id: 4, patientName: "Daniel Wilson", age: 55, phone: "+1-555-0104", doctor: "Dr. Michael Thompson", department: "Orthopedics", date: "2026-03-01", time: "02:00 PM", problem: "Knee replacement consultation", status: "pending" },
  { id: 5, patientName: "Eva Martinez", age: 62, phone: "+1-555-0105", doctor: "Dr. David Kim", department: "Oncology", date: "2026-03-02", time: "10:30 AM", problem: "Follow-up chemotherapy", status: "confirmed" },
  { id: 6, patientName: "Frank Brown", age: 40, phone: "+1-555-0106", doctor: "Dr. Priya Patel", department: "General Medicine", date: "2026-03-02", time: "03:00 PM", problem: "Annual health checkup", status: "pending" },
];



