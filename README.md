# Polaris Global Education Center

Production website and installable PWA for [polarisoverseasedu.com](https://polarisoverseasedu.com).

## Stack

- Node.js 22+
- React 19 and TypeScript
- Vinext/Vite
- Cloudflare-compatible runtime used by ChatGPT Sites

## Open in VS Code

On Windows, use Git Bash or WSL in the VS Code terminal because the project build scripts use Bash.

```bash
git clone https://github.com/Umaircv/polaris-overseas-education.git
cd polaris-overseas-education
npm ci
npm run dev
```

Open the local URL shown in the terminal.

## Before pushing changes

```bash
npm run build
git status
```

## Recommended workflow

Keep `main` production-ready. Create a separate branch for each change:

```bash
git switch -c feature/short-change-name
git add .
git commit -m "Describe the change"
git push -u origin feature/short-change-name
```

Review the change in GitHub and merge it into `main` when ready.

## Publishing

The domain is registered and managed in Hostinger, while the current website is hosted by ChatGPT Sites. A GitHub push does not automatically update the live website yet.

After merging a change into `main`, request deployment of the latest `main` version to publish it at [polarisoverseasedu.com](https://polarisoverseasedu.com).

## Main routes

- `/` — Home
- `/course-finder` — Five-country course finder
- `/italy-course-finder` — Italy programme portal
- `/scholarships` — Scholarship finder
- `/book-ielts-demo` — IELTS demo booking
- `/destinations` — Destinations
- `/blogs` — Blogs
- `/our-office` — Office and contact details

## Data notes

The Italy catalogue is stored as compressed JSON parts in `public/data/`. Scholarship and programme information should always be checked against the linked official sources before publishing deadline-sensitive updates.

Do not commit `.env` files, API keys, passwords, tokens, or private credentials.
