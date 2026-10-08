# Delivery outcomes

## 1. Landing page and navigation

- The website is called **Student Scholarship Eligibility Checker** and uses plain, natural English.
- The navigation contains Home, Find Scholarships, Open Scholarships, Past Scholarships, How It Works, About, and a Check Eligibility action; it becomes a compact mobile menu.
- The hero says **Find Scholarships You May Be Eligible For**, explains that student details are compared with education, income, category, location, and other requirements, and provides **Check My Eligibility** and **Browse Scholarships** actions.
- The landing page includes the quick eligibility CTA, three-step How It Works section, scholarship categories, example cards, open and past scholarship previews, verification/trust content, FAQ, final CTA, and footer links.

## 2. Eligibility flow

- Clicking Check My Eligibility opens a clean multi-step form with a visible **Step X of 5** indicator, Back, Continue, and final **Find Scholarships** actions.
- Step 1 collects full name, age, gender, state, and district.
- Step 2 collects current education level with SSLC/10th, PUC/12th, Diploma, Undergraduate, Postgraduate, and PhD options; course/degree, branch/stream, year of study, institution type, college/school name, and university/board.
- Step 3 collects previous examination percentage, current CGPA/percentage, year of passing, and academic performance.
- Step 4 collects annual family income, number of family members, parent/guardian occupation, first-generation college status, and eligible special-category status.
- Step 5 collects category, disability status, minority status, domicile state, rural/urban location, hosteller/day scholar status, government/private institution, and scholarship-specific eligibility details.
- Fields have visible labels, helpful descriptions, large controls, accessible focus states, and clear validation messages without requesting unnecessary sensitive information.

## 3. Scholarship matching and results dashboard

- Submitting the form opens **Scholarships Matching Your Profile** with a count and a profile summary.
- Results can be filtered by All, Currently Open, Closing Soon, Expired, Government, Private, College / University, Merit-based, Need-based, scholarship amount, deadline, education level, state, and category.
- Results can be sorted by Best Match, Deadline Soonest, Highest Scholarship Amount, and Recently Updated, and searched by name, provider, course, education level, state, or category.
- Each result has a simple match indicator such as a percentage or Strong Match, plus a **Why am I eligible?** disclosure that lists matched requirements and explains a mismatch when present.
- Status is calculated from each record's application deadline as Open, Closing Soon, or Closed; the UI does not hard-code live status.

## 4. Scholarship cards, details, and past opportunities

- Open cards show scholarship name, provider, amount/benefit, deadline, eligibility summary, education level, eligible regions, category and income requirements when applicable, status, View Details, Apply Now, and Last verified.
- Expired cards are visually distinct, show Applications Closed, previous deadline, amount, eligibility, previous application period, View Scholarship, and official information; they never show Apply Now.
- View Details opens an information-complete scholarship view with Overview, Benefits, Eligibility, Documents Required, Important Dates, Application Process, and an **Apply on Official Website** button.
- The app never pretends to submit an official scholarship application.
- Past Scholarships explains that closed opportunities remain for reference and future cycles, and offers View Scholarship plus optional Watch for Next Cycle.

## 5. Trust, accessibility, and responsive design

- The design uses Inter, a flat warm palette inspired by the supplied video (`#F3EEE7`, `#FFFDF9`, `#2D2924`, `#756D63`, `#A26040`), white/paper cards, and subtle borders with a consistent 4px/8px spacing rhythm.
- There are no gradients, glassmorphism, neon, fake AI visuals, excessive shadows, emojis, floating 3D objects, or unnecessary decorative elements.
- Semantic headings, labels, keyboard focus states, readable contrast, screen-reader-friendly controls, and non-color status labels are present.
- Desktop, laptop, tablet, and mobile layouts are supported; cards stack, controls stay tap-friendly, and navigation becomes compact on mobile.
- Trust copy includes last-updated/last-verified language and the disclaimer that final eligibility and approval are decided by the scholarship provider.

## 6. Scroll-linked cinematic intro

- On first open, the supplied video fills the viewport as the opening scene while the real Scholarship Eligibility Checker interface is already present underneath it.
- The intro moves away only in response to scroll position: it uses a sticky full-screen layer, GPU-friendly transforms, opacity, and scroll progress; it does not hide after a timer, redirect, or require an Enter Website button.
- The video has no visible controls, is muted, uses autoplay and inline playback where supported, preserves its aspect ratio while remaining centered and full-screen, and avoids horizontal scrolling on desktop and mobile.
- After the reveal, the existing website continues as normal and all scholarship navigation, eligibility, matching, search, filters, details, and official-provider links remain functional.
- Users with `prefers-reduced-motion: reduce` skip the cinematic animation and see the normal website immediately.
- The intro keeps the warm sand, paper, charcoal, and muted terracotta palette inspired by the supplied video, with no gradients, glassmorphism, neon, emojis, or unnecessary decorative animation.
