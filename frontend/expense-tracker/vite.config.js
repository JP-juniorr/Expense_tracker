// filepath: /Users/xxx/Desktop/Expense_tracker/frontend/expense-tracker/vite.config.js
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
