# Portfolio Architecture

**Last Updated:** 2026-02-12
**Version:** 1.0.0

## System Overview

This is a client-side single-page application (SPA) built with vanilla JavaScript, HTML, and CSS. No build process or frameworks are required.

```
┌─────────────────┐
│   index.html    │  Main page structure
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐  ┌─▼────────┐
│style  │  │ script.js│  Navigation logic
│.css   │  └──────────┘
└───────┘
```

## Components

### 1. Navigation System

**Purpose:** Handle tab-based navigation without page reloads

**Location:** `script.js`

**Key Functions:**
- Tab switching logic
- Active state management
- Smooth transitions between sections

**Data Flow:**
```
User Click → Event Listener → Hide Current Tab → Show Target Tab → Update Active State
```

### 2. Styling & Animations

**Purpose:** Responsive design and visual effects

**Location:** `style.css`

**Features:**
- Responsive breakpoints for mobile/tablet/desktop
- CSS animations for smooth transitions
- Flexbox/Grid layouts
- Floating tech icons animation

### 3. Content Structure

**Purpose:** Semantic HTML structure

**Location:** `index.html`

**Sections:**
- Header with navigation
- Sidebar with profile
- Main content area with tabs:
  - Home page
  - Portfolio section
  - About section
- Contact CTA

### 4. Development Server

**Purpose:** Local development environment

**Location:** `start-server.py`

**Features:**
- Simple HTTP server on port 8000
- Serves static files
- Hot reload via browser refresh

## Integration Points

### HTML ↔ JavaScript

- JavaScript targets HTML elements by ID
- Event listeners attached to navigation elements
- DOM manipulation for tab switching

### HTML ↔ CSS

- CSS classes applied to HTML elements
- Responsive classes for different screen sizes
- Animation classes triggered by JavaScript

### Assets

- Images stored in `/img` directory
- Projects stored in `/projects` directory
- Profile photo at root level

## Design Decisions

### Why Vanilla JavaScript?

**Rationale:**
- Portfolio is a simple single-page site
- No need for React/Vue overhead
- Faster load times
- Easier to maintain

**Alternatives Considered:**
- React - Too heavy for this use case
- Vue - Overkill for simple navigation
- jQuery - Unnecessary in modern browsers

**Trade-offs:**
- ✅ Faster load times
- ✅ No build process
- ✅ Less code complexity
- ❌ Manual DOM manipulation
- ❌ No component reusability

### Why Python SimpleHTTPServer?

**Rationale:**
- Quick local development
- No configuration needed
- Cross-platform

**Alternatives Considered:**
- Node.js http-server - Requires npm
- Live Server (VS Code) - IDE dependent

**Trade-offs:**
- ✅ Simple and fast
- ✅ No dependencies
- ❌ Development only (not for production)
- ❌ No hot reload features

### Why Single-Page Application?

**Rationale:**
- Smooth navigation without page reloads
- Better user experience
- Portfolio sites benefit from continuity

**Trade-offs:**
- ✅ Smooth transitions
- ✅ No page refresh flicker
- ❌ Initial load includes all content
- ❌ SEO considerations (mitigated by semantic HTML)

## File Organization

```
Portfolio/
├── index.html      # Main entry point, all HTML structure
├── style.css       # All styles and animations
├── script.js       # All JavaScript logic
├── photo.jpeg      # Profile photo
├── img/            # Additional images and assets
│   └── *.png/jpg   # Project images, icons
├── projects/       # Portfolio project showcases
│   └── solceller-sverige/  # Example project
├── logs/           # Application logs (if logging added)
├── docs/           # Documentation
│   ├── README.md
│   ├── ARCHITECTURE.md (this file)
│   └── DEBUGGING.md
└── start-server.py # Development server script
```

### Code Organization

**index.html:**
- Semantic HTML5 structure
- All content in one file
- Tab sections with unique IDs

**style.css:**
- Mobile-first approach
- Organized by component
- Media queries at bottom

**script.js:**
- Event listeners
- Tab switching functions
- Utility functions

## Data Flow

### Tab Navigation Flow

```
1. User clicks navigation link
2. JavaScript event listener fires
3. Get target tab ID from link
4. Hide currently active tab
5. Show target tab
6. Update navigation active state
7. Update browser history (optional)
```

### Page Load Flow

```
1. Browser requests index.html
2. HTML loads and parses
3. CSS loads and applies styles
4. JavaScript loads and executes
5. Event listeners attached
6. Default tab shown (Home)
7. User interaction enabled
```

## Future Considerations

### Potential Enhancements

1. **Logging System**
   - Add structured logging for user interactions
   - Track navigation patterns
   - Debug user issues

2. **Animation Improvements**
   - Add page transition animations
   - Parallax effects for visual interest
   - Micro-interactions on hover

3. **Content Management**
   - Consider JSON file for project data
   - Dynamic project loading
   - Admin panel for updates

4. **Performance Optimization**
   - Lazy load images
   - Minimize CSS/JS
   - Add service worker for offline support

5. **Analytics**
   - Add Google Analytics or similar
   - Track user engagement
   - A/B test CTA buttons

### Migration Path (if needed)

If the site grows significantly:

1. Consider static site generator (Hugo, Jekyll)
2. Or migrate to React/Next.js for better scaling
3. Add proper backend for dynamic content
4. Implement CMS for content management

## Technical Constraints

- **Browser Support:** Modern browsers (Chrome, Firefox, Safari, Edge)
- **No IE11 Support:** Uses modern ES6+ features
- **Responsive Breakpoints:**
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## Security Considerations

- Static site - minimal security concerns
- No user input - no XSS risk
- No backend - no server-side vulnerabilities
- Served via HTTPS in production (recommended)

---

**Note:** This architecture is intentionally simple. The portfolio site doesn't need complex patterns or frameworks. Simplicity is a feature, not a limitation.
