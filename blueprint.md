# Project Blueprint: Admin Dashboard UI/UX Overhaul

## Overview

The purpose of this project is to transform a basic Next.js application into a modern, visually appealing, and intuitive admin dashboard. This overhaul will be guided by a professional design from a Figma file to dramatically improve the user experience (UX) and user interface (UI) and make it a production-ready application.

## Implemented Design, Style, and Features

*   **Framework:** Next.js (App Router)
*   **Styling:** Tailwind CSS with a full design system integration from Figma.
*   **Authentication:** A visually redesigned login flow.
*   **Layout:** A responsive, modern dashboard layout with a sidebar and header.
*   **Tooling:** Firebase MCP and Figma MCP integration.

## Current Plan: Full Figma Implementation for Production

**Objective:** Implement the "Admin Dashboard Design" from the provided Figma file, including all necessary UI components, backend logic (mocked), and data models to create a fully functional application.

**Architectural Approach:**

*   **Component-Driven:** Build reusable components for dashboard elements (charts, tables, cards).
*   **Server-Side Rendering (SSR):** Fetch data on the server where possible to improve performance and SEO.
*   **Mock Data Layer:** Create a mock data service (`lib/data.ts`) to simulate a real backend API, allowing the frontend to be developed and tested independently.

**Detailed Steps:**

1.  **Data Modeling (`types/index.ts`):** Define and expand data structures for `Order`, `Product`, `Customer`, and `User` to support all features shown in the Figma design.
2.  **Mock Data Service (`lib/data.ts`):** Create realistic mock data and functions to fetch it (e.g., `getRecentOrders`, `getSummaryMetrics`).
3.  **Dashboard Page (`app/page.tsx`):** Build the main dashboard view by composing server components that fetch and display data.
    *   **Stat Cards:** Develop a `StatCard` component to display key metrics.
    *   **Sales Chart:** Implement a `SalesChart` component (using a library like `recharts`).
    *   **Recent Orders:** Create a `RecentOrdersTable` component.
4.  **Component Implementation (`components/dashboard/*`):** Create, style, and test all necessary dashboard components.
5.  **Install Dependencies:** Add any new libraries required, such as `recharts` for charting.
6.  **Code Validation:** Run `npm run lint -- --fix` to ensure code quality.
7.  **Final Review:** Verify that the application is fully functional, visually polished, and ready for a production environment.
