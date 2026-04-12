# Rolll Agency - Vanilla HTML/CSS/JavaScript Website

Modern, professional, and responsive website for Rolll Agency, built with pure HTML, CSS, and JavaScript (no frameworks or dependencies).

## 📁 Project Structure

```
rolll-agency-vanilla/
├── index.html          # Main HTML file with all sections
├── styles.css          # Complete styling with responsive design
├── script.js           # JavaScript for interactivity
├── logo.png            # Agency logo
└── README.md           # This file
```

## 🎨 Design Features

### Color Palette
- **Navy**: #0D1B2A (Primary color for headers and text)
- **Orange**: #F79E02 (Accent color for buttons and highlights)
- **Neutral**: #E5E5E5 (Background and section dividers)

### Sections
1. **Navigation Bar** - Sticky header with mobile menu toggle
2. **Hero Section** - Eye-catching banner with call-to-action buttons
3. **About Section** - Company information with three pillars
4. **Mission Section** - Mission, Vision, and Values cards
5. **Services Section** - Four service cards with descriptions
6. **CTA Section** - Call-to-action with orange background
7. **Contact Section** - Contact form and information
8. **Footer** - Links and company information

## ✨ Features

- **Responsive Design** - Works on mobile, tablet, and desktop
- **Smooth Animations** - Fade-in effects and hover transitions
- **Mobile Menu** - Hamburger menu for small screens
- **Contact Form** - Functional form with validation
- **Smooth Scrolling** - Anchor links with smooth scroll behavior
- **Intersection Observer** - Lazy animations on scroll
- **SEO Optimized** - Meta tags and semantic HTML
- **No Dependencies** - Pure vanilla HTML, CSS, and JavaScript

## 🚀 How to Use

1. **Open in Browser**
   - Simply open `index.html` in any modern web browser
   - No build process or server required

2. **Local Development**
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Then visit: http://localhost:8000
   ```

3. **Customize**
   - Edit `index.html` for content changes
   - Modify `styles.css` for styling
   - Update `script.js` for functionality

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Form Handling

The contact form includes:
- Name validation
- Email validation
- Service selection
- Message textarea
- Success/error notifications
- Form reset after submission

**Note**: Currently, the form displays a success message but doesn't send data. To enable email sending, integrate with a backend service like:
- Formspree
- EmailJS
- Your own backend API

## 🔧 Customization

### Change Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --navy: #0D1B2A;
    --orange: #F79E02;
    --neutral: #E5E5E5;
}
```

### Add New Sections
1. Add HTML in `index.html`
2. Style in `styles.css`
3. Add interactivity in `script.js` if needed

### Update Content
- Edit text directly in `index.html`
- Replace logo with your own image
- Update social media links

## 🎬 Animations

The website includes several animations:
- **Fade-in on scroll** - Elements animate when they come into view
- **Hover effects** - Buttons and cards have smooth hover transitions
- **Smooth scroll** - Anchor links scroll smoothly
- **Mobile menu** - Hamburger menu slides in/out

## 📊 Performance

- **No external dependencies** - Faster loading
- **Optimized CSS** - Minimal file size
- **Efficient JavaScript** - No unnecessary calculations
- **Mobile-first design** - Better mobile performance

## 🔐 Security

- No external API calls
- No sensitive data handling
- Form validation on client-side
- Safe for static hosting

## 📄 License

This website template is provided as-is for Rolll Agency.

## 📞 Support

For questions or modifications, contact Rolll Agency.

---

**Version**: 1.0  
**Last Updated**: April 2026  
**Built with**: HTML5, CSS3, Vanilla JavaScript
