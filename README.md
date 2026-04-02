# Finance Dashboard UI

A clean, modern, and interactive finance dashboard built to track and analyze financial activity. This project was developed as a frontend assignment focusing on UI design, component architecture, and state management.

## 🚀 Live Development
To run this project locally:

1. **Clone/Download the repository**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
4. **Open in browser:** Navigate to `http://localhost:5173` (or the port specified in your terminal).

## 🛠️ Technology Stack
- **Framework:** React 18 (Bootstrapped with Vite)
- **Styling:** Tailwind CSS v4 (chosen for rapid UI development and maintaining a clean, scalable design system)
- **State Management:** React Context API + `useReducer`
- **Charts/Visualizations:** Recharts
- **Icons:** Lucide React

## ⭐ Core Features Implemented

### 1. Dashboard Overview
- **Summary Cards:** Displays Total Balance, Total Income, Total Expenses, and a calculated Savings Rate.
- **Time-based Visualization:** An Area Chart showing the net balance monthly trend over the last 6 months.
- **Categorical Visualization:** A Donut Chart breaking down expenses by categories (Food, Rent, Utilities, etc.).

### 2. Transactions Management
- Detailed list view showing Date, Description, Category, Amount, and Type (Income/Expense indicator).
- **Search & Filtering:** Real-time search across descriptions and amounts, combined with drop-down filters for Type and Category.
- **Sorting:** Ability to sort by Date or Amount in Ascending/Descending order.
- **Empty States:** Graceful handling when no transactions match the applied filters.

### 3. Role-Based UI (RBAC Simulation)
- A persistent dropdown in the header allows toggling between **Viewer** and **Admin** roles.
- **Viewer:** Has read-only access to browse data and view charts.
- **Admin:** Unlocks full Create, Update, Delete (CRUD) operations. Can add new transactions or edit/delete existing ones.

### 4. Insights Section
- Extracts actionable data from the transaction history.
- Automatically calculates the **Highest Spending Category** and shows the percentage impact on total spend.
- **Month-over-Month Comparison:** Calculates if recent spending is up or down compared to the previous month, providing helpful contextual feedback.
- Features a Bar Chart directly comparing monthly Income vs. Expenses.

### 5. Robust State Management
- Global state managed entirely through a custom `useApp` hook wrapped with React Context and `useReducer`. This keeps prop-drilling organized and scales nicely.

## 🎁 Optional Enhancements Included
- **Dark Mode:** Fully responsive dark/light mode toggle with optimized UI color palettes.
- **Data Persistence:** Transactions, selected filters, active roles, and dark mode configuration are saved to the browser's `localStorage` so you don't lose data on refresh.
- **CSV Export:** Users can easily click to download their currently filtered transactions directly into a beautifully formatted CSV file.
- **UI Polish:** Features subtle hover transitions, responsive sliding sidebar for mobile devices, and well-designed empty-states.

## 📐 Design Approach
The goal was not to make something heavily "flashy" or "AI-generated" but rather to prioritize a highly professional, readable, and functional layout. 
- Utilized **Inter** font family to emulate modern fintech standards.
- Used clean Slate, Indigo, Emerald, and Rose color palettes (Tailwind defaults) specifically targeted to convey financial data clearly without overwhelming the user.

## Project Structure highlighting
```text
src/
├── context/
│   └── AppContext.jsx          # Global State & localStorage sync
├── components/
│   ├── dashboard/              # Summary Cards & Recharts wrappers
│   ├── layout/                 # Sidebar, Header, Main Layout
│   └── transactions/           # FilterBar, TransactionList, AddEditModal
├── data/
│   └── mockData.js             # 70+ Initial mock transactions
└── pages/
    ├── Dashboard.jsx           # Main Overview view
    ├── Transactions.jsx        # Data table management view
    └── Insights.jsx            # Deep-dive analytics view
```

*(Note: This project handles mocked data purely on the frontend for evaluation purposes and does not require a backend API)*

---

## 🧠 Technical Decisions and Trade-offs

During the development of this project, several architectural choices were made to strictly balance complexity, scalability, and delivery speed:

### 1. State Management: `Context API` + `useReducer` vs Redux/Zustand
- **Decision:** I chose native React Context mapped heavily to a single central `useReducer` hook (`AppContext.jsx`) instead of introducing a heavy external library like Redux or Zustand.
- **Trade-off:** Native Context can theoretically cause unnecessary re-renders if components subscribe to state they don't consume, but for a dashboard of this size, React handles this gracefully. It immensely reduced overhead, reduced third-party bloat, and kept everything contained entirely within React's standard framework.

### 2. Styling: Plain Tailwind CSS vs Component Libraries (MUI / Shadcn UI)
- **Decision:** I strictly utilized vanilla Tailwind CSS utility classes instead of picking a pre-built Component Library like Material UI or Shadcn.
- **Trade-off:** Pre-fab component libraries give faster basic setups, but they come with heavy javascript bundles and rigid design constraints. Adopting strict Tailwind granted pure control over granular elements (like responsive modal sliding and precise data-table alignments) allowing the creation of a much more customized, "lightweight", and premium "fintech" feel without bloated node_modules.

### 3. Client Storage Strategy: Synchronous `localStorage`
- **Decision:** Application state (Transactions, Active Roles, Dark Mode toggles) hydrates immediately from `localStorage` inside the Context initialization using a helper function.
- **Trade-off:** It is synchronous and blocks the main thread slightly on boot, but since we are handling a relatively small JSON dataset of under ~1,000 mock transactions, the performance hit is 0ms. If this project scaled to require an actual Database, we would transition to Asynchronous fetches (`useEffect` on mount) and display skeletons/spinners. Synchronous local hydration allowed us to avoid complex "Loading States" completely for a smoother UX.

### 4. Charting Library: Recharts vs Chart.js / D3
- **Decision:** Integrated `recharts` for all data visualizations.
- **Trade-off:** Writing custom SVG charts in pure React (like D3) offers infinite flexibility, but takes immense time. Recharts is built specifically for React, highly declarative, and integrates flawlessly into responsive, flex-based CSS layouts. The trade-off is minor chart aesthetic customization limitations, but it delivered 95% of the needed functionality seamlessly out of the box.

### 5. Unified Transaction Filtering Logic
- **Decision:** Implemented dynamic derived state via `getFilteredTransactions` rather than saving 'filtered results' directly into state.
- **Trade-off:** This recalculates the array on every render cycle using pure functional JavaScript. We heavily relied on React's rendering efficiency here to avoid caching problems. This ensures there are zero "desyncs" where the user sees a filtered transaction that was just deleted by an Admin behind the scenes.
