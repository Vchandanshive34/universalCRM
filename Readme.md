# Pulse — Studio CRM

A modern, responsive web-based CRM (Customer Relationship Management) system designed for fitness studios and gyms. Built with vanilla JavaScript, HTML, and CSS.

## ✨ Features

- **Dashboard** — Overview of key metrics, member activity, and pipeline status
- **Member Management** — Add, view, and track member information and membership status
- **Sales Pipeline** — Manage leads through different stages (New, Warm, Hot)
- **Session Scheduling** — Create and manage class schedules
- **Billing** — Track monthly revenue, outstanding payments, and membership renewals
- **Reports & Insights** — Revenue and retention analytics
- **Role-based Access** — Owner and staff account types with different permissions
- **Responsive Design** — Works beautifully on desktop, tablet, and mobile devices

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No backend required for demo — runs entirely in the browser

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pulse-studio-crm.git
cd pulse-studio-crm
```

2. Open `index.html` in your web browser, or serve with a local web server:
```bash
# Python 3
python -m http.server 8000

# Node.js (using http-server)
npx http-server

# Live Server in VS Code
# Install the Live Server extension and right-click index.html → Open with Live Server
```

3. Log in with demo credentials:
   - **Owner Account**: username `owner` / password `owner123`
   - **Staff Account**: username `staff` / password `staff123`

## 📁 Project Structure

```
pulse-studio-crm/
├── index.html           # Main HTML file
├── css/
│   └── styles.css       # All styling and responsive design
├── js/
│   ├── data.js          # Application data structures
│   ├── auth.js          # Authentication and login logic
│   ├── modal.js         # Modal dialog management
│   ├── forms.js         # Form handling and data submission
│   ├── render.js        # UI rendering functions
│   └── app.js           # Main application logic and navigation
├── README.md            # This file
├── .gitignore           # Git ignore file
└── package.json         # Project metadata (optional)
```

## 🔐 Authentication

### Demo Accounts

| Role  | Username | Password     | Access Level |
|-------|----------|--------------|--------------|
| Owner | owner    | owner123     | Full access including login management |
| Staff | staff    | staff123     | Studio operations and basic CRM access |

### Important Security Notes

⚠️ **This is a demo application with credentials stored in `js/data.js`.**

For production use:
- Implement proper server-side authentication
- Use secure password hashing (bcrypt, Argon2)
- Implement JWT or session-based authentication
- Use HTTPS only
- Store credentials securely on the backend
- Implement role-based access control (RBAC) on the server

## 🎨 Design System

The application uses a custom color palette and typography system:

### Colors
- **Ink** (#16231f) — Primary text and UI elements
- **Sidebar** (#0f2e2b) — Navigation background
- **Canvas** (#f4f5f0) — Page background
- **Coral** (#ff6a3d) — Primary accent/CTA buttons
- **White** (#fff) — Card backgrounds

### Typography
- **Display** — Space Grotesk (headers)
- **Body** — Inter (main text)
- **Mono** — JetBrains Mono (data)

## 🛠️ Development

### Adding Features

1. **New Data**: Add to the appropriate data structure in `js/data.js`
2. **Form Handling**: Add submission logic in `js/forms.js`
3. **UI Rendering**: Add render functions in `js/render.js`
4. **Authentication**: Modify `js/auth.js` for custom roles
5. **Styling**: Update `css/styles.css` with new component styles

### Creating a New Section

Example: Adding a new "Expenses" page:

1. Add a new `<section class="tab-page" id="expenses">` to `index.html`
2. Add navigation button: `<button data-view="expenses"><span class="ico">💰</span><span>Expenses</span></button>`
3. Add data structure in `js/data.js`
4. Add render function in `js/render.js`
5. The navigation handler in `js/app.js` will automatically wire it up

### Mobile-First Responsive Design

The project uses CSS media queries for responsive design:
- **Desktop**: Full layout (> 900px)
- **Tablet**: Collapsed sidebar (≤ 900px)
- **Mobile**: Bottom navigation, full-width content (≤ 570px)

## 📊 Data Management

Currently, all data is stored in browser memory (`js/data.js`):
- Data persists only during the current session
- Refreshing the page resets all changes
- Perfect for demo and prototyping

### To Add Persistent Storage

Replace in-memory storage with one of:
- **LocalStorage API** — Simple key-value storage (browser)
- **IndexedDB** — More robust offline storage (browser)
- **Backend API** — RESTful API with database (recommended for production)

Example with localStorage:
```javascript
// Save data
localStorage.setItem('members', JSON.stringify(members));

// Load data
members = JSON.parse(localStorage.getItem('members')) || [];
```

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit (`git commit -m 'Add amazing feature'`)
5. Push to branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License — see LICENSE file for details.

## 🐛 Known Limitations

- No data persistence (refreshing page resets data)
- No real backend integration
- Credentials stored in client-side code (demo only)
- No multi-user support
- Limited reporting capabilities

## 🚧 Roadmap

- [ ] Backend API integration
- [ ] Real-time notifications
- [ ] Member check-in system
- [ ] Payment integration
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Custom reporting
- [ ] Team collaboration features

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing documentation
- Review the code comments

## 🙏 Acknowledgments

Built as a demonstration of modern web development practices with vanilla JavaScript, focusing on clean code, responsive design, and user experience.

---

**Created for:** Loop Studio, Vashi  
**Last Updated:** August 2026
