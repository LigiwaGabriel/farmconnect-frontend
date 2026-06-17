# FarmConnect Frontend

FarmConnect Frontend is a React application for farmers, buyers, and admins using the FarmConnect backend API. It demonstrates React Router, protected routes, role-based dashboards, Axios services, Bootstrap styling, and JWT storage in `localStorage`.

## Tech Stack

- ReactJS with Vite
- React Router
- Axios
- Bootstrap
- Plain JavaScript, not TypeScript

## Folder Structure

- `src/components/`: Shared UI such as the navbar, product cards, alerts, loading spinner, and route guards.
- `src/context/AuthContext.jsx`: Stores logged-in user state and handles login/logout.
- `src/layouts/`: Public and dashboard page shells.
- `src/pages/public/`: Home, about, browsing, product details, login, and register pages.
- `src/pages/farmer/`: Farmer dashboard, profile, product management, orders, and inquiries.
- `src/pages/buyer/`: Buyer dashboard, profile, order tracking, inquiries, and favorites.
- `src/pages/admin/`: Admin dashboard and management pages.
- `src/services/`: Axios API wrappers grouped by backend feature.
- `src/utils/`: Small formatting helpers.

## Setup

1. Install packages:

```bash
npm install
```

2. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

3. Make sure the backend is running on the URL in `VITE_API_URL`.

4. Start the frontend:

```bash
npm run dev
```

## Environment Variables

- `VITE_API_URL`: Backend API base URL, usually `http://localhost:5000/api`.
- `VITE_UPLOADS_URL`: Backend file server URL, usually `http://localhost:5000`.

## Page and Route Guide

### Public Routes

- `/`: Home page with calls to browse and register.
- `/about`: Project and marketplace overview.
- `/products`: Product browser with search and filters.
- `/products/:id`: Product details with buyer inquiry and order forms.
- `/login`: Login form.
- `/register`: Farmer or buyer registration form.

### Farmer Routes

All farmer routes require login as a farmer.

- `/farmer`: Farmer dashboard statistics.
- `/farmer/profile`: Create or update farm profile.
- `/farmer/products`: View, edit, or remove own products.
- `/farmer/products/new`: Add produce listing with optional image upload.
- `/farmer/products/:id/edit`: Edit own produce listing.
- `/farmer/orders`: Accept or reject buyer orders.
- `/farmer/inquiries`: View and mark buyer inquiries as answered.

### Buyer Routes

All buyer routes require login as a buyer.

- `/buyer`: Buyer dashboard statistics.
- `/buyer/profile`: Create or update buyer profile.
- `/buyer/orders`: Track order status.
- `/buyer/inquiries`: Track sent inquiries.
- `/buyer/favorites`: View locally saved favorite product links.

### Admin Routes

All admin routes require login as an admin.

- `/admin`: System statistics.
- `/admin/users`: Activate or deactivate users.
- `/admin/products`: Review and remove product listings.
- `/admin/orders`: Review and update order status.
- `/admin/categories`: Add or deactivate produce categories.

## Authentication Flow

`AuthContext` calls the backend login endpoint and stores the JWT in `localStorage` as `farmconnect_token`. The Axios interceptor in `src/services/api.js` attaches that token to each API request. `ProtectedRoute` checks whether a user is logged in, while `RoleBasedRoute` checks whether the logged-in user has the required role.

## Default Login Accounts

Use these after loading the backend seed data. All use `password123`.

- Admin: `admin@farmconnect.test`
- Farmer: `farmer1@farmconnect.test`
- Buyer: `buyer1@farmconnect.test`
