# Frame in Goa

A branded profile picture frame and builder ID generator built for the HH Goa 2026 shortlisting task. Upload a photo, get an instant on-brand graphic, download it, and share straight to X.

## What it does

- Upload a photo (JPG, PNG, WebP, or HEIC — including iPhone photos)
- Choose a format: **PFP Frame** or **Builder ID**
- Drag to reposition, zoom to adjust framing
- Download the finished graphic as a real image file
- Share directly to X with a pre-filled caption and `#FrameInGoa`

Everything runs client-side in the browser. No login, no signup, no upload to a server — the photo never leaves your device.

## Tech stack

- React + TypeScript
- Vite
- Tailwind CSS
- [heic2any](https://github.com/alexcorvi/heic2any) for HEIC/iPhone photo support

## Getting Started

1. Run `npm install`
2. Run `npm run dev`
3. Open the local URL shown in your terminal (usually `http://localhost:5173`)

## Project structure

```
src/
├── components/       # Header, Studio, ControlsPanel, PreviewStage
├── data/             # Builder title generator data
├── types/            # Shared TypeScript types
└── utils/
    ├── loadImage.ts   # Photo upload + HEIC conversion
    ├── draw.ts        # Canvas compositing
    ├── renderPfp.ts   # PFP Frame format renderer
    ├── renderBadge.ts # Builder ID format renderer
    └── share.ts       # Download + Share to X
```

## Brand palette

| Color | Hex |
|---|---|
| Deep green | `#0B6839` |
| Yellow | `#FEE101` |
| Hot pink | `#FF0080` |
| Cream | `#FFFBE8` |

## Built for

[HH Goa 2026](https://hhgoa.com) — Shortlisting Task #1: Frame / ID Card Generator.