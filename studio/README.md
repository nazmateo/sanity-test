# Sanity Studio

## Environment setup

Use separate env files per mode:

- `.env.development.local` for `sanity dev`
- `.env.production.local` for `sanity build` and `sanity deploy`

Do not use `.env.local` in this project because it applies to both development and production builds.

Start from `.env.example` and copy values into both files:

```bash
cp .env.example .env.development.local
cp .env.example .env.production.local
```

Required variables:

- `SANITY_STUDIO_PROJECT_ID`
- `SANITY_STUDIO_DATASET`
- `SANITY_STUDIO_STUDIO_HOST`

Optional:

- `SANITY_STUDIO_PREVIEW_URL` (defaults to `http://localhost:3000`)

## Commands

- `npm run dev` - run local studio
- `npm run build` - build production studio
- `npm run deploy` - deploy to `SANITY_STUDIO_STUDIO_HOST`
