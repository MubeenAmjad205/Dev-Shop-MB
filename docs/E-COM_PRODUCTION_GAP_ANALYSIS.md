# Production-Grade Headless E-Commerce Task Tracker
*(Architecture: Next.js + Shopify Storefront API + Custom GraphQL Admin Panel)*

## Overview
This document tracks the tasks required to harden the `Dev-Shop-MB` project into a production-grade headless e-commerce architecture. We are officially **dropping Contentful** and moving towards a unified architecture where **Shopify** handles core commerce (including Payments) and a **Custom Admin Panel** manages extended inventory, blogs, and content via GraphQL.

---

## 1. Current Implementation Weaknesses & Refactoring (CRITICAL)

### A. Data Fetching & State
- [ ] **Refactor Products Page to Server Components**: Remove `useEffect` and `useState` from `src/app/products/page.tsx`. Use Next.js 15 Server Components and App Router caching for SEO and performance.
- [ ] **Replace Local Redux Cart with Shopify Cart**: Refactor `cartSlice.ts` to sync with Shopify. The Redux store must securely persist a Shopify `cartId` (in cookies/local storage). All `addItem` actions must trigger the Shopify `cartLinesAdd` GraphQL mutation.
- [ ] **URL-Based Pagination**: Replace brittle React `useState` pagination (`cursorStack`) with URL parameters (e.g., `?cursor=xyz`) synced with the Server Component's `searchParams`.
- [ ] **Enforce Strict Typing**: Remove all `any` types. Generate strict TypeScript types from our GraphQL queries.

### B. Global Configuration
- [x] **Create Global Branding Config**: Setup `src/core/config/global.json` for centralized branding, SEO, and currency settings.
- [x] **Drop Contentful**: Removed Contentful API files. Future content logic will be built into the new Custom Admin Panel.

---

## 2. Shopify Checkout & Cart API Integration
- [ ] **Cart GraphQL Integration**: Implement `cartCreate`, `cartLinesAdd`, `cartLinesUpdate`, and `cartLinesRemove` mutations.
- [ ] **Checkout Redirect Flow**: Route users to the Shopify-hosted checkout utilizing the `checkoutUrl` returned by the Cart API.
- [ ] **Shopify Payments**: Ensure the Shopify storefront is configured to leverage Shopify Payments natively at checkout.
- [ ] **Real-time Inventory Validation**: Query Shopify's `availableForSale` before allowing "Add to Cart" actions.

---

## 3. Custom Admin Panel (Replacing Contentful)
Since we dropped Contentful, we need our own GraphQL-powered backend system to manage non-Shopify data.
- [ ] **Setup Admin Panel Backend**: Initialize a backend service with a GraphQL API.
- [ ] **Content & Blog Management**: Create GraphQL schemas for rich text, landing pages, and blog posts.
- [ ] **Extended Inventory Control**: Allow the admin panel to sync with or augment Shopify inventory data (e.g., custom metadata that Shopify metafields can't handle).
- [ ] **Unified GraphQL Layer**: Ensure the frontend consumes the Custom Admin GraphQL alongside the Shopify Storefront API seamlessly.

---

## 4. Customer Accounts (Shopify Customer API)
- [ ] **Authentication**: Implement `customerCreate` and `customerAccessTokenCreate` flows via GraphQL.
- [ ] **Account Dashboard**: Build order history and address management (`customerAddressCreate`, `customerAddressUpdate`).
- [ ] **Password Management**: Handle `customerRecover` for password resets.

---

## 5. UI / UX Edge Cases & Robustness
- [ ] **Optimistic UI for Cart**: Make cart updates instant on the frontend to mask network latency.
- [ ] **Loading States**: Replace hardcoded `Loading...` components with Skeleton loaders for all data-fetching boundaries.
- [ ] **Error Boundaries**: Implement Global Error Boundaries and robust toast notifications for GraphQL API failures.
- [ ] **Internationalization (i18n)**: Prepare GraphQL queries for Shopify Markets using the `@inContext` directive.

---

## 6. Telemetry, SEO, & Security
- [ ] **Structured Data**: Inject JSON-LD for products combining live Shopify data and Custom Admin descriptions.
- [ ] **Analytics Tracking**: Implement Meta Pixel and GA4 on the Next.js frontend to replace lost native Shopify tracking.
- [ ] **Rate Limiting & Security Headers**: Add strict-transport-security, XSS protection, and rate limit sensitive GraphQL routes.
