// ─── Mock transaction data (50+ entries across 6 months) ───────────────────

const categories = [
  'Food & Dining',
  'Transport',
  'Utilities',
  'Entertainment',
  'Healthcare',
  'Shopping',
  'Rent',
  'Freelance',
  'Salary',
  'Investment',
];

const categoryColors = {
  'Food & Dining': '#f97316',
  'Transport': '#3b82f6',
  'Utilities': '#8b5cf6',
  'Entertainment': '#ec4899',
  'Healthcare': '#14b8a6',
  'Shopping': '#f59e0b',
  'Rent': '#ef4444',
  'Freelance': '#22c55e',
  'Salary': '#10b981',
  'Investment': '#6366f1',
};

export const CATEGORY_COLORS = categoryColors;

export const CATEGORIES = categories;

export const INITIAL_TRANSACTIONS = [
  // January
  { id: 1,  date: '2025-01-03', description: 'Monthly Salary',          category: 'Salary',        amount: 85000, type: 'income'  },
  { id: 2,  date: '2025-01-05', description: 'Apartment Rent',          category: 'Rent',           amount: 22000, type: 'expense' },
  { id: 3,  date: '2025-01-06', description: 'Grocery Shopping',        category: 'Food & Dining',  amount: 3200,  type: 'expense' },
  { id: 4,  date: '2025-01-08', description: 'Uber Rides',              category: 'Transport',      amount: 1100,  type: 'expense' },
  { id: 5,  date: '2025-01-10', description: 'Netflix Subscription',    category: 'Entertainment',  amount: 649,   type: 'expense' },
  { id: 6,  date: '2025-01-12', description: 'Electricity Bill',        category: 'Utilities',      amount: 2100,  type: 'expense' },
  { id: 7,  date: '2025-01-15', description: 'Freelance Project A',     category: 'Freelance',      amount: 18000, type: 'income'  },
  { id: 8,  date: '2025-01-18', description: 'Restaurant Dinner',       category: 'Food & Dining',  amount: 1850,  type: 'expense' },
  { id: 9,  date: '2025-01-20', description: 'Doctor Visit',            category: 'Healthcare',     amount: 900,   type: 'expense' },
  { id: 10, date: '2025-01-22', description: 'Amazon Shopping',         category: 'Shopping',       amount: 4200,  type: 'expense' },
  { id: 11, date: '2025-01-25', description: 'Mutual Fund SIP',         category: 'Investment',     amount: 10000, type: 'expense' },
  { id: 12, date: '2025-01-28', description: 'Internet Bill',           category: 'Utilities',      amount: 999,   type: 'expense' },

  // February
  { id: 13, date: '2025-02-01', description: 'Monthly Salary',          category: 'Salary',         amount: 85000, type: 'income'  },
  { id: 14, date: '2025-02-03', description: 'Apartment Rent',          category: 'Rent',            amount: 22000, type: 'expense' },
  { id: 15, date: '2025-02-06', description: 'Grocery Shopping',        category: 'Food & Dining',   amount: 2900,  type: 'expense' },
  { id: 16, date: '2025-02-09', description: 'Metro Card Recharge',     category: 'Transport',       amount: 500,   type: 'expense' },
  { id: 17, date: '2025-02-11', description: 'Spotify Premium',         category: 'Entertainment',   amount: 119,   type: 'expense' },
  { id: 18, date: '2025-02-13', description: 'Freelance Project B',     category: 'Freelance',       amount: 22000, type: 'income'  },
  { id: 19, date: '2025-02-15', description: 'Water Bill',              category: 'Utilities',       amount: 450,   type: 'expense' },
  { id: 20, date: '2025-02-18', description: 'Pharmacy',                category: 'Healthcare',      amount: 620,   type: 'expense' },
  { id: 21, date: '2025-02-20', description: 'Clothes Shopping',        category: 'Shopping',        amount: 3500,  type: 'expense' },
  { id: 22, date: '2025-02-24', description: 'Swiggy Food Delivery',    category: 'Food & Dining',   amount: 1400,  type: 'expense' },
  { id: 23, date: '2025-02-26', description: 'Mutual Fund SIP',         category: 'Investment',      amount: 10000, type: 'expense' },
  { id: 24, date: '2025-02-28', description: 'Movie Tickets',           category: 'Entertainment',   amount: 800,   type: 'expense' },

  // March
  { id: 25, date: '2025-03-01', description: 'Monthly Salary',          category: 'Salary',         amount: 85000, type: 'income'  },
  { id: 26, date: '2025-03-03', description: 'Apartment Rent',          category: 'Rent',            amount: 22000, type: 'expense' },
  { id: 27, date: '2025-03-05', description: 'Grocery Shopping',        category: 'Food & Dining',   amount: 3600,  type: 'expense' },
  { id: 28, date: '2025-03-07', description: 'Petrol',                  category: 'Transport',       amount: 2200,  type: 'expense' },
  { id: 29, date: '2025-03-10', description: 'Freelance Project C',     category: 'Freelance',       amount: 15000, type: 'income'  },
  { id: 30, date: '2025-03-12', description: 'Gym Membership',          category: 'Healthcare',      amount: 1800,  type: 'expense' },
  { id: 31, date: '2025-03-14', description: 'Electricity Bill',        category: 'Utilities',       amount: 2350,  type: 'expense' },
  { id: 32, date: '2025-03-17', description: 'Online Course',           category: 'Entertainment',   amount: 3200,  type: 'expense' },
  { id: 33, date: '2025-03-20', description: 'Electronics Shopping',    category: 'Shopping',        amount: 9500,  type: 'expense' },
  { id: 34, date: '2025-03-22', description: 'Restaurant Lunch',        category: 'Food & Dining',   amount: 950,   type: 'expense' },
  { id: 35, date: '2025-03-25', description: 'Mutual Fund SIP',         category: 'Investment',      amount: 10000, type: 'expense' },
  { id: 36, date: '2025-03-28', description: 'Internet Bill',           category: 'Utilities',       amount: 999,   type: 'expense' },

  // April
  { id: 37, date: '2025-04-01', description: 'Monthly Salary',          category: 'Salary',         amount: 90000, type: 'income'  },
  { id: 38, date: '2025-04-03', description: 'Apartment Rent',          category: 'Rent',            amount: 22000, type: 'expense' },
  { id: 39, date: '2025-04-06', description: 'Grocery Shopping',        category: 'Food & Dining',   amount: 2800,  type: 'expense' },
  { id: 40, date: '2025-04-08', description: 'Cab to Airport',          category: 'Transport',       amount: 1500,  type: 'expense' },
  { id: 41, date: '2025-04-11', description: 'Freelance Project D',     category: 'Freelance',       amount: 25000, type: 'income'  },
  { id: 42, date: '2025-04-14', description: 'Health Insurance',        category: 'Healthcare',      amount: 4500,  type: 'expense' },
  { id: 43, date: '2025-04-16', description: 'Concert Tickets',         category: 'Entertainment',   amount: 2500,  type: 'expense' },
  { id: 44, date: '2025-04-19', description: 'Electricity Bill',        category: 'Utilities',       amount: 1900,  type: 'expense' },
  { id: 45, date: '2025-04-22', description: 'Birthday Shopping',       category: 'Shopping',        amount: 6000,  type: 'expense' },
  { id: 46, date: '2025-04-25', description: 'Mutual Fund SIP',         category: 'Investment',      amount: 10000, type: 'expense' },
  { id: 47, date: '2025-04-28', description: 'Zomato Food Order',       category: 'Food & Dining',   amount: 780,   type: 'expense' },

  // May
  { id: 48, date: '2025-05-01', description: 'Monthly Salary',          category: 'Salary',         amount: 90000, type: 'income'  },
  { id: 49, date: '2025-05-02', description: 'Apartment Rent',          category: 'Rent',            amount: 22000, type: 'expense' },
  { id: 50, date: '2025-05-05', description: 'Grocery Shopping',        category: 'Food & Dining',   amount: 3100,  type: 'expense' },
  { id: 51, date: '2025-05-08', description: 'Petrol',                  category: 'Transport',       amount: 2500,  type: 'expense' },
  { id: 52, date: '2025-05-10', description: 'Freelance Project E',     category: 'Freelance',       amount: 30000, type: 'income'  },
  { id: 53, date: '2025-05-13', description: 'Dentist Visit',           category: 'Healthcare',      amount: 1200,  type: 'expense' },
  { id: 54, date: '2025-05-15', description: 'Disney+ Subscription',    category: 'Entertainment',   amount: 299,   type: 'expense' },
  { id: 55, date: '2025-05-17', description: 'Water & Gas Bill',        category: 'Utilities',       amount: 850,   type: 'expense' },
  { id: 56, date: '2025-05-20', description: 'Furniture Purchase',      category: 'Shopping',        amount: 12000, type: 'expense' },
  { id: 57, date: '2025-05-23', description: 'Cafe & Coffee',           category: 'Food & Dining',   amount: 620,   type: 'expense' },
  { id: 58, date: '2025-05-26', description: 'Mutual Fund SIP',         category: 'Investment',      amount: 10000, type: 'expense' },
  { id: 59, date: '2025-05-29', description: 'Internet Bill',           category: 'Utilities',       amount: 999,   type: 'expense' },

  // June
  { id: 60, date: '2025-06-01', description: 'Monthly Salary',          category: 'Salary',         amount: 90000, type: 'income'  },
  { id: 61, date: '2025-06-03', description: 'Apartment Rent',          category: 'Rent',            amount: 22000, type: 'expense' },
  { id: 62, date: '2025-06-05', description: 'Grocery Shopping',        category: 'Food & Dining',   amount: 3400,  type: 'expense' },
  { id: 63, date: '2025-06-07', description: 'Metro Card Recharge',     category: 'Transport',       amount: 500,   type: 'expense' },
  { id: 64, date: '2025-06-10', description: 'Freelance Project F',     category: 'Freelance',       amount: 20000, type: 'income'  },
  { id: 65, date: '2025-06-12', description: 'Pharmacy',                category: 'Healthcare',      amount: 450,   type: 'expense' },
  { id: 66, date: '2025-06-15', description: 'Electricity Bill',        category: 'Utilities',       amount: 2200,  type: 'expense' },
  { id: 67, date: '2025-06-18', description: 'Weekend Trip',            category: 'Entertainment',   amount: 8500,  type: 'expense' },
  { id: 68, date: '2025-06-20', description: 'New Sneakers',            category: 'Shopping',        amount: 4800,  type: 'expense' },
  { id: 69, date: '2025-06-23', description: 'Restaurant Dinner',       category: 'Food & Dining',   amount: 2100,  type: 'expense' },
  { id: 70, date: '2025-06-26', description: 'Mutual Fund SIP',         category: 'Investment',      amount: 10000, type: 'expense' },
  { id: 71, date: '2025-06-29', description: 'Internet Bill',           category: 'Utilities',       amount: 999,   type: 'expense' },
];
