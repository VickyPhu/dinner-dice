![Dinner Dice logo](./public/dinnerdice_logo.png)

Don't know what to cook for dinner, need new inspiration, or simply want to share good food with others? 
**Dinner Dice** is a web application where groups of friends, families, or colleagues can share recipes in an interactive and fun way.

Users submit recipes on selected days, and recipes are automatically assigned to group members, adding both surprise and inspiration to everyday cooking.

Start sharing recipes at [Dinner Dice](https://dinner-dice.vercel.app/)

## Features
- Create groups and choose how many days per week recipes should be shared
- Automatic recipe assignment when all members have submitted
- Assignments run through: 
  - Vercel Cron Jobs (daily backup)
  - Immediate trigger when the last recipe is submitted
- Secure user roles: admin and member
- Invitation system via email (Resend API - currently limited due to missing custom domain)
- Add members by username (users must already have an account)
- Responsive design (mobile, tablet, desktop)
- Accessible UI following WCAG 2.1 (A & AA) guidelines
- Dynamic state and interactive components

## How Dinner Dice work (Technical Overview)
- Users can create a group and submit one recipe per assigned day
- Each group defines which weekdays recipes should be shared
- When all group members have submitted a recipe for a given date:
  - Recipes are randomly assigned to other group members
  - Users never receive their own recipe
  - All members must submit for assignments to be created
- Assignment logic is executed either: 
  - Automatically once per day via a Vercel Cron job, or
  - Immediately when the final required recipe is submitted
- Supabase Row Level Security (RLS) ensures users can only access data they are authorized to see.
- CRUD operations (Create, Read, Update, Delete) are fully implemented with secure data handling:
  - Users can only view, update, or delete their own data.
  - Admin roles can manage group-level data.
  - Unauthorized access attempts are automatically blocked.

## Getting Started

### Requirements

- Node.js (v18 or higher)
- npm or yarn
- Next.js v.16.0.8 (or higher)
- Supabase project with correct RLS-policies
- env. variables:
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY
  - SUPABASE_SERVICE_ROLE_KEY
  - RESEND_API_KEY (Only required for email invitations)
  - NEXT_PUBLIC_APP_URL

### Installation
1. **Clone repo**
```bash
git clone https://github.com/VickyPhu/dinner-dice.git
```

If you want to clone the repository into the current folder, add a dot (.) at the end of the command
```bash
git clone https://github.com/VickyPhu/dinner-dice.git .
```

Otherwise, navigate into the newly created project folder:
```bash
cd <folder-name>
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

4. **Build for production**
```bash
npm run build
```

This will compile the project and optimize it for production.

## Tips
- All environment variables has to be set for the app to function correctly
- Recipe assignments require all group members to submit a recipe for the selected date
- Locally, cron jobs run through /api/assign-recipes and can also be triggered on recipe submission
- Supabase RLS and authentication are essential for secure data handling

## Notes
This project was developed as part of a final examination assignment and demonstrates modern full-stack web development, accessibility and professional deployment workflows.

## Checklist for G
- [x] Målgruppsanalys utförd
- [x] Projekthantering via Github Projects
- [x] Wireframes och prototyp i Figma
- [x] Responsiv design (mobil + desktop)
- [x] Följer WCAG 2.1-standarder
- [x] Next.js med React
- [x] Databas används: Supabase
- [x] State-hantering implementerad
- [x] Dynamiska komponenter och interaktivitet
- [x] Semantisk HTML
- [x] Versionshantering med GIT
- [x] Deployed och tillgängligt publikt
- [x] Helhetsupplevelse, fri från buggar

## Checklist for VG
- [x] Interaktiv prototyp i Figma som är lik färdig produkt
- [x] WCAG 2.1 nivå A och AA testad med WebAIM WAVE
- [x] State management med global lösning genom Zustand
- [x] CRUD operationer implementerade
- [x] Säker autentisering (Supabase Auth)
- [x] Fullt responsiv på alla skärmstorlekar (Mobile, desktop, tablet)
- [x] Skapat feature branches och pull requests
- [x] Automatiserat deploy flöde
- [x] Optimerad och professionell användarupplevelse