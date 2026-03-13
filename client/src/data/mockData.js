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




