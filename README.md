# Trinh Le — CV & Portfolio

Personal CV and portfolio website for **Trinh Le** — Enterprise Solution Architect.

## Contents

| File | Description |
|------|-------------|
| `index.html` | Portfolio landing page with featured work, stats, and tech stack |
| `portfolio.html` | Redirect to GitHub Pages portfolio |
| `cvweb.html` | Full landscape-style CV (generated) |
| `cvweb-portrait.html` | Print-friendly portrait CV (generated) |
| `cv.docx` / `cv.pdf` | Word / PDF (landscape) |
| `cv-portrait.docx` / `cv-portrait.pdf` | Word / PDF (portrait) |
| `build.js` | Build script — reads `cv-data.json`, outputs `cvweb.html` + `cvweb-portrait.html` |
| `img/` | Tech logos (AWS, Azure, Terraform, Genesys, etc.) |
| `robots.txt` | Disallows all crawlers |

## Usage

### View the site

Hosted on GitHub Pages:  
[https://lvdatri1.github.io/trinhle-cv/](https://lvdatri1.github.io/trinhle-cv/)

### Build CV HTML from data

```bash
node build.js
```

Requires a `cv-data.json` file in the project root (gitignored) with the CV data schema. Outputs `cvweb.html` and `cvweb-portrait.html`.

### Update CV data

1. Edit `cv-data.json`
2. Run `node build.js`
3. (Optional) Generate `.docx` versions from the HTML or maintain the `.docx` files directly

## Deploy

Push to the `main` branch — GitHub Pages serves the site automatically from the repository root.
