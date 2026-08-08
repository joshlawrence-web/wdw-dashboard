# wdw-dashboard

- **`index.html`** — wait-time trends.
- **`itinerary.html`** — trip calendar: <https://joshlawrence-web.github.io/wdw-dashboard/itinerary.html>

## Editing the trip

Edit one file per day in **`days/YYYY-MM-DD.json`** (add a new file = a new day column).
Colours, categories and the visible time window live in **`trip.meta.json`**.

```jsonc
{
  "date": "2026-08-30",
  "hotel": "Grand Destino",
  "park": "Epcot",                 // or null
  "blocks": [
    { "start": "20:10", "end": "22:00", "cat": "dining", "emoji": "🥩",
      "title": "Steakhouse 71",
      "time": "8.10pm",            // optional — overrides the start–end label
      "note": "window table",      // optional
      "cancel": true }             // optional — renders struck through
  ]
}
```

Push to `main` and CI runs `node build.mjs` to regenerate `trip.json` (what the page
fetches). Run it locally to check first — it fails loudly on an unknown `cat`, a
backwards time span, or a block outside the `dayStart`/`dayEnd` window.
