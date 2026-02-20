# Portfolio Debugging Guide

## Logs Location

```
C:\Users\ASUS\Desktop\Programming\Portfolio\logs\app-{YYYY-MM-DD}.log
```

Currently, logging is not yet implemented. When implemented, logs will be written in JSONL format.

## Enable Debug Mode

### Browser Developer Tools

```javascript
// Open browser console (F12)
// Check for JavaScript errors in Console tab
// Inspect elements in Elements/Inspector tab
// Monitor network requests in Network tab
```

### Verbose Logging (when implemented)

```javascript
// Add to script.js
const DEBUG = true;

if (DEBUG) {
  console.log('Debug info here');
}
```

## Common Issues

### Issue 1: Navigation Not Working

**Symptoms:**
- Clicking navigation links does nothing
- Tabs don't switch
- Console shows errors

**Root Cause:**
- JavaScript file not loaded
- Event listeners not attached
- ID mismatch between links and tabs

**Solution:**
```bash
# 1. Check browser console for errors
# 2. Verify script.js is loaded
# 3. Check that IDs match in index.html

# Common fix: Ensure script.js is at bottom of body tag
<script src="script.js"></script>
</body>
```

**Prevention:**
- Always check browser console
- Use semantic HTML IDs
- Test after changes

---

### Issue 2: Styles Not Applying

**Symptoms:**
- Page looks unstyled
- CSS not loading
- Formatting is broken

**Root Cause:**
- CSS file path incorrect
- Syntax error in CSS
- Browser cache issue

**Solution:**
```bash
# 1. Check browser console for 404 errors
# 2. Verify style.css path in index.html
# 3. Clear browser cache (Ctrl+F5)

# Verify CSS is linked correctly:
<link rel="stylesheet" href="style.css">
```

**Prevention:**
- Use relative paths
- Validate CSS syntax
- Hard refresh to bypass cache

---

### Issue 3: Images Not Loading

**Symptoms:**
- Broken image icons
- 404 errors in console
- Missing profile photo or project images

**Root Cause:**
- Incorrect image path
- File name case mismatch (Windows vs Linux)
- Image file missing

**Solution:**
```bash
# 1. Check image path in HTML
<img src="photo.jpeg" alt="Profile">
<img src="img/project.png" alt="Project">

# 2. Verify file exists
dir photo.jpeg
dir img\

# 3. Check file name matches exactly (case-sensitive on some systems)
```

**Prevention:**
- Use consistent naming (lowercase)
- Keep images organized in /img folder
- Test on different operating systems

---

### Issue 4: Server Won't Start

**Symptoms:**
- `python start-server.py` fails
- Port already in use error
- Connection refused

**Root Cause:**
- Port 8000 already in use
- Python not installed
- Wrong Python version

**Solution:**
```bash
# Check if port is in use
netstat -ano | findstr :8000

# Kill process using port 8000 (Windows)
taskkill /PID [PID_NUMBER] /F

# Or use different port in start-server.py
# Change port number from 8000 to 8080

# Verify Python is installed
python --version
```

**Prevention:**
- Close previous server instances
- Document required Python version
- Use different port if needed

---

### Issue 5: Responsive Design Broken

**Symptoms:**
- Mobile view looks wrong
- Elements overlap
- Text too small/large on mobile

**Root Cause:**
- Missing viewport meta tag
- Incorrect media queries
- Fixed width elements

**Solution:**
```html
<!-- Ensure viewport meta tag exists in <head> -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

```css
/* Use relative units instead of fixed */
/* Bad */
width: 500px;

/* Good */
width: 100%;
max-width: 500px;
```

**Prevention:**
- Always include viewport meta tag
- Test on multiple screen sizes
- Use browser DevTools device mode

---

### Issue 6: Tab Content Shows Wrong Section

**Symptoms:**
- Clicking Home shows About
- Multiple tabs visible at once
- Tab switching is inconsistent

**Root Cause:**
- ID mismatch in JavaScript
- CSS display properties conflict
- Multiple elements with same ID

**Solution:**
```javascript
// Check script.js for correct IDs
// Ensure navigation links data-tab matches section IDs

// Example correct structure:
<a href="#" data-tab="home">Home</a>
<div id="home" class="tab-content">...</div>
```

**Prevention:**
- Use unique IDs for each tab
- Follow consistent naming convention
- Test all navigation links

---

## Error Codes

Currently no formal error codes. When logging is implemented, error codes will be documented here.

| Code | Meaning | Solution |
|------|---------|----------|
| TBD  | To be determined | When logging is implemented |

## Debug Checklist

Before reporting a bug:
- [ ] Checked browser console for errors
- [ ] Cleared browser cache (Ctrl+F5)
- [ ] Verified all file paths are correct
- [ ] Tested in different browser
- [ ] Checked that server is running
- [ ] Reviewed recent changes to code
- [ ] Created minimal reproducible example

## Useful Debug Commands

### Browser Console

```javascript
// Check if script.js is loaded
console.log('Script loaded');

// Inspect element
console.dir(document.getElementById('home'));

// Check all tabs
document.querySelectorAll('.tab-content').forEach(tab => {
  console.log(tab.id, window.getComputedStyle(tab).display);
});
```

### Python Server

```bash
# Start server with verbose output
python -m http.server 8000

# Check what port is being used
netstat -ano | findstr :8000

# Test if server is responding
curl http://localhost:8000
# or in PowerShell
Invoke-WebRequest http://localhost:8000
```

### File Structure Verification

```bash
# List all files
dir /s /b

# Verify critical files exist
if exist index.html echo index.html exists
if exist style.css echo style.css exists
if exist script.js echo script.js exists
if exist photo.jpeg echo photo.jpeg exists
```

## Browser Compatibility

### Supported Browsers

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Known Issues

- ❌ Internet Explorer 11 - Not supported (uses modern ES6+)
- ⚠️ Safari < 14 - Some CSS animations may not work
- ⚠️ Mobile browsers - Test touch events

### Testing in Different Browsers

```bash
# Use browser developer tools
F12 - Open DevTools
Ctrl+Shift+I - Open DevTools (alternative)
Ctrl+Shift+M - Toggle device mode (mobile view)
Ctrl+F5 - Hard refresh (bypass cache)
```

## Performance Debugging

### Slow Page Load

**Symptoms:**
- Page takes long to load
- Images load slowly
- Animations are janky

**Solution:**
```bash
# 1. Check Network tab in DevTools
# 2. Optimize images (compress, resize)
# 3. Minify CSS/JS

# Use browser Lighthouse audit
# DevTools → Lighthouse → Generate Report
```

### Animation Performance

```javascript
// Check FPS in browser DevTools
// Open Performance tab, record, analyze

// Use CSS transform instead of position
/* Bad */
.element { left: 100px; }

/* Good */
.element { transform: translateX(100px); }
```

## Getting Help

If you can't resolve the issue:

1. **Check documentation**
   - [README.md](README.md) - Basic usage
   - [ARCHITECTURE.md](ARCHITECTURE.md) - How it works

2. **Review logs** (when implemented)
   - Check `logs/app-{YYYY-MM-DD}.log`
   - Search for error messages

3. **Search for similar issues**
   - Check browser console error messages
   - Google the specific error

4. **Create a bug report**
   - Include browser version
   - Steps to reproduce
   - Screenshots if applicable
   - Console error messages

---

**Remember:** Most issues can be solved by checking the browser console and verifying file paths. When in doubt, hard refresh (Ctrl+F5) to bypass cache.
