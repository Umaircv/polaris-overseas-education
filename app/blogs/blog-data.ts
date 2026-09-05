export type BlogPost = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  intro: string;
  sections: { heading: string; paragraphs: string[]; points?: string[] }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-choose-a-study-abroad-course",
    category: "Course selection",
    title: "How to choose the right study-abroad course",
    excerpt: "A practical framework for comparing programme content, entry requirements, cost and career direction.",
    readTime: "6 min read",
    date: "August 2026",
    intro: "The right course is not simply the one with the most attractive title. It should fit your academic background, your budget, your learning interests and the kind of work you hope to do after graduation.",
    sections: [
      { heading: "Begin with the outcome", paragraphs: ["Write down the skills you want to build and the type of role, research area or industry you want to enter. This gives you a useful standard for comparing programmes."], points: ["Target career direction", "Skills you need to gain", "Countries where that field is strong"] },
      { heading: "Compare modules, not only titles", paragraphs: ["Two programmes with similar names can have very different content. Review compulsory modules, electives, research options, internships and the final project."], points: ["Core modules", "Assessment style", "Internship or placement options", "Research and thesis requirements"] },
      { heading: "Check the complete cost", paragraphs: ["Consider tuition, application fees, visa expenses, accommodation, insurance and everyday living costs. A lower tuition fee does not always mean a lower total budget."] },
    ],
  },
  {
    slug: "scholarship-application-checklist",
    category: "Scholarships",
    title: "A scholarship application checklist that keeps you organised",
    excerpt: "The documents, timelines and quality checks that matter before you press submit.",
    readTime: "5 min read",
    date: "August 2026",
    intro: "Scholarship applications are easier to manage when you separate eligibility, documents and deadlines into a simple system. Start early and verify every requirement from the official provider.",
    sections: [
      { heading: "Confirm eligibility first", paragraphs: ["Read the current criteria carefully. Check nationality, academic level, intended programme, age limits, language requirements and financial conditions before investing time in an application."] },
      { heading: "Build one master document folder", paragraphs: ["Keep clear, correctly named copies of your core documents. Create a separate checklist for every scholarship because requirements can differ."], points: ["Degree and transcripts", "Passport or identity document", "Language evidence", "CV and motivation letter", "Financial or family documents where required"] },
      { heading: "Leave time for review", paragraphs: ["Submit before the final day whenever possible. A careful review should confirm names, dates, programme details, file formats and whether every required upload opens correctly."] },
    ],
  },
  {
    slug: "ielts-preparation-plan",
    category: "IELTS",
    title: "Build an IELTS preparation plan around your target band",
    excerpt: "Move from general practice to focused improvement in listening, reading, writing and speaking.",
    readTime: "5 min read",
    date: "August 2026",
    intro: "Effective IELTS preparation starts with an honest diagnostic test. Once you know your current level, you can spend more time on the tasks that will make the biggest difference.",
    sections: [
      { heading: "Set a realistic timeline", paragraphs: ["Your preparation length depends on the gap between your current performance and target band. Build weekly goals and leave time for full practice tests."] },
      { heading: "Balance all four skills", paragraphs: ["Do not allow your strongest module to hide a weakness elsewhere. Track listening, reading, writing and speaking separately."], points: ["Timed listening and reading", "Structured writing feedback", "Recorded speaking practice", "Weekly score review"] },
      { heading: "Practise under test conditions", paragraphs: ["As your exam approaches, complete full timed sections with the same limits you will face on test day. Review errors after every attempt."] },
    ],
  },
  {
    slug: "documents-for-university-applications",
    category: "Admissions",
    title: "Documents students commonly need for university applications",
    excerpt: "A starting guide to academic, language, identity and supporting documents.",
    readTime: "7 min read",
    date: "August 2026",
    intro: "Requirements vary across countries, universities and programmes. This guide is a planning checklist, not a replacement for the current instructions on an institution's official application page.",
    sections: [
      { heading: "Academic documents", paragraphs: ["Prepare clear degree, transcript and school-level records as required. Some institutions may request grading explanations, certified copies or translations."], points: ["Degree or provisional certificate", "Official transcripts", "Secondary and higher-secondary records", "Course descriptions when requested"] },
      { heading: "Application documents", paragraphs: ["Common supporting material includes a CV, statement of purpose or motivation letter, references and a portfolio for relevant creative programmes."] },
      { heading: "Identity and language evidence", paragraphs: ["Check passport validity early. Confirm whether the programme requires IELTS, another recognised test or accepts alternative proof of English."] },
    ],
  },
  {
    slug: "student-visa-file-preparation",
    category: "Student visas",
    title: "How to prepare a clear and consistent student visa file",
    excerpt: "Keep your academic plan, finances and supporting documents aligned and easy to verify.",
    readTime: "6 min read",
    date: "August 2026",
    intro: "A visa file should tell one consistent story: why you chose the programme, how it fits your background, how the study will be funded and how every claim is supported by documentation.",
    sections: [
      { heading: "Follow the official checklist", paragraphs: ["Visa requirements change. Use the current embassy, consulate or authorised visa-centre instructions for your application location and visa category."] },
      { heading: "Keep information consistent", paragraphs: ["Names, dates, addresses, academic history, employment details and financial information should match across forms and supporting documents."] },
      { heading: "Explain your study plan clearly", paragraphs: ["Your programme choice should make sense in relation to your previous education and future direction. Be accurate and avoid claims that cannot be supported."], points: ["Why this course", "Why this institution and country", "How studies will be financed", "How the programme supports your future"] },
    ],
  },
];

