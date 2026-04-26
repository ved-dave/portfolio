# veddave.com — Portfolio Source

Source code for my personal portfolio at [veddave.com](https://veddave.com).

## Project Structure

```
portfolio/
├── website/                  # Next.js frontend
│   ├── public/
│   │   ├── Icons/            # SVG icons used on the About page
│   │   ├── logos/            # Company logos for the Experience timeline
│   │   ├── profile.jpg       # Sidebar profile photo
│   │   └── Ved_resume.pdf    # Resume (downloadable from nav)
│   └── src/
│       ├── app/
│       │   ├── about/        # About page
│       │   ├── experience/   # Work experience timeline
│       │   ├── gallery/      # Photo gallery (loads from Firebase)
│       │   ├── photography/  # Photography intro page
│       │   └── projects/     # Projects page
│       ├── components/
│       │   ├── icons/        # Inline SVG icon components
│       │   ├── ExperienceCard.tsx
│       │   ├── ExperienceTimeline.tsx
│       │   ├── Navigation.tsx
│       │   ├── PageLayout.tsx
│       │   ├── ProjectCard.tsx
│       │   └── Sidebar.tsx
│       └── lib/
│           ├── firebase.ts   # Firebase client config
│           └── utils.ts
└── firebase/                 # Firebase Cloud Functions
    └── functions/
        └── src/index.ts      # Storage trigger functions
```

## Stack

### Frontend (`website/`)
| | |
|---|---|
| Framework | [Next.js 15](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | [Tailwind CSS](https://tailwindcss.com) |
| Icons | [Lucide React](https://lucide.dev) |
| Hosting | [Vercel](https://vercel.com) |

### Backend (`firebase/`)
| | |
|---|---|
| Platform | [Firebase](https://firebase.google.com) |
| Storage | Firebase Cloud Storage |
| Functions | Firebase Cloud Functions v2 (Node 24, TypeScript) |

## Photo Gallery — Firebase-Powered, Zero Deploys

The gallery at `/gallery` loads photos entirely from Firebase Cloud Storage. Updating the gallery requires no code changes or redeployments — just upload or delete photos in the Firebase Console.

### How it works

**Upload flow:**
1. Upload a photo to `Gallery/` in Firebase Storage
2. A Cloud Function (`storeImageDimensions`) fires automatically on upload — it reads the image dimensions and stores them as custom metadata on the file
3. The gallery page fetches all files from `Gallery/`, reads the stored dimensions for correct aspect ratios, and loads thumbnails from `Gallery/thumbnails/`

**Thumbnail generation:**
Thumbnails are pre-generated and stored in `Gallery/thumbnails/` using the naming convention `<filename>_400x400.<ext>`. These are served as the lazy-loaded grid images; the full-size original is only fetched when a photo is opened in the lightbox.

**Delete flow:**
1. Delete a photo from `Gallery/` in the Firebase Console
2. A second Cloud Function (`deleteThumbnailOnPhotoDelete`) fires automatically and deletes the corresponding thumbnail from `Gallery/thumbnails/`

### To update the gallery
- **Add photos:** Upload images to `Gallery/` in the Firebase Console, then add the corresponding `_400x400` thumbnail to `Gallery/thumbnails/`
- **Remove photos:** Delete the original from `Gallery/` — the thumbnail is cleaned up automatically

## Claude Skills

This project includes a Claude Code skill for keeping the site in sync with the resume.

### `/update-experience`

Located at `.claude/commands/update-experience.md`.

Run this skill after updating `public/Ved_resume.pdf` to automatically sync the work experience timeline at `/experience`:

```
/update-experience
```

The skill reads the PDF, diffs the content against the current `experience/page.tsx`, and updates the `workExperience` data array — preserving any existing company logos and styling.

A similar manual process applies to the `/projects` page if new projects are added to the resume.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ved-dave/portfolio.git
cd portfolio
```

### 2. Set up Firebase

1. Go to the [Firebase Console](https://console.firebase.google.com) and create a new project
2. Enable **Cloud Storage** — create a default storage bucket
3. Enable **Cloud Functions** (requires the Blaze pay-as-you-go plan)

In the Firebase Console under **Storage > Rules**, allow public reads on the `Gallery/` folder:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /Gallery/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Manually create the following folders in your storage bucket:

```
Gallery/
Gallery/thumbnails/
```

### 3. Configure environment variables

In the Firebase Console, go to **Project Settings > General > Your apps** and register a Web app. Copy the config values into a `.env.local` file in `website/`:

```bash
# website/.env.local
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

If deploying to Netlify, add these same variables under **Site Settings > Environment Variables**.

Update `firebase/.firebaserc` with your project ID:

```json
{
  "projects": {
    "default": "your-firebase-project-id"
  }
}
```

### 4. Deploy Cloud Functions

```bash
cd firebase
npm install
firebase deploy --only functions
```

### 5. Run the development server

```bash
cd website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
