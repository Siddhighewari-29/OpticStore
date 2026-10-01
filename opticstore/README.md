# OpticStore — Online Eyewear E-Commerce Platform

A modern, fully responsive e-commerce front-end for an eyewear brand, built with React,
React Router and the Context API. Created as a portfolio-quality project demonstrating
component architecture, client-side state management, form validation, and a persistent
cart/wishlist/auth experience via `localStorage`.

## Tech Stack

- React 18 + Vite
- React Router v6
- Context API (auth, cart, wishlist, products, search)
- Axios (REST-ready service layer — see `src/services/api.js`)
- Plain modern CSS (design tokens in `src/index.css`)
- LocalStorage persistence for auth / cart / wishlist

## Getting Started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (default `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Demo Login

This project ships with a mock authentication flow (no real backend). On the login
screen, enter **any** email/username and a password of **4 or more characters** to sign in.

## Project Structure

```
src/
 ├── components/       Reusable UI: Navbar, Footer, ProductCard, ProductList, route guards
 ├── pages/             Route-level views: Home, Login, ProductDetails, Cart, Wishlist,
 │                       Checkout, OrderSuccess, About, Contact, CategoryPage, SearchResults
 ├── data/              Mock product catalog (24 products across 4 categories)
 ├── context/           AppContext.jsx — global state via Context API
 ├── services/          Axios-ready API layer (mock-backed, swap-in-ready for a real API)
 ├── App.jsx            Route definitions
 ├── main.jsx           App entry point
 └── index.css          Design tokens + global styles
```

## Key Features

- **Auth**: login/logout with `localStorage`-persisted session and protected routes
- **Product catalog**: 24 realistic products across Men's, Women's, Kids and Sunglasses
- **Search & filters**: search by name/category/brand; filter by category; sort by price/rating
- **Product details**: color selection, quantity stepper, wishlist toggle, related products
- **Cart**: quantity control, subtotal/delivery/total calculation, persists across reloads
- **Wishlist**: persists across reloads, add-to-cart directly from wishlist
- **Checkout**: full form validation, payment method selection (COD / UPI / Card), generates an Order ID
- **Responsive design**: tested down to mobile, with a collapsible nav and adaptive grids

## Notes

- Product images are placeholder photography (via picsum.photos) — swap in real product
  photography in `src/data/products.js` for production use.
- `src/services/api.js` is structured so that swapping mock functions for real `axios`
  calls to a live backend requires no changes in components or pages.
