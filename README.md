# Vernier — Smart Unit Converter

React + Vite oda kattapetta smart unit converter. Length, mass, temperature,
volume, area, speed, time, data nu 8 categories irukku, plus oru smart search
bar — "10 km to miles" mari type pannalum answer varum.

## Run pannurathu eppadi

```bash
npm install
npm run dev
```

Browser la `http://localhost:5173` open pannunga.

## Production build

```bash
npm run build
npm run preview
```

`dist/` folder la production-ready static files varum — atha edhavadhu
static host (Vercel, Netlify, GitHub Pages) la deploy pannalam.

## Structure

```
src/
  data/units.js   — category + unit definitions, conversion logic, smart parser
  App.jsx         — UI (category rail + caliper-style converter card)
  App.css         — design system (colors, type, layout)
  main.jsx        — React entry point
```

## Puthu category/unit add pannanuma?

`src/data/units.js` la oru pudhu object add pannuna podhum — factor-based
categories (length, mass, etc.) ellam `factor` value oda base unit-ku
convert aagum. Temperature mattum offset irukkurathala thani function
(`toCelsius` / `fromCelsius`) use panrom.
