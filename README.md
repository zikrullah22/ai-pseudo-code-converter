# Pseudo Converter

Pseudo Converter is a web app that translates pseudo code into real code using the Groq API and the `llama-3.3-70b-versatile` model.

The project includes:
- A Node.js + Express backend API
- A modern single-page frontend in `public/index.html`
- Real-time syntax-highlighted output with Prism.js
- Responsive UI for desktop, tablet, and phone screens

## Features

- Convert pseudo code to:
	- Python
	- Java
	- C++
	- JavaScript
	- Rust
- Copy generated code to clipboard
- Download generated code as a file with correct extension
- Example/template quick insert tools
- API health check endpoint
- Mobile-friendly responsive layout and controls

## Tech Stack

- Backend: Node.js, Express, Groq SDK
- Frontend: HTML, CSS, Vanilla JavaScript
- Syntax Highlighting: Prism.js

## Project Structure

```text
pseudo-converter/
|- public/
|  |- index.html
|- server.js
|- package.json
|- README.md
```

## Prerequisites

- Node.js 18+ (recommended)
- A valid Groq API key

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key_here
PORT=3000
```

`PORT` is optional. Default is `3000`.

## Run

Start production mode:

```bash
npm start
```

Start development mode (with auto-restart):

```bash
npm run dev
```

Open in browser:

```text
http://localhost:3000
```

## API Endpoints

### `POST /api/translate`

Request body:

```json
{
	"pseudo": "if x > 10 then print x",
	"language": "python"
}
```

Success response:

```json
{
	"success": true,
	"code": "if x > 10:\n    print(x)"
}
```

Error response (example):

```json
{
	"success": false,
	"error": "Missing pseudo code or language"
}
```

### `GET /api/health`

Response:

```json
{
	"status": "running",
	"model": "llama-3.3-70b-versatile",
	"timestamp": "2026-03-14T00:00:00.000Z"
}
```

## Notes

- Conversion quality depends on pseudo-code clarity.
- If you see API errors, verify `GROQ_API_KEY` in `.env`.
- If the frontend cannot connect, confirm the server is running on the same port.

## UI Preview

Add screenshots to `docs/screenshots/` and keep these file names:

- `desktop.png`
- `tablet.png`
- `mobile.png`

```md
![Desktop UI](docs/screenshots/desktop.png)
![Tablet UI](docs/screenshots/tablet.png)
![Mobile UI](docs/screenshots/mobile.png)
```

Suggested captions:

- Desktop: Full split-pane workflow with syntax-highlighted output.
- Tablet: Stacked panes with touch-friendly controls.
- Mobile: Compact layout with responsive buttons and scrollable language selector.

## License

This project is licensed under the terms of the `LICENSE` file in this repository.
