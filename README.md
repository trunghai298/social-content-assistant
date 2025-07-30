# Social Content Assistant

A retro-themed AI-powered social media content generator for TikTok, Instagram Reels, Facebook Reels, and Shopee Video.

## Features

- 🎯 Platform-specific content optimization
- 🤖 AI-powered caption generation using Google Gemini
- 📏 Adjustable caption length (short, medium, long)
- 🌐 Multi-language support (English, Vietnamese)
- 🎵 Trending sound suggestions
- #️⃣ Relevant hashtag recommendations
- 📱 Real-time preview panels
- 💾 Content history tracking
- 🕹️ Retro VHS aesthetic UI

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone [your-repo-url]
cd social-content-assistant

# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local
# Add your GEMINI_API_KEY to .env.local

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Usage

1. **Select a Platform**: Choose your target platform (TikTok, Instagram, Facebook, or Shopee)
2. **Describe Your Video**: Enter details about your video content, vibe, or products
3. **Generate Content**: Click "Generate" to receive AI-powered suggestions
4. **Copy & Use**: Click on any caption, hashtag, or sound to copy it

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better DX
- **Tailwind CSS** - Utility-first styling
- **Google Gemini AI** - AI content generation
- **Fly.io** - Deployment platform

## Project Structure

```
social-content-assistant/
├── app/
│   ├── components/         # React components
│   │   ├── PlatformSelector.tsx
│   │   ├── PromptInput.tsx
│   │   ├── ContentOutput.tsx
│   │   └── ContentHistory.tsx
│   ├── lib/               # Business logic
│   │   ├── contentGenerator.ts
│   │   └── mockData.ts
│   ├── types/             # TypeScript types
│   │   └── index.ts
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles
├── public/                # Static assets
└── package.json          # Dependencies
```

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Type check
npx tsc --noEmit

# Lint
npm run lint
```

## Deployment to Fly.io

### Prerequisites
- [Fly CLI](https://fly.io/docs/hands-on/install-flyctl/) installed
- Fly.io account

### Deploy Steps

1. Authenticate with Fly:
   ```bash
   fly auth login
   ```

2. Deploy the app:
   ```bash
   fly deploy
   ```

3. Open your deployed app:
   ```bash
   fly open
   ```

### Update Secrets

To update the Gemini API key:
```bash
fly secrets set GEMINI_API_KEY=your_new_api_key
```

### Monitor Your App

- View logs: `fly logs`
- Check app status: `fly status`
- Scale your app: `fly scale vm shared-cpu-2x --memory 2048`

## Environment Variables

- `GEMINI_API_KEY`: Your Google Gemini API key (required)

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT