# AI Triage Service - Product Overview

Interactive product documentation for the AI Behavioral Risk Engine.

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Run locally
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173)

### 3. Deploy to Vercel (for shareable URLs)

**Option A: Via Vercel CLI**
```bash
npm install -g vercel
vercel
```

**Option B: Via GitHub**
1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project" → Select your repo
4. Vercel auto-detects Vite and deploys

You'll get a URL like: `https://ai-triage-overview.vercel.app`

---

## 📁 Project Structure

```
ai-triage-product-overview/
├── src/
│   ├── components/
│   │   ├── UserJourneyMaps.jsx    # Patient & clinician journey flows
│   │   └── SystemArchitecture.jsx # Data flow architecture diagram
│   ├── App.jsx                    # Main app with navigation
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Tailwind styles
├── public/
│   └── favicon.svg
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🛠 Adding New Views

1. Create a new component in `src/components/`
2. Import it in `App.jsx`
3. Add to the `views` array:

```jsx
const views = [
  { id: 'journey', label: 'User Journeys', icon: Map, component: UserJourneyMaps },
  { id: 'architecture', label: 'System Architecture', icon: GitBranch, component: SystemArchitecture },
  { id: 'your-new-view', label: 'New View', icon: SomeIcon, component: YourComponent }, // Add here
];
```

## 🎨 Customization

- **Colors**: Edit Tailwind classes (teal-600 is the primary brand color)
- **Content**: Edit the data objects in each component
- **Navigation**: Modify the `views` array in `App.jsx`

## 📤 Sharing with Stakeholders

Once deployed to Vercel:
- Share the URL directly
- Each push to `main` auto-deploys
- Use Vercel's password protection for confidential access (Pro plan)

---

*Confidential - For Internal Use Only*
