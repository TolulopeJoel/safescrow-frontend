
# 🧠 Instructions for Building Escrow App Frontend (Design-Driven)

## 📦 Project Context
You are building the frontend for a **web-based escrow app**. This app enables users to safely send money to others, which will be held in escrow until certain conditions are met.

The **designs will be provided as screenshots**, so you are not required to invent UI layouts or visual styles — just implement exactly what you see in the screenshots using React and Tailwind CSS.

---

## 🔧 Stack to Use
- **React** (with function components and hooks)
- **Tailwind CSS** for styling (no inline styles unless necessary)
- **React Router v6+** for routing
- **Axios** or **Fetch API** for HTTP calls
- **Optional but preferred**: Use `shadcn/ui` or `Radix UI` if any complex components (modals, dropdowns) appear in the design

---

## 🖼️ Design Implementation Notes
- You will receive **screenshots** of the UI. These are the **single source of truth** for layout, spacing, typography, icons, and component hierarchy.
- Your job is to **recreate each screen accurately**, using semantic HTML and Tailwind CSS classes.
- Ensure the components are:
  - **Responsive**
  - **Reusable** (use `/components` folder)
  - **Cleanly organized** in a sensible folder structure

---

## 📄 Pages to Implement (Based on Designs)
(You’ll be shown screenshots of each — don't guess layout or content)

1. **Landing Page**
2. **Login Page**
3. **Register Page**
4. **Dashboard**
5. **Create Escrow Page**
6. **Escrow Detail Page**
7. **User Profile or Settings (if included in designs)**

Only build components and pages shown in the design screenshots.

---

## 🧭 Routing
Use `react-router-dom` to set up the following (only if shown in design):

```
"/" → LandingPage  
"/login" → LoginPage  
"/register" → RegisterPage  
"/dashboard" → DashboardPage  
"/escrow/new" → CreateEscrowPage  
"/escrow/:id" → EscrowDetailPage
```

Use `Outlet` and `Layout` components if there's a shared layout across pages.

---

## 🔐 Authentication Handling
- Store auth token in `localStorage`
- Redirect to `/login` if unauthenticated user tries to access protected pages
- After login, redirect to `/dashboard`

---

## 🔌 API Integration
Implement all API calls based on the backend structure (which may be FastAPI or Go). Use placeholder URLs like:

```ts
axios.post("/api/login", credentials)
axios.get("/api/escrow")
```

Functions should be placed in a `/services/api.js` file or similar.


---

## ✅ Expectations
- Pixel-accurate implementation of provided screenshots
- Fully responsive layouts
- Clean, DRY code using Tailwind classes
- API integration logic in place (use mock data if backend isn’t ready)
- Simple form validation and loading/error states
