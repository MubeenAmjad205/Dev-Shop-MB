# Dev-Shop-MB: Production Hardening Implementation Plan

## Overview
This document serves as our phased, actionable to-do list for making the `Dev-Shop-MB` project production-ready. We are dropping Contentful completely and will hardcode static data directly into components. Shopify will be our exclusive backend for commerce and payments via the Storefront GraphQL API.

---

## 🚀 Phase 1: Contentful Removal & Hardcoding Data
*Goal: Completely rip out Contentful and replace it with fast, local hardcoded data in components/pages.*

- [x] **Remove Dependencies**: Uninstall any Contentful-related packages (e.g., `@contentful/rich-text-react-renderer`, `graphql` if only used for Contentful).
- [x] **Refactor Blogs**: Replace Contentful GraphQL queries in the Blog section with hardcoded arrays of blog data (in `src/data/content.tsx` or similar).
- [x] **Refactor Landing/Static Pages**: Hardcode hero banners, promotional texts, and policies directly into their respective Next.js pages/components.
- [x] **Delete Unused Files**: Remove any residual Contentful client initialization or utility files.

---

## 🛠 Phase 2: Core E-Commerce Refactoring (Performance & SEO)
*Goal: Fix architectural flaws that hurt SEO and user experience by leveraging Next.js Server Components.*

- [x] **Server-Side Data Fetching**: Refactor `src/app/products/page.tsx` to remove `'use client'` and `useEffect`. Fetch Shopify product collections server-side.
- [x] **URL-Driven Pagination**: Replace the brittle `useState` (`cursorStack`) pagination with robust URL parameters (e.g., `?cursor=xyz` & `?direction=next`).
- [x] **Global Configuration Wiring**: Wire `src/core/config/global.json` (PKR currency, social links, branding) into headers, footers, and SEO metadata.

---

## 🛒 Phase 3: Shopify Cart & Checkout Integration
*Goal: Replace the fake local cart with a robust, server-synced Shopify Cart.*

- [x] **Shopify Cart Mutations**: Create GraphQL queries/mutations for `cartCreate`, `cartLinesAdd`, `cartLinesUpdate`, and `cartLinesRemove`.
- [x] **Persist Cart State**: Update Redux `cartSlice.ts` to store a Shopify `cartId` instead of an array of local items. Persist this ID in cookies/local storage.
- [x] **Real-Time Cart Sync**: Wire the `CartSideBar` to display data fetched directly from the Shopify `cart` query.
- [x] **Checkout Redirect**: Implement a "Checkout" button that redirects the user to the `checkoutUrl` provided by Shopify, utilizing **Shopify Payments**.

---

## 👤 Phase 4: Shopify Customer Accounts
*Goal: Implement native Shopify authentication so users can track orders.*

- [x] **Authentication Flows**: Implement Login/Register UI using Shopify's `customerCreate` and `customerAccessTokenCreate` mutations.
- [x] **Account Dashboard**: Build a user dashboard to fetch and display Order History.
- [x] **Secure Auth Handling**: Store the access token in a secure `HttpOnly` cookie via Next.js API Routes to prevent XSS.

---

## 🛡 Phase 5: Polish, UI/UX, and Type Safety
*Goal: Eliminate runtime crashes and ensure a premium feel.*

- [x] **Dark/Light Mode**: Introduced `next-themes` and a theme toggle for native Dark Mode support across the entire project.
- [ ] **Strict TypeScript Execution**: Hunt down and remove `any` types across the project, replacing them with strict GraphQL-generated types.
- [x] **Loading States**: Replaced hardcoded "Loading..." text with animated `Skeleton` loaders for premium transitions.
- [x] **Error Boundaries & Toasts**: Added `react-hot-toast` for real-time success/error notifications on all Cart mutations.
- [x] **Optimistic UI**: Re-wired Redux Thunks to instantly trigger loading toasts and update UI elements without waiting for silent background failures.

---

## 🔑 Phase 6: Headless Admin Panel
*Goal: Provide a secure internal dashboard for store owners to manage inventory and content directly via Shopify Admin API.*

- [x] **Admin Routing**: Setup Next.js App Router structure for `/admin/dashboard`, `/admin/products`, and `/admin/settings`.
- [x] **Admin Authentication**: Created a secure Next.js 16 `proxy.ts` (formerly Middleware) and JWT-based login exclusively for the store owner.
- [x] **Admin GraphQL Integration**: Created `shopifyAdminClient` and `shopifyAdminQueries.ts` to securely fetch private inventory data using the Admin API token.
- [x] **Admin Layout**: Built a dedicated sidebar and layout distinct from the public storefront.
- [x] **Inventory Management Module**: Built the `AdminProducts` server component to dynamically render real-time stock levels, pricing, and product status.
