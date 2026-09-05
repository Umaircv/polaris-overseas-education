export const WHATSAPP_URL =
  "https://wa.me/923416934362?text=Hello%20Polaris%20Overseas%20Education%2C%20I%20would%20like%20a%20free%20counselling%20session.";

export const IELTS_DEMO_URL = "/book-ielts-demo";

export const TRACKING_WHATSAPP_URL =
  "https://wa.me/923416934362?text=Hello%20Polaris%20Overseas%20Education%2C%20I%20would%20like%20an%20update%20on%20my%20application.";

export const destinations = [
  {
    country: "Italy",
    code: "IT",
    flag: "🇮🇹",
    flagImage: "/polaris/flags/it.png",
    image: "/polaris/landmarks/italy.webp",
    landmark: "Rome · The Colosseum",
    note: "Historic universities, diverse programmes and scholarship possibilities.",
  },
  {
    country: "France",
    code: "FR",
    flag: "🇫🇷",
    flagImage: "/polaris/flags/fr.png",
    image: "/polaris/landmarks/france.webp",
    landmark: "Paris · Eiffel Tower",
    note: "Globally respected education, cultural depth and English-taught options.",
  },
  {
    country: "Germany",
    code: "DE",
    flag: "🇩🇪",
    flagImage: "/polaris/flags/de.png",
    image: "/polaris/landmarks/germany.webp",
    landmark: "Berlin · Brandenburg Gate",
    note: "Research-driven universities and career-focused study opportunities.",
  },
  {
    country: "Türkiye",
    code: "TR",
    flag: "🇹🇷",
    flagImage: "/polaris/flags/tr.png",
    image: "/polaris/landmarks/turkiye.webp",
    landmark: "Istanbul · Hagia Sophia",
    note: "A welcoming student experience at the meeting point of Europe and Asia.",
  },
  {
    country: "China",
    code: "CN",
    flag: "🇨🇳",
    flagImage: "/polaris/flags/cn.png",
    image: "/polaris/landmarks/china.webp",
    landmark: "Beijing · Great Wall",
    note: "Modern campuses, varied programmes and developing scholarship routes.",
  },
];

export const services = [
  { symbol: "01", title: "Counselling", text: "A personal study plan shaped around your profile, goals and budget." },
  { symbol: "02", title: "Course & university selection", text: "A practical shortlist with clear reasons behind every recommendation." },
  { symbol: "03", title: "Application support", text: "Guidance for forms, statements, documents, deadlines and submissions." },
  { symbol: "04", title: "Scholarship guidance", text: "Support finding suitable funding routes and preparing complete applications." },
  { symbol: "05", title: "Visa assistance", text: "Structured student-visa and documentation guidance for your destination." },
  { symbol: "06", title: "IELTS & language training", text: "IELTS, English, spoken English and other language-learning programmes." },
  { symbol: "07", title: "Pre-departure support", text: "Help with travel preparation, accommodation planning and arrival readiness." },
  { symbol: "08", title: "Application tracking", text: "A clear view of your next steps from shortlist to departure." },
];

export type Course = {
  id: number;
  university: string;
  title: string;
  country: string;
  city: string;
  discipline: string;
  level: string;
  duration: string;
  language: string;
  intake: string;
  mode: string;
  featured?: boolean;
};

export const courses: Course[] = [
  { id: 1, university: "University of Bologna", title: "MSc Artificial Intelligence", country: "Italy", city: "Bologna", discipline: "Computer & IT", level: "Master's", duration: "2 years", language: "English", intake: "September", mode: "On campus", featured: true },
  { id: 2, university: "Politecnico di Milano", title: "MSc Computer Science and Engineering", country: "Italy", city: "Milan", discipline: "Computer & IT", level: "Master's", duration: "2 years", language: "English", intake: "September", mode: "On campus" },
  { id: 3, university: "University of Padua", title: "MSc Data Science", country: "Italy", city: "Padua", discipline: "Computer & IT", level: "Master's", duration: "2 years", language: "English", intake: "September", mode: "On campus" },
  { id: 4, university: "Sapienza University of Rome", title: "BSc Applied Computer Science and Artificial Intelligence", country: "Italy", city: "Rome", discipline: "Computer & IT", level: "Bachelor's", duration: "3 years", language: "English", intake: "September", mode: "On campus" },
  { id: 5, university: "Université Paris-Saclay", title: "Master in Artificial Intelligence", country: "France", city: "Paris", discipline: "Computer & IT", level: "Master's", duration: "2 years", language: "English", intake: "September", mode: "On campus", featured: true },
  { id: 6, university: "École Polytechnique", title: "MSc Data Science for Business", country: "France", city: "Palaiseau", discipline: "Business & Management", level: "Master's", duration: "2 years", language: "English", intake: "September", mode: "On campus" },
  { id: 7, university: "Sciences Po", title: "Master in International Management and Sustainability", country: "France", city: "Paris", discipline: "Business & Management", level: "Master's", duration: "2 years", language: "English", intake: "September", mode: "On campus" },
  { id: 8, university: "Technical University of Munich", title: "MSc Informatics", country: "Germany", city: "Munich", discipline: "Computer & IT", level: "Master's", duration: "2 years", language: "English", intake: "October", mode: "On campus", featured: true },
  { id: 9, university: "RWTH Aachen University", title: "MSc Data Science", country: "Germany", city: "Aachen", discipline: "Computer & IT", level: "Master's", duration: "2 years", language: "English", intake: "October", mode: "On campus" },
  { id: 10, university: "Technische Universität Berlin", title: "MSc Computer Science", country: "Germany", city: "Berlin", discipline: "Computer & IT", level: "Master's", duration: "2 years", language: "English", intake: "October", mode: "On campus" },
  { id: 11, university: "Middle East Technical University", title: "MSc Computer Engineering", country: "Türkiye", city: "Ankara", discipline: "Computer & IT", level: "Master's", duration: "2 years", language: "English", intake: "September", mode: "On campus", featured: true },
  { id: 12, university: "Istanbul Technical University", title: "BSc Computer Engineering", country: "Türkiye", city: "Istanbul", discipline: "Computer & IT", level: "Bachelor's", duration: "4 years", language: "English", intake: "September", mode: "On campus" },
  { id: 13, university: "Bilkent University", title: "MSc Computer Science", country: "Türkiye", city: "Ankara", discipline: "Computer & IT", level: "Master's", duration: "2 years", language: "English", intake: "September", mode: "On campus" },
  { id: 14, university: "Tsinghua University", title: "Master in Computer Science and Technology", country: "China", city: "Beijing", discipline: "Computer & IT", level: "Master's", duration: "3 years", language: "English", intake: "September", mode: "On campus", featured: true },
  { id: 15, university: "Zhejiang University", title: "Master in Data Science", country: "China", city: "Hangzhou", discipline: "Computer & IT", level: "Master's", duration: "2 years", language: "English", intake: "September", mode: "On campus" },
  { id: 16, university: "Shanghai Jiao Tong University", title: "BSc Computer Science and Technology", country: "China", city: "Shanghai", discipline: "Computer & IT", level: "Bachelor's", duration: "4 years", language: "English", intake: "September", mode: "On campus" },
  { id: 17, university: "Politecnico di Torino", title: "MSc Mechanical Engineering", country: "Italy", city: "Turin", discipline: "Engineering & Technology", level: "Master's", duration: "2 years", language: "English", intake: "September", mode: "On campus" },
  { id: 18, university: "Technical University of Munich", title: "MSc Biomedical Engineering", country: "Germany", city: "Munich", discipline: "Health & Medicine", level: "Master's", duration: "2 years", language: "English", intake: "October", mode: "On campus" },
];
