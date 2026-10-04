# SAF Water

Marketing site for SAF Food & Beverage Ltd., packaged drinking water bottled in Dhaka. The copy is static. The contact form checks required fields and records the inquiry in the browser. It does not send email.

## Run

```bash
npm run dev -- -p 3010
```

Open [http://127.0.0.1:3010](http://127.0.0.1:3010).

## Pages

- Home, Careers, News, FAQ, and Contact
- About us: overview, Mission & vision, Quality, Sustainability, and Heritage (the SAF company story)
- Products: range overview with a size comparison, plus a detail page per pack at `/products/saf-daily`, `/products/saf-executive`, `/products/saf-family`, and `/products/saf-commercial`
- Media kit (`/media-kit`) with downloadable logos and brand assets
- Legal pages under `/legal/notice`, `/legal/privacy`, `/legal/terms`, and `/legal/trademark`

Product copy lives in `src/lib/site.ts` and `src/lib/product-details.ts`.
