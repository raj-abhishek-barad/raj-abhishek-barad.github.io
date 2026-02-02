# Abhishek Barad — Academic one‑page (Jekyll / GitHub Pages)

This repo is a lightweight Jekyll site designed to reproduce the *pattern* of https://zmanaa.github.io/:
- single-page layout with anchored nav (About / News / Publications / Teaching / Gallery / Vitae)
- publications + teaching rendered from `_data/*.yml`
- simple image carousel for the Gallery
- works on GitHub Pages without any build tooling

## Quick deploy
1) Copy everything in this folder into your GitHub Pages repo: `raj-abhishek-barad/raj-abhishek-barad.github.io`
2) Commit & push to the branch GitHub Pages uses (usually `main`).
3) In GitHub: Settings → Pages → Deploy from branch → `main` / `(root)`.

## Customize
Edit only these files:
- `_config.yml`  (site title/url)
- `_data/profile.yml` (name, affiliation, emails, links)
- `_data/news.yml`
- `_data/publications.yml`
- `_data/teaching.yml`
- `_data/vitae.yml`
- `_data/gallery.yml`
- replace images in `assets/img/` (keep filenames or update YAML entries)

## Local preview (optional)
If you have Ruby/Jekyll installed:
  bundle exec jekyll serve

Otherwise, just push to GitHub Pages and let it build.
