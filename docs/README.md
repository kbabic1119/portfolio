# Portfolio Website

A modern, single-page developer portfolio website showcasing projects and skills.

## Quick Start

1. Navigate to the Portfolio directory
2. Start the development server
3. Open in browser

```bash
cd C:\Users\ASUS\Desktop\Programming\Portfolio
python start-server.py
```

Then open your browser to: `http://localhost:8000`

## Features

- **Single-Page Application** - Tab-based navigation without page reloads
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Smooth Animations** - CSS transitions for professional feel
- **Project Showcase** - Dedicated portfolio section
- **Contact CTA** - "Work with me" call-to-action button
- **Tech Stack Display** - Floating tech icons showing skills

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations
- **JavaScript (Vanilla)** - No framework dependencies
- **Python SimpleHTTPServer** - Local development server

## Project Structure

```
Portfolio/
├── docs/               # Documentation
│   ├── README.md       # This file
│   ├── ARCHITECTURE.md # System design
│   └── DEBUGGING.md    # Troubleshooting
├── logs/               # Application logs
├── img/                # Images and assets
├── projects/           # Portfolio project showcases
├── index.html          # Main HTML file
├── style.css           # Styling and animations
├── script.js           # Navigation and interactions
├── photo.jpeg          # Profile photo
└── start-server.py     # Development server
```

## Usage

### Development

```bash
# Start the server
python start-server.py

# Server runs on http://localhost:8000
# Edit files and refresh browser to see changes
```

### Navigation

The site uses tab-based navigation:
- **Home** - Introduction and hero section
- **Portfolio** - Project showcases
- **About** - About the developer
- **Contact** - Work with me CTA

### Adding Projects

Projects are stored in the `/projects` directory. Each project can have its own subdirectory with assets.

## Documentation

- [Architecture](ARCHITECTURE.md) - System design and structure
- [Debugging](DEBUGGING.md) - Troubleshooting guide

## Author

**Kazim** - Full Stack Developer

## Version

**1.0.0** - Initial release (2026-02-12)
