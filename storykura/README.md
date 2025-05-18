# Storykura

> Turn Text into Talk – Effortlessly with Storykura.

Storykura is a modern web application built with Next.js and React that transforms text content into engaging spoken audio.

## Features

- Text-to-Speech conversion with natural sounding voices
- Frontend built with Next.js and React
- Responsive design that works on all devices
- API key management via environment variables

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/storykura.git
cd storykura
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
```bash
cp .env.example .env
# Then edit .env with your API keys
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

The project uses the following environment variables that should be set in the `.env` file:

- `API_KEY`: Your API key for text-to-speech services
- `NODE_ENV`: Development environment setting
- `PORT`: Port for the development server

## Project Structure

```
storykura/
├── app/                  # Next.js App Router
├── public/               # Static assets
├── .env                  # Environment variables (not tracked in git)
├── .env.example          # Example environment variables
└── README.md             # Project documentation
```

## Technology Stack

- **Frontend**: Next.js, React, TailwindCSS
- **Deployment**: Vercel (recommended)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js team for the amazing framework
- All contributors to this project
