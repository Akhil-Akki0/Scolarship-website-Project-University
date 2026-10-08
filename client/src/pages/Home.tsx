import { useEffect, useMemo, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import {
  ArrowDownUp,
  ArrowRight,
  BadgeCheck,
  Banknote,
  BookOpenCheck,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Clock3,
  ExternalLink,
  FileCheck2,
  FileText,
  Filter,
  GraduationCap,
  Info,
  Landmark,
  MapPin,
  Menu,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  UserRound,
  Users,
  X,
} from "lucide-react";

type Status = "open" | "closing-soon" | "closed";
type Screen = "home" | "eligibility" | "results";
type FilterKey =
  | "all"
  | "open"
  | "closing-soon"
  | "closed"
  | "government"
  | "private"
  | "college"
  | "merit"
  | "need";
type SortKey = "match" | "deadline" | "amount" | "updated";

type Scholarship = {
  id: string;
  name: string;
  provider: string;
  providerType: "Government" | "Private" | "College / University";
  description: string;
  amount: string;
  amountValue: number;
  education_level: string[];
  course: string[];
  year_of_study: string[];
  minimum_percentage: number;
  maximum_income: number;
  age_limit: number;
  category: string[];
  gender: string;
  state: string[];
  domicile_requirement: string;
  institution_type: string[];
  disability_requirement: string;
  minority_requirement: string;
  application_start_date: string;
  application_deadline: string;
  documents_required: string[];
  application_url: string;
  official_website: string;
  last_verified: string;
  benefit: string;
  application_period: string;
  verification_deadline: string;
  expected_result_date: string;
  eligibility: string[];
  focus: "merit" | "need";
};

type StudentProfile = {
  fullName: string;
  age: string;
  gender: string;
  state: string;
  district: string;
  educationLevel: string;
  course: string;
  branch: string;
  yearOfStudy: string;
  institutionType: string;
  institutionName: string;
  board: string;
  previousPercentage: string;
  currentPercentage: string;
  yearOfPassing: string;
  academicPerformance: string;
  annualIncome: string;
  familyMembers: string;
  occupation: string;
  firstGeneration: string;
  specialCategory: string;
  category: string;
  disability: string;
  minority: string;
  domicileState: string;
  locationType: string;
  livingType: string;
  institutionOwnership: string;
  otherEligibility: string;
};

type MatchReason = { label: string; detail: string; good: boolean };
type Match = { score: number; strong: boolean; reasons: MatchReason[] };

const initialProfile: StudentProfile = {
  fullName: "",
  age: "",
  gender: "",
  state: "",
  district: "",
  educationLevel: "Undergraduate",
  course: "",
  branch: "",
  yearOfStudy: "1st year",
  institutionType: "",
  institutionName: "",
  board: "",
  previousPercentage: "",
  currentPercentage: "",
  yearOfPassing: "",
  academicPerformance: "",
  annualIncome: "",
  familyMembers: "",
  occupation: "",
  firstGeneration: "",
  specialCategory: "",
  category: "",
  disability: "",
  minority: "",
  domicileState: "",
  locationType: "",
  livingType: "",
  institutionOwnership: "",
  otherEligibility: "",
};

const daysFromNow = (days: number) => {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));

const scholarships: Scholarship[] = [
  {
    id: "central-sector",
    name: "Central Sector Scholarship",
    provider: "Government of India",
    providerType: "Government",
    description:
      "Annual support for meritorious undergraduate students from families within the published income limit.",
    amount: "Up to ₹20,000 per year",
    amountValue: 20000,
    education_level: ["Undergraduate"],
    course: ["Any course"],
    year_of_study: ["1st year", "2nd year", "3rd year", "4th year"],
    minimum_percentage: 80,
    maximum_income: 450000,
    age_limit: 25,
    category: ["All categories"],
    gender: "All",
    state: ["All India"],
    domicile_requirement: "Indian domicile",
    institution_type: ["Government", "Private"],
    disability_requirement: "Not required",
    minority_requirement: "Not required",
    application_start_date: daysFromNow(-60),
    application_deadline: daysFromNow(38),
    documents_required: ["Academic marks card", "Income certificate", "Bank account details", "Bonafide certificate"],
    application_url: "https://scholarships.gov.in/",
    official_website: "https://scholarships.gov.in/",
    last_verified: "8 October 2026",
    benefit: "Up to ₹10,000 per year for the first three years and up to ₹20,000 per year for selected technical courses.",
    application_period: "July – November",
    verification_deadline: "30 days after application deadline",
    expected_result_date: "Published by the provider after verification",
    eligibility: [
      "Undergraduate student studying in a recognised institution",
      "At least 80% in the previous qualifying examination",
      "Annual family income within ₹4.5 lakh",
      "Indian domicile and a valid bank account in the student's name",
    ],
    focus: "merit",
  },
  {
    id: "sbi-asha",
    name: "SBI Asha Scholarship",
    provider: "SBI Foundation",
    providerType: "Private",
    description:
      "Need-based help for students in professional and higher education who are facing financial constraints.",
    amount: "Up to ₹5,00,000",
    amountValue: 500000,
    education_level: ["Undergraduate", "Postgraduate"],
    course: ["Engineering", "Medicine", "Management", "Any course"],
    year_of_study: ["1st year", "2nd year", "3rd year", "4th year"],
    minimum_percentage: 75,
    maximum_income: 600000,
    age_limit: 30,
    category: ["All categories"],
    gender: "All",
    state: ["All India"],
    domicile_requirement: "Indian domicile",
    institution_type: ["Government", "Private"],
    disability_requirement: "Not required",
    minority_requirement: "Not required",
    application_start_date: daysFromNow(-35),
    application_deadline: daysFromNow(10),
    documents_required: ["Academic marks card", "Income certificate", "Identity document", "College fee receipt"],
    application_url: "https://www.sbifoundation.in/",
    official_website: "https://www.sbifoundation.in/",
    last_verified: "8 October 2026",
    benefit: "Financial support for tuition, books, and other education expenses, subject to the provider's review.",
    application_period: "August – October",
    verification_deadline: "Announced by SBI Foundation",
    expected_result_date: "Announced by SBI Foundation",
    eligibility: [
      "Student enrolled in a recognised higher education course",
      "At least 75% or equivalent CGPA in the previous examination",
      "Annual family income within ₹6 lakh",
      "Preference may be given to students with demonstrated financial need",
    ],
    focus: "need",
  },
  {
    id: "lic-golden-jubilee",
    name: "LIC Golden Jubilee Scholarship",
    provider: "LIC Golden Jubilee Foundation",
    providerType: "Private",
    description:
      "Support for students entering professional or vocational education after strong academic performance.",
    amount: "Up to ₹40,000 per year",
    amountValue: 40000,
    education_level: ["Undergraduate", "Diploma"],
    course: ["Any course"],
    year_of_study: ["1st year", "2nd year", "3rd year"],
    minimum_percentage: 70,
    maximum_income: 400000,
    age_limit: 25,
    category: ["All categories"],
    gender: "All",
    state: ["All India"],
    domicile_requirement: "Indian domicile",
    institution_type: ["Government", "Private"],
    disability_requirement: "Not required",
    minority_requirement: "Not required",
    application_start_date: daysFromNow(-20),
    application_deadline: daysFromNow(67),
    documents_required: ["Academic marks card", "Income certificate", "Admission proof", "Bank account details"],
    application_url: "https://licindia.in/",
    official_website: "https://licindia.in/",
    last_verified: "8 October 2026",
    benefit: "A yearly scholarship amount paid according to the course and the provider's published terms.",
    application_period: "September – December",
    verification_deadline: "Announced by LIC Golden Jubilee Foundation",
    expected_result_date: "Announced by LIC Golden Jubilee Foundation",
    eligibility: [
      "Student entering a recognised professional, technical, or vocational course",
      "At least 70% in the qualifying examination",
      "Annual family income within ₹4 lakh",
      "Applicant should meet the provider's admission and documentation conditions",
    ],
    focus: "merit",
  },
  {
    id: "tata-capital",
    name: "Tata Capital Pankh Scholarship",
    provider: "Tata Capital",
    providerType: "Private",
    description:
      "Education support for students in school, diploma, undergraduate, and postgraduate courses.",
    amount: "Up to 80% of tuition fees",
    amountValue: 75000,
    education_level: ["PUC / 12th", "Diploma", "Undergraduate", "Postgraduate"],
    course: ["Any course"],
    year_of_study: ["1st year", "2nd year", "3rd year", "4th year"],
    minimum_percentage: 60,
    maximum_income: 400000,
    age_limit: 30,
    category: ["All categories"],
    gender: "All",
    state: ["All India"],
    domicile_requirement: "Indian domicile",
    institution_type: ["Government", "Private"],
    disability_requirement: "Not required",
    minority_requirement: "Not required",
    application_start_date: daysFromNow(-15),
    application_deadline: daysFromNow(86),
    documents_required: ["Academic marks card", "Income certificate", "Fee receipt", "Identity document"],
    application_url: "https://www.tatacapital.com/",
    official_website: "https://www.tatacapital.com/",
    last_verified: "8 October 2026",
    benefit: "A portion of annual tuition fees, with the final amount based on the provider's assessment.",
    application_period: "September – January",
    verification_deadline: "Announced by Tata Capital",
    expected_result_date: "Announced by Tata Capital",
    eligibility: [
      "Student studying in a recognised school, diploma, undergraduate, or postgraduate course",
      "At least 60% in the previous examination",
      "Annual family income within ₹4 lakh",
      "Applicants should provide current admission and fee documents",
    ],
    focus: "need",
  },
  {
    id: "vidyasaarathi-women",
    name: "Women in STEM Support Grant",
    provider: "Vidya Saarathi partner institutions",
    providerType: "College / University",
    description:
      "A sample institution-linked opportunity for women pursuing science, technology, engineering, or mathematics.",
    amount: "Up to ₹60,000 per year",
    amountValue: 60000,
    education_level: ["Undergraduate", "Postgraduate"],
    course: ["Engineering", "Computer Science", "Science"],
    year_of_study: ["1st year", "2nd year", "3rd year", "4th year"],
    minimum_percentage: 70,
    maximum_income: 800000,
    age_limit: 30,
    category: ["All categories"],
    gender: "Women",
    state: ["All India"],
    domicile_requirement: "Indian domicile",
    institution_type: ["Private", "Government"],
    disability_requirement: "Not required",
    minority_requirement: "Not required",
    application_start_date: daysFromNow(-18),
    application_deadline: daysFromNow(14),
    documents_required: ["Academic marks card", "College ID", "Income certificate", "Bonafide certificate"],
    application_url: "https://www.vidyasaarathi.co.in/",
    official_website: "https://www.vidyasaarathi.co.in/",
    last_verified: "8 October 2026",
    benefit: "Education support for eligible women students enrolled in a participating institution or programme.",
    application_period: "September – October",
    verification_deadline: "Announced by the participating institution",
    expected_result_date: "Announced by the participating institution",
    eligibility: [
      "Woman student enrolled in a participating STEM course",
      "At least 70% in the previous qualifying examination",
      "Annual family income within ₹8 lakh",
      "The college or programme must be included in the current provider list",
    ],
    focus: "merit",
  },
  {
    id: "post-matric-minority",
    name: "Post-Matric Scholarship for Minorities",
    provider: "Ministry of Minority Affairs",
    providerType: "Government",
    description:
      "A past-cycle reference opportunity for minority students studying after Class 10.",
    amount: "Course-based assistance",
    amountValue: 30000,
    education_level: ["PUC / 12th", "Diploma", "Undergraduate", "Postgraduate"],
    course: ["Any course"],
    year_of_study: ["All years"],
    minimum_percentage: 50,
    maximum_income: 200000,
    age_limit: 30,
    category: ["Minority"],
    gender: "All",
    state: ["All India"],
    domicile_requirement: "State or central domicile as specified in the notification",
    institution_type: ["Government", "Private"],
    disability_requirement: "Not required",
    minority_requirement: "Required",
    application_start_date: "2025-07-01",
    application_deadline: "2025-10-31",
    documents_required: ["Academic marks card", "Income certificate", "Minority declaration", "Domicile certificate"],
    application_url: "https://scholarships.gov.in/",
    official_website: "https://scholarships.gov.in/",
    last_verified: "8 October 2026",
    benefit: "Course-related assistance according to the published terms of the previous application cycle.",
    application_period: "July – October 2025",
    verification_deadline: "Closed for the previous cycle",
    expected_result_date: "Closed for the previous cycle",
    eligibility: [
      "Student studying after Class 10 in a recognised course",
      "At least 50% in the previous examination",
      "Annual family income within ₹2 lakh",
      "Applicant belongs to a notified minority community",
    ],
    focus: "need",
  },
];

const getStatus = (scholarship: Scholarship, now = new Date()): Status => {
  const deadline = new Date(`${scholarship.application_deadline}T23:59:59`);
  const daysRemaining = Math.ceil((deadline.getTime() - now.getTime()) / 86400000);
  if (daysRemaining < 0) return "closed";
  if (daysRemaining <= 14) return "closing-soon";
  return "open";
};

const getStatusLabel = (status: Status) => {
  if (status === "closed") return "Applications Closed";
  if (status === "closing-soon") return "Closing Soon";
  return "Applications Open";
};

const getMatch = (scholarship: Scholarship, profile: StudentProfile): Match => {
  const percentage = Number(profile.currentPercentage || profile.previousPercentage || 0);
  const income = Number(profile.annualIncome || 0);
  const age = Number(profile.age || 0);
  const educationMatches = !profile.educationLevel || scholarship.education_level.some((level) => level === profile.educationLevel);
  const incomeMatches = !income || income <= scholarship.maximum_income;
  const percentageMatches = !percentage || percentage >= scholarship.minimum_percentage;
  const ageMatches = !age || age <= scholarship.age_limit;
  const stateMatches = !profile.state || scholarship.state.includes("All India") || scholarship.state.includes(profile.state);
  const categoryMatches = !profile.category || scholarship.category.includes("All categories") || scholarship.category.includes(profile.category);
  const institutionMatches = !profile.institutionType || scholarship.institution_type.includes(profile.institutionType);
  const genderMatches = !profile.gender || scholarship.gender === "All" || scholarship.gender === profile.gender;
  const reasons: MatchReason[] = [
    { label: "Education level", detail: educationMatches ? "Eligible" : `This opportunity is for ${scholarship.education_level.join(", ")}.`, good: educationMatches },
    { label: "Academic percentage", detail: percentageMatches ? "Meets requirement" : `Needs at least ${scholarship.minimum_percentage}%.`, good: percentageMatches },
    { label: "Family income", detail: incomeMatches ? `Within ₹${(scholarship.maximum_income / 100000).toFixed(1).replace(".0", "")} lakh limit` : `Limit is ₹${(scholarship.maximum_income / 100000).toFixed(1)} lakh.`, good: incomeMatches },
    { label: "State / domicile", detail: stateMatches ? "Eligible" : "Check the domicile requirement.", good: stateMatches },
    { label: "Institution type", detail: institutionMatches ? "Accepted institution type" : "Check institution conditions.", good: institutionMatches },
    { label: "Age and gender", detail: ageMatches && genderMatches ? "Within the published criteria" : "Check age or gender criteria.", good: ageMatches && genderMatches },
    { label: "Category", detail: categoryMatches ? "No category mismatch" : "Category-specific criteria may apply.", good: categoryMatches },
  ];
  const score = Math.round((reasons.filter((reason) => reason.good).length / reasons.length) * 100);
  return { score, strong: score >= 80, reasons };
};

const Button = ({ variant = "primary", className = "", children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "text" }) => (
  <button className={`button button-${variant} ${className}`} {...props}>
    {children}
  </button>
);

const SectionHeading = ({ eyebrow, title, body, align = "left" }: { eyebrow?: string; title: string; body?: string; align?: "left" | "center" }) => (
  <div className={`section-heading section-heading-${align}`}>
    {eyebrow && <p className="eyebrow">{eyebrow}</p>}
    <h2>{title}</h2>
    {body && <p>{body}</p>}
  </div>
);

const StatusBadge = ({ status }: { status: Status }) => (
  <span className={`status-badge status-${status}`}>
    <span className="status-dot" aria-hidden="true" />
    {getStatusLabel(status)}
  </span>
);

const Field = ({ id, label, hint, error, children }: { id: string; label: string; hint?: string; error?: string; children: ReactNode }) => (
  <div className="field-group">
    <label htmlFor={id}>{label}</label>
    {hint && <span className="field-hint">{hint}</span>}
    {children}
    {error && <span className="field-error" role="alert">{error}</span>}
  </div>
);

const inputClass = "form-control";

function ScholarshipCard({
  scholarship,
  match,
  onDetails,
  onWhy,
  whyOpen,
}: {
  scholarship: Scholarship;
  match: Match;
  onDetails: () => void;
  onWhy: () => void;
  whyOpen: boolean;
}) {
  const status = getStatus(scholarship);
  return (
    <article className={`scholarship-card ${status === "closed" ? "scholarship-card-closed" : ""}`}>
      <div className="card-topline">
        <span className="provider-label"><Building2 size={14} /> {scholarship.provider}</span>
        <StatusBadge status={status} />
      </div>
      <div className="card-title-row">
        <div>
          <h3>{scholarship.name}</h3>
          <span className="provider-type">{scholarship.providerType}</span>
        </div>
        <div className="match-score" aria-label={`${match.score}% match`}>
          <strong>{match.score}%</strong>
          <span>Match</span>
        </div>
      </div>
      <p className="card-description">{scholarship.description}</p>
      <div className="card-meta-grid">
        <div><Banknote size={16} /><span><b>Benefit</b>{scholarship.amount}</span></div>
        <div><CalendarDays size={16} /><span><b>{status === "closed" ? "Previous deadline" : "Deadline"}</b>{formatDate(scholarship.application_deadline)}</span></div>
        <div><GraduationCap size={16} /><span><b>Education</b>{scholarship.education_level.join(", ")}</span></div>
        <div><MapPin size={16} /><span><b>Location</b>{scholarship.state.join(", ")}</span></div>
      </div>
      <div className="eligibility-summary"><strong>Eligibility</strong><span>{scholarship.eligibility[0]}</span></div>
      <button className="why-button" onClick={onWhy} aria-expanded={whyOpen}>
        <CircleHelp size={16} /> Why am I eligible? <ChevronDown size={16} className={whyOpen ? "rotate-icon" : ""} />
      </button>
      {whyOpen && (
        <div className="match-reasons">
          <strong>Why this scholarship matches you</strong>
          {match.reasons.slice(0, 5).map((reason) => (
            <div className="reason-row" key={reason.label}>
              {reason.good ? <CheckCircle2 size={16} className="reason-good" /> : <Info size={16} className="reason-warn" />}
              <span><b>{reason.label}:</b> {reason.detail}</span>
            </div>
          ))}
        </div>
      )}
      <div className="card-footer">
        <span className="verified"><BadgeCheck size={15} /> Last verified: {scholarship.last_verified}</span>
        <div className="card-actions">
          <Button variant="secondary" onClick={onDetails}>{status === "closed" ? "View Scholarship" : "View Details"}</Button>
          {status !== "closed" && <a className="button button-primary" href={scholarship.application_url} target="_blank" rel="noreferrer">Apply Now <ExternalLink size={15} /></a>}
        </div>
      </div>
    </article>
  );
}

function Header({ onEligibility, onNavigate }: { onEligibility: () => void; onNavigate: (id: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    ["Home", "top"],
    ["Find Scholarships", "open-scholarships"],
    ["Open Scholarships", "open-scholarships"],
    ["Past Scholarships", "past-scholarships"],
    ["How It Works", "how-it-works"],
    ["About", "trust"],
  ];
  const navigate = (id: string) => {
    setMenuOpen(false);
    onNavigate(id);
  };
  return (
    <header className="site-header">
      <div className="container header-inner">
        <button className="brand" onClick={() => navigate("top")} aria-label="Go to home">
          <span className="brand-mark"><BookOpenCheck size={20} /></span>
          <span className="brand-copy"><strong>Student Scholarship</strong><small>Eligibility Checker</small></span>
        </button>
        <button className="mobile-menu-button" aria-label="Open navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={`main-nav ${menuOpen ? "main-nav-open" : ""}`} aria-label="Main navigation">
          {links.map(([label, id]) => <button key={label} onClick={() => navigate(id)}>{label}</button>)}
          <Button className="header-cta" onClick={onEligibility}>Check Eligibility <ArrowRight size={16} /></Button>
        </nav>
      </div>
    </header>
  );
}

function Landing({ onEligibility, onNavigate, onDetails }: { onEligibility: () => void; onNavigate: (id: string) => void; onDetails: (scholarship: Scholarship) => void }) {
  const sampleProfile = { ...initialProfile, age: "19", state: "Karnataka", educationLevel: "Undergraduate", currentPercentage: "82", annualIncome: "360000", institutionType: "Private" };
  return (
    <>
      <Header onEligibility={onEligibility} onNavigate={onNavigate} />
      <main id="top">
        <section className="hero-section">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">A clearer place to start</p>
              <h1>Find Scholarships <span>You May Be Eligible For</span></h1>
              <p className="hero-subtitle">Enter your student details and get a list of scholarships that match your education, income, category, location, and other eligibility requirements.</p>
              <div className="hero-actions"><Button onClick={onEligibility}>Check My Eligibility <ArrowRight size={17} /></Button><Button variant="secondary" onClick={() => onNavigate("open-scholarships")}>Browse Scholarships</Button></div>
              <div className="hero-note"><ShieldCheck size={17} /><span>Plain-language matches based on published scholarship criteria.</span></div>
            </div>
            <div className="hero-card" aria-label="Eligibility checker preview">
              <div className="hero-card-header"><div><span className="small-label">Your starting point</span><h2>Find a good fit</h2></div><span className="step-number">01</span></div>
              <div className="preview-row"><span className="preview-icon"><UserRound size={17} /></span><span><b>Tell us about you</b><small>Education, location, income</small></span><Check size={16} className="preview-check" /></div>
              <div className="preview-row"><span className="preview-icon"><FileCheck2 size={17} /></span><span><b>See matching criteria</b><small>Clear reasons, not guesswork</small></span><Check size={16} className="preview-check" /></div>
              <div className="preview-row"><span className="preview-icon"><ExternalLink size={17} /></span><span><b>Continue to the provider</b><small>Apply on the official website</small></span><ArrowRight size={16} className="preview-arrow" /></div>
              <div className="preview-footer"><span><span className="live-dot" /> Open opportunities</span><span>Updated regularly</span></div>
            </div>
          </div>
        </section>

        <section className="trust-strip"><div className="container trust-strip-inner"><span><ShieldCheck size={18} /> Transparent criteria</span><span><Landmark size={18} /> Government and private sources</span><span><CalendarDays size={18} /> Last verified dates shown</span></div></section>

        <section id="how-it-works" className="section section-white"><div className="container"><SectionHeading eyebrow="How it works" title="A simple way to narrow your options" body="You stay in control. We organise the information, explain the match, and take you to the provider when you are ready." /><div className="steps-grid">{[
          { number: "01", title: "Enter your details", body: "Tell us about your education, academic performance, income, location, and other relevant information.", Icon: UserRound },
          { number: "02", title: "Check your matches", body: "We compare your information with the published eligibility requirements for each opportunity.", Icon: SlidersHorizontal },
          { number: "03", title: "Apply on the official website", body: "Review the details and continue to the scholarship provider's own application page.", Icon: ExternalLink },
        ].map(({ number, title, body, Icon }) => <div className="step-card" key={number}><span className="step-index">{number}</span><span className="step-icon"><Icon size={22} /></span><h3>{title}</h3><p>{body}</p></div>)}</div></div></section>

        <section className="section section-soft" id="categories"><div className="container"><SectionHeading eyebrow="Start with what matters" title="Scholarships organised around your needs" body="Use the categories as a starting point, then check the full requirements on every scholarship page." /><div className="category-grid">{[
          { title: "Merit-based", body: "For strong academic performance and course progress", Icon: GraduationCap },
          { title: "Need-based", body: "For students who need help with education costs", Icon: Banknote },
          { title: "Government", body: "Public scholarships and central sector schemes", Icon: Landmark },
          { title: "College / University", body: "Opportunities linked to an institution or programme", Icon: Building2 },
        ].map(({ title, body, Icon }) => <button className="category-card" key={title} onClick={() => onNavigate("open-scholarships")}><span className="category-icon"><Icon size={20} /></span><span><b>{title}</b><small>{body}</small></span><ArrowRight size={17} /></button>)}</div></div></section>

        <section className="section section-white" id="examples"><div className="container"><div className="section-heading-row"><SectionHeading eyebrow="A quick look" title="Examples of what you will see" body="Every card keeps the important information close at hand, including why a scholarship may fit your profile." /><button className="text-link" onClick={() => onNavigate("open-scholarships")}>See all open scholarships <ArrowRight size={16} /></button></div><div className="card-grid">{scholarships.slice(0, 2).map((scholarship) => <ScholarshipCard key={scholarship.id} scholarship={scholarship} match={getMatch(scholarship, sampleProfile)} onDetails={() => onDetails(scholarship)} onWhy={() => undefined} whyOpen={false} />)}</div></div></section>

        <section className="section section-soft" id="open-scholarships"><div className="container"><div className="section-heading-row"><SectionHeading eyebrow="Currently open" title="Opportunities you can explore now" body="Deadlines and status are calculated from each scholarship record. Always confirm the current details on the official provider website." /><button className="text-link" onClick={onEligibility}>Check your eligibility <ArrowRight size={16} /></button></div><div className="card-grid">{scholarships.filter((scholarship) => getStatus(scholarship) !== "closed").slice(0, 3).map((scholarship) => <ScholarshipCard key={scholarship.id} scholarship={scholarship} match={getMatch(scholarship, sampleProfile)} onDetails={() => onDetails(scholarship)} onWhy={() => undefined} whyOpen={false} />)}</div></div></section>

        <section className="section section-white" id="past-scholarships"><div className="container past-section"><div><SectionHeading eyebrow="Past scholarships" title="Keep an eye on future cycles" body="These scholarships are no longer accepting applications. We keep them here so you can understand previous opportunities and prepare for the next cycle." /><Button variant="secondary" onClick={() => onNavigate("open-scholarships")}>Browse the scholarship list <ArrowRight size={16} /></Button></div><div className="past-preview"><div className="past-preview-top"><span className="closed-label"><Clock3 size={15} /> Applications Closed</span><span>Previous cycle</span></div><h3>Post-Matric Scholarship for Minorities</h3><p>Ministry of Minority Affairs · Course-based assistance</p><div className="past-meta"><span><CalendarDays size={15} /> Deadline: 31 October 2025</span><span><FileText size={15} /> Need-based support</span></div><button className="text-link" onClick={() => onDetails(scholarships[5])}>View scholarship <ArrowRight size={16} /></button></div></div></section>

        <section className="section section-soft" id="trust"><div className="container trust-grid"><div><SectionHeading eyebrow="Trust and transparency" title="Scholarship information can change" body="Application dates, eligibility requirements, scholarship amounts, and application links may change. We show the last verified date so you know how recently the information was checked." /><div className="trust-dates"><div><span>Last updated</span><strong>8 October 2026</strong></div><div><span>Last verified</span><strong>Shown on every scholarship</strong></div></div></div><div className="disclaimer-card"><ShieldCheck size={21} /><h3>A useful starting point, not a promise</h3><p>We do not guarantee scholarship approval. Eligibility shown on this website is based on the information provided and the published scholarship requirements. Final eligibility is decided by the scholarship provider.</p><span>Confirm every detail on the official provider website before applying.</span></div></div></section>

        <section className="section section-white" id="faq"><div className="container faq-layout"><SectionHeading eyebrow="Questions students ask" title="A few helpful answers" body="If you are unsure, start with the eligibility form. You can review your information before seeing results." /><div className="faq-list">{[
          ["How does the scholarship checker work?", "You enter the details that scholarships commonly ask for. We compare those details with the criteria in our scholarship records and show the reasons behind each match."],
          ["What information do I need to provide?", "You will need basic information, education details, academic performance, family income, location, and a few eligibility details. We do not ask for unnecessary sensitive information."],
          ["Does the website apply for scholarships for me?", "No. The checker helps you find and understand opportunities. Applications are completed on the official provider website."],
          ["Are the scholarships verified?", "We show a last verified date and encourage you to confirm every deadline, requirement, and link on the provider's website before applying."],
          ["Why do I see expired scholarships?", "Past opportunities can help you prepare for the next application cycle and understand the type of support that may return."],
          ["How accurate is the eligibility result?", "The result is a guide based on the information you provide and published criteria. The provider makes the final eligibility decision."],
        ].map(([question, answer]) => <details className="faq-item" key={String(question)}><summary>{question}<ChevronDown size={18} /></summary><p>{answer}</p></details>)}</div></div></section>

        <section className="final-cta"><div className="container final-cta-inner"><div><p className="eyebrow">Ready when you are</p><h2>See which scholarships may fit your profile.</h2><p>It takes a few minutes to enter your details, and you can review the criteria before applying.</p></div><Button onClick={onEligibility}>Check My Eligibility <ArrowRight size={17} /></Button></div></section>
      </main>
      <footer className="site-footer"><div className="container footer-grid"><div className="footer-brand"><span className="brand-mark"><BookOpenCheck size={20} /></span><div><strong>Student Scholarship Eligibility Checker</strong><p>Find scholarships based on your student profile and eligibility.</p></div></div><div className="footer-links"><div><strong>Explore</strong><button onClick={() => onNavigate("open-scholarships")}>Find Scholarships</button><button onClick={() => onNavigate("open-scholarships")}>Open Scholarships</button><button onClick={() => onNavigate("past-scholarships")}>Past Scholarships</button></div><div><strong>About</strong><button onClick={() => onNavigate("how-it-works")}>How It Works</button><button onClick={() => onNavigate("trust")}>About</button><button onClick={() => onNavigate("faq")}>FAQ</button></div><div><strong>Information</strong><button>Privacy Policy</button><button>Terms</button><button>Disclaimer</button></div></div></div><div className="container footer-bottom"><span>Scholarship information should always be confirmed on the official provider website before applying.</span><span>Built for students in India.</span></div></footer>
    </>
  );
}

function EligibilityFlow({ profile, setProfile, onBack, onComplete }: { profile: StudentProfile; setProfile: (profile: StudentProfile) => void; onBack: () => void; onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const update = (key: keyof StudentProfile, value: string) => setProfile({ ...profile, [key]: value });
  const steps = ["Basic information", "Education", "Academic information", "Family information", "Eligibility details"];
  const next = () => {
    setError("");
    if (step === 1 && (!profile.fullName || !profile.age || !profile.state)) { setError("Please enter your full name, age, and state before continuing."); return; }
    if (step === 2 && (!profile.educationLevel || !profile.institutionType)) { setError("Please select your education level and institution type."); return; }
    if (step < 5) setStep(step + 1); else onComplete();
  };
  const field = (key: keyof StudentProfile, label: string, hint?: string) => <Field id={key} label={label} hint={hint}><input id={key} className={inputClass} value={profile[key]} onChange={(event) => update(key, event.target.value)} /></Field>;
  const select = (key: keyof StudentProfile, label: string, options: string[], hint?: string) => <Field id={key} label={label} hint={hint}><select id={key} className={inputClass} value={profile[key]} onChange={(event) => update(key, event.target.value)}><option value="">Select an option</option>{options.map((option) => <option key={option}>{option}</option>)}</select></Field>;
  return <div className="flow-shell"><Header onEligibility={onBack} onNavigate={() => undefined} /><main className="flow-main"><div className="container flow-container"><button className="back-link" onClick={onBack}><ChevronLeft size={17} /> Back to scholarships</button><div className="flow-header"><div><p className="eyebrow">Personalised matching</p><h1>Tell us a little about yourself</h1><p>We only use these details to organise a useful starting list. You can change anything before you see your matches.</p></div><span className="flow-step-label">Step {step} of 5</span></div><div className="progress-track"><span style={{ width: `${step * 20}%` }} /></div><div className="step-nav">{steps.map((label, index) => <span className={index + 1 <= step ? "active" : ""} key={label}><b>{index + 1}</b>{label}</span>)}</div><form className="form-card" onSubmit={(event) => { event.preventDefault(); next(); }}><div className="form-card-heading"><div><span className="small-label">Step {step}</span><h2>{steps[step - 1]}</h2></div><span className="form-note"><Info size={15} /> Required fields are marked by the form context</span></div>{step === 1 && <div className="form-grid">{field("fullName", "Full name", "Use the name on your education records.")}{field("age", "Age")}{select("gender", "Gender", ["Woman", "Man", "Prefer not to say"])}{select("state", "State", ["Andhra Pradesh", "Delhi", "Gujarat", "Karnataka", "Kerala", "Maharashtra", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal", "Other"])}{field("district", "District")}</div>}{step === 2 && <div className="form-grid">{select("educationLevel", "Current education level", ["SSLC / 10th", "PUC / 12th", "Diploma", "Undergraduate", "Postgraduate", "PhD"], "Choose the level you are studying now.")}{field("course", "Course / degree")}{field("branch", "Branch / stream")}{select("yearOfStudy", "Year of study", ["1st year", "2nd year", "3rd year", "4th year", "Final year", "Not applicable"])}{select("institutionType", "Institution type", ["Government", "Private", "College / University"])}{field("institutionName", "College / school name")}{field("board", "University / board")}</div>}{step === 3 && <div className="form-grid">{field("previousPercentage", "Previous examination percentage", "Enter a number such as 78.5.")}{field("currentPercentage", "Current CGPA / percentage")}{field("yearOfPassing", "Year of passing")}{select("academicPerformance", "Academic performance", ["Excellent", "Good", "Average", "Needs improvement"], "This helps us explain the match in plain language.")}</div>}{step === 4 && <div className="form-grid">{field("annualIncome", "Annual family income", "Enter the approximate amount in rupees, without commas.")}{field("familyMembers", "Number of family members")}{field("occupation", "Parent / guardian occupation")}{select("firstGeneration", "First-generation college student?", ["Yes", "No", "Not sure", "Prefer not to say"])}{select("specialCategory", "Eligible special category?", ["None", "Single parent household", "Orphaned student", "Armed forces family", "Other", "Prefer not to say"], "Only choose this if it applies to you.")}</div>}{step === 5 && <div className="form-grid">{select("category", "Category", ["General", "OBC", "SC", "ST", "EWS", "Minority", "Prefer not to say"])}{select("disability", "Disability status", ["No", "Yes", "Prefer not to say"])}{select("minority", "Minority status", ["No", "Yes", "Prefer not to say"])}{select("domicileState", "Domicile state", ["Same as current state", "Different state", "Not sure"])}{select("locationType", "Rural / urban location", ["Rural", "Urban", "Not sure"])}{select("livingType", "Hosteller / day scholar", ["Hosteller", "Day scholar", "Not decided"])}{select("institutionOwnership", "Government / private institution", ["Government", "Private", "College / University"])}{field("otherEligibility", "Anything else to consider?", "Optional. For example, a scholarship-specific question you want to remember.")}</div>}{error && <div className="form-error" role="alert"><Info size={17} />{error}</div>}<div className="form-actions"><Button variant="secondary" type="button" onClick={() => step === 1 ? onBack() : setStep(step - 1)}><ChevronLeft size={17} /> Back</Button><Button type="submit">{step === 5 ? "Find Scholarships" : "Continue"}<ChevronRight size={17} /></Button></div></form></div></main></div>;
}

function ResultsDashboard({ profile, onBackHome, onDetails }: { profile: StudentProfile; onBackHome: () => void; onDetails: (scholarship: Scholarship) => void }) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [sort, setSort] = useState<SortKey>("match");
  const [query, setQuery] = useState("");
  const [openWhy, setOpenWhy] = useState<string | null>(null);
  const results = useMemo(() => scholarships.map((scholarship) => ({ scholarship, match: getMatch(scholarship, profile) })).filter(({ scholarship }) => {
    const status = getStatus(scholarship);
    const normalized = query.toLowerCase().trim();
    const searchable = [scholarship.name, scholarship.provider, scholarship.course.join(" "), scholarship.education_level.join(" "), scholarship.state.join(" "), scholarship.category.join(" ")].join(" ").toLowerCase();
    const filterMatch = filter === "all" || (filter === "open" && status === "open") || (filter === "closing-soon" && status === "closing-soon") || (filter === "closed" && status === "closed") || (filter === "government" && scholarship.providerType === "Government") || (filter === "private" && scholarship.providerType === "Private") || (filter === "college" && scholarship.providerType === "College / University") || (filter === "merit" && scholarship.focus === "merit") || (filter === "need" && scholarship.focus === "need");
    return filterMatch && (!normalized || searchable.includes(normalized));
  }).sort((a, b) => {
    if (sort === "amount") return b.scholarship.amountValue - a.scholarship.amountValue;
    if (sort === "deadline") return new Date(a.scholarship.application_deadline).getTime() - new Date(b.scholarship.application_deadline).getTime();
    if (sort === "updated") return b.scholarship.last_verified.localeCompare(a.scholarship.last_verified);
    return b.match.score - a.match.score;
  }), [filter, profile, query, sort]);
  const filters: [FilterKey, string][] = [["all", "All"], ["open", "Currently Open"], ["closing-soon", "Closing Soon"], ["closed", "Expired"], ["government", "Government"], ["private", "Private"], ["college", "College / University"], ["merit", "Merit-based"], ["need", "Need-based"]];
  return <div className="results-shell"><Header onEligibility={() => undefined} onNavigate={onBackHome} /><main className="results-main"><div className="container"><button className="back-link" onClick={onBackHome}><ChevronLeft size={17} /> Back to home</button><div className="results-heading"><div><p className="eyebrow">Your shortlist</p><h1>Scholarships Matching Your Profile</h1><p>{results.length} scholarships shown from the current sample records. Your match score is a guide based on the information you entered.</p></div><div className="profile-summary"><span className="profile-avatar"><UserRound size={20} /></span><span><b>{profile.fullName || "Your profile"}</b><small>{profile.educationLevel}{profile.state ? ` · ${profile.state}` : ""}</small></span><button onClick={onBackHome} aria-label="Return to home"><ArrowRight size={16} /></button></div></div><div className="search-toolbar"><label className="search-box"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search scholarships by name, course, state or provider..." aria-label="Search scholarships" /></label><label className="sort-box"><ArrowDownUp size={16} /><span>Sort by</span><select value={sort} onChange={(event) => setSort(event.target.value as SortKey)}><option value="match">Best Match</option><option value="deadline">Deadline Soonest</option><option value="amount">Highest Scholarship Amount</option><option value="updated">Recently Updated</option></select></label></div><div className="results-layout"><aside className="filter-panel"><div className="filter-title"><span><Filter size={17} /> Filters</span><SlidersHorizontal size={17} /></div><div className="filter-group"><span className="filter-label">Scholarship type</span>{filters.map(([key, label]) => <button className={filter === key ? "filter-option active" : "filter-option"} key={key} onClick={() => setFilter(key)}><span>{label}</span>{key === "all" && <small>{scholarships.length}</small>}</button>)}</div><div className="filter-note"><ShieldCheck size={17} /><p>Check the official provider site before applying. Dates and criteria can change.</p></div></aside><div className="results-list"><div className="results-list-top"><span><b>{results.length}</b> matching scholarships</span><span className="desktop-filter-hint">Use the filters to narrow the list.</span></div>{results.length ? results.map(({ scholarship, match }) => <ScholarshipCard key={scholarship.id} scholarship={scholarship} match={match} onDetails={() => onDetails(scholarship)} onWhy={() => setOpenWhy(openWhy === scholarship.id ? null : scholarship.id)} whyOpen={openWhy === scholarship.id} />) : <div className="empty-state"><Search size={24} /><h3>No scholarships found</h3><p>Try a different search term or reset the filters.</p><Button variant="secondary" onClick={() => { setQuery(""); setFilter("all"); }}>Reset filters</Button></div>}</div></div></div></main></div>;
}

function ScholarshipDetails({ scholarship, match, onClose }: { scholarship: Scholarship; match: Match; onClose: () => void }) {
  const status = getStatus(scholarship);
  return <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="details-dialog" role="dialog" aria-modal="true" aria-labelledby="details-title"><div className="details-header"><div><p className="eyebrow">Scholarship details</p><h2 id="details-title">{scholarship.name}</h2><p>{scholarship.provider} · {scholarship.providerType}</p></div><button className="icon-button" onClick={onClose} aria-label="Close details"><X size={20} /></button></div><div className="details-summary"><StatusBadge status={status} /><span className="details-match"><strong>{match.score}% Match</strong> based on the criteria you entered</span><span className="verified"><BadgeCheck size={15} /> Last verified: {scholarship.last_verified}</span></div><div className="details-scroll"><div className="detail-section"><h3>Overview</h3><p>{scholarship.description} {scholarship.benefit}</p></div><div className="detail-section"><h3>Benefits</h3><p>{scholarship.benefit}</p></div><div className="detail-section"><h3>Eligibility</h3><ul className="detail-list">{scholarship.eligibility.map((item) => <li key={item}><CheckCircle2 size={16} />{item}</li>)}</ul></div><div className="detail-two-col"><div className="detail-section"><h3>Documents Required</h3><ul className="detail-list">{scholarship.documents_required.map((item) => <li key={item}><FileText size={16} />{item}</li>)}</ul></div><div className="detail-section"><h3>Important Dates</h3><div className="date-list"><span><b>Application opens</b>{formatDate(scholarship.application_start_date)}</span><span><b>Application deadline</b>{formatDate(scholarship.application_deadline)}</span><span><b>Verification deadline</b>{scholarship.verification_deadline}</span><span><b>Expected result date</b>{scholarship.expected_result_date}</span></div></div></div><div className="detail-section"><h3>Application Process</h3><ol className="application-steps"><li>Review the eligibility and documents listed here.</li><li>Open the provider's official website and read the current notification.</li><li>Submit your application on the provider website before the published deadline.</li><li>Keep a copy of your application and check the provider's updates.</li></ol></div></div><div className="details-footer"><span>Always confirm the current information on the official provider website.</span>{status !== "closed" ? <a className="button button-primary" href={scholarship.application_url} target="_blank" rel="noreferrer">Apply on Official Website <ExternalLink size={16} /></a> : <a className="button button-secondary" href={scholarship.official_website} target="_blank" rel="noreferrer">View Official Information <ExternalLink size={16} /></a>}</div></section></div>;
}

const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function ScrollRevealIntro({ onEligibility, onNavigate, onDetails }: { onEligibility: () => void; onNavigate: (id: string) => void; onDetails: (scholarship: Scholarship) => void }) {
  const shellRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(media.matches);
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const shell = shellRef.current;
    const visual = visualRef.current;
    const video = videoRef.current;
    if (!shell || !visual || !video) return;

    let frame: number | null = null;
    const renderProgress = () => {
      const rect = shell.getBoundingClientRect();
      const travel = Math.max(window.innerHeight * 1.45, 1);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      visual.style.transform = `translate3d(0, ${-progress * 100}%, 0) scale(${1 - progress * 0.04})`;
      // Keep the scene opaque while it travels away. This exposes the real page
      // from the bottom instead of creating a double-exposure effect.
      visual.style.opacity = "1";
      visual.style.setProperty("--intro-progress", progress.toFixed(4));
      if (video.paused) void video.play().catch(() => undefined);
    };
    const scheduleRender = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        frame = null;
        renderProgress();
      });
    };

    renderProgress();
    window.addEventListener("scroll", scheduleRender, { passive: true });
    window.addEventListener("resize", scheduleRender);
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleRender);
      window.removeEventListener("resize", scheduleRender);
    };
  }, [reducedMotion]);

  if (reducedMotion) return <Landing onEligibility={onEligibility} onNavigate={onNavigate} onDetails={onDetails} />;

  return (
    <div className="intro-shell" ref={shellRef}>
      <div className="intro-underlay"><Landing onEligibility={onEligibility} onNavigate={onNavigate} onDetails={onDetails} /></div>
      <div className="intro-sticky" aria-hidden="true">
        <div className="intro-visual" ref={visualRef}>
          <video ref={videoRef} src="/manus-storage/185092-874643408_medium_e26a1af1.mp4" autoPlay muted loop playsInline preload="auto" />
          <div className="intro-tint" />
          <div className="intro-copy">
            <span className="intro-kicker">Student Scholarship Eligibility Checker</span>
            <h1>Start with a clearer view.</h1>
            <p>Scroll to enter the scholarship checker</p>
            <span className="intro-scroll-line" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("home");
  const [profile, setProfile] = useState<StudentProfile>(initialProfile);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const navigateTo = (id: string) => {
    if (screen !== "home") setScreen("home");
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 20);
  };
  const openDetails = (scholarship: Scholarship) => setSelectedScholarship(scholarship);
  const selectedMatch = selectedScholarship ? getMatch(selectedScholarship, profile.fullName ? profile : { ...initialProfile, educationLevel: "Undergraduate", currentPercentage: "82", annualIncome: "360000", state: "Karnataka" }) : null;
  if (screen === "eligibility") return <EligibilityFlow profile={profile} setProfile={setProfile} onBack={() => setScreen("home")} onComplete={() => setScreen("results")} />;
  if (screen === "results") return <>{<ResultsDashboard profile={profile} onBackHome={() => setScreen("home")} onDetails={openDetails} />}{selectedScholarship && selectedMatch && <ScholarshipDetails scholarship={selectedScholarship} match={selectedMatch} onClose={() => setSelectedScholarship(null)} />}</>;
  return <>{<ScrollRevealIntro onEligibility={() => setScreen("eligibility")} onNavigate={navigateTo} onDetails={openDetails} />}{selectedScholarship && selectedMatch && <ScholarshipDetails scholarship={selectedScholarship} match={selectedMatch} onClose={() => setSelectedScholarship(null)} />}</>;
}
