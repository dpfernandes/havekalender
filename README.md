# 🌱 HaveKalender

Danish Garden Planting & Harvest Calendar — bilingual (DA/EN) web app for small garden owners in Denmark.

## Project Structure

```
havekalender/
├── package.json          ← Root — install everything from here
├── assets/
│   └── crops.ts          ← Single source of truth for all 30 crops
├── frontend/
│   ├── index.html
│   ├── vite.config.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── types/index.ts
│       ├── utils/constants.ts
│       ├── utils/cropHelpers.ts
│       ├── hooks/useCalendar.ts
│       ├── hooks/useCrops.ts
│       └── components/
│           ├── Header.tsx
│           ├── MonthStrip.tsx
│           ├── MonthNav.tsx
│           ├── TipBanner.tsx
│           ├── CropCard.tsx
│           ├── HarvestCard.tsx
│           ├── YearBar.tsx
│           ├── CropDetail.tsx
│           └── Footer.tsx
└── backend/
    ├── package.json
    ├── tsconfig.json
    └── src/
        ├── index.ts
        ├── routes/crops.ts
        └── db/
            ├── connection.ts
            ├── schema.sql
            └── seed.ts
```

## Getting Started

Install all dependencies from the root:
```bash
npm install
```

### Database

The seed script handles everything automatically when `DATABASE_URL` is not set:
- Creates the `havekalender` database if it doesn't exist
- Applies the schema
- Seeds all 30 crops

On **macOS with Homebrew PostgreSQL**, the OS username is used by default (no `PGUSER` needed):
```bash
npm run seed
```

On other systems, or to be explicit:
```bash
PGUSER=myuser npm run seed
```

For a managed database (Railway, Supabase, etc.), set `DATABASE_URL` and run:
```bash
DATABASE_URL=postgres://... npm run seed
```

### Running the app

Start both frontend and backend together:
```bash
npm run dev
```

Or separately:
```bash
npm run dev:frontend   # http://localhost:5173
npm run dev:backend    # http://localhost:3001
```

Build for production:
```bash
npm run build
```

## Climate
Data calibrated for Denmark's Köppen-Geiger **Cfb** climate:
- **C** = temperate (coldest month above −3°C)
- **f** = fully humid (no dry season)
- **b** = warm summer (warmest month below 22°C)
