# 🌱 HaveKalender

Danish Garden Planting & Harvest Calendar — bilingual (DA/EN) web app for small garden owners in Denmark.

## Project Structure

```
havekalender/
├── package.json          ← Root — install everything from here
├── assets/
│   └── crops.ts          ← Crop data reference
└── frontend/
    ├── index.html
    ├── vite.config.ts
    ├── package.json
    ├── tsconfig.json
    └── src/
        ├── main.tsx
        ├── App.tsx
        ├── lib/
        │   └── supabase.ts     ← Supabase client
        ├── types/
        │   ├── index.ts
        │   └── database.ts
        ├── utils/
        │   ├── constants.ts
        │   └── cropHelpers.ts
        ├── hooks/
        │   ├── useCalendar.ts
        │   ├── useCrops.ts
        │   └── useAdminCrops.ts
        └── components/
            ├── Header.tsx
            ├── MonthStrip.tsx
            ├── MonthNav.tsx
            ├── TipBanner.tsx
            ├── CropCard.tsx
            ├── HarvestCard.tsx
            ├── YearBar.tsx
            ├── CropDetail.tsx
            ├── Footer.tsx
            └── admin/
                ├── AdminPage.tsx
                └── CropForm.tsx
```

## Getting Started

Install all dependencies from the root:
```bash
npm install
```

### Database

This project uses **Supabase** as its database. The database is already set up with:
- A `crops` table storing all 30 Danish crops
- Row Level Security (RLS) policies for public read access
- Authenticated write access for admin operations

The database connection is configured via environment variables in `.env`:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

### Running the app

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Climate
Data calibrated for Denmark's Köppen-Geiger **Cfb** climate:
- **C** = temperate (coldest month above −3°C)
- **f** = fully humid (no dry season)
- **b** = warm summer (warmest month below 22°C)
