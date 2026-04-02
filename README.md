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
