# TableUI - Hierarchical Records

A React application featuring a hierarchical table with allocation controls, variance tracking, and a professional dark-themed UI.

---

## Login

### Sample Credentials

Use these credentials to access the application:

| Field    | Value              |
| -------- | ------------------ |
| **Email**    | `demo@example.com` |
| **Password** | `demo123`          |

> You can also use any email and password to sign in—the app accepts all credentials for demo purposes.

### Login Screen

image.png

*The login page features a clean black theme with orange accent buttons. Enter the sample credentials above to access the records.*

---

## Records Page

### Records Screen

image.png

*The records page displays the hierarchical table with search, navbar, and allocation controls.*

---

## Functionality

### 1. Hierarchical Table Structure

- **Parent-child rows**: Categories (e.g., Electronics, Furniture) contain child items (e.g., Phones, Laptops, Tables, Chairs).
- **Automatic subtotals**: Parent row values are calculated from their children. When a child value changes, the parent updates automatically.
- **Grand Total**: A footer row sums all top-level category values.

### 2. Allocation % Button

- **Purpose**: Increase a row's value by a percentage.
- **How to use**: Enter a percentage number (e.g., `10`) in the input field, then click **Allocation %**.
- **Example**: Phones at 800 + 10% → 880. Electronics subtotal updates to 1580.

### 3. Allocation Val Button

- **Purpose**: Set a row's value to a specific number.
- **Leaf rows**: The value is set directly; parent subtotals recalculate.
- **Parent rows**: The new value is distributed to children based on their current contribution ratio.
  - Example: Furniture 1100 → 2000. Tables (400/1100) and Chairs (700/1100) scale proportionally to 727.27 and 1272.73.

### 4. Variance Display

- **Purpose**: Shows percentage change from the original value.
- **Formula**: `(current - original) / original × 100`
- **Display**: Each row and the Grand Total show variance %. 0% means unchanged.

### 5. Search

- **Purpose**: Filter table rows by label.
- **How to use**: Type in the search box; only rows whose label contains the search term are shown.

### 6. Navbar & Logout

- **Navbar**: Displays app branding and a Logout button.
- **Logout**: Returns to the login screen.

---

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## GitHub Pages Deployment

1. Update `vite.config.ts` and set `base` to your repository name:

   ```ts
   base: '/tableUI/',  
   ```

2. Build the project:

   ```bash
   npm run build
   ```

3. Deploy the `dist` folder to GitHub Pages (e.g., via GitHub Actions or the `gh-pages` branch).

---

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── HierarchicalTable.tsx
│   ├── Navbar.tsx
│   └── TableRow.tsx
├── data/             # Initial data
│   └── initialData.ts
├── pages/
│   ├── Login.tsx     # Login screen
│   └── Records.tsx   # Records/table page
├── utils/            # Pure utility functions
│   └── hierarchyUtils.ts
├── App.tsx
├── App.css
└── main.tsx
```

---

## Usage Examples

### Allocation by Percentage

1. Enter `10` in the input next to "Phones"
2. Click **Allocation %**
3. Phones value: 800 → 880 (+10%)
4. Electronics subtotal updates to 1580

### Allocation by Value (Leaf)

1. Enter `400` in the input next to "Tables"
2. Click **Allocation Val**
3. Tables value: 300 → 400
4. Furniture subtotal updates to 1100

### Allocation by Value (Parent – Distributed)

1. Enter `2000` in the input next to "Furniture"
2. Click **Allocation Val**
3. Furniture: 1000 → 2000
4. Children (Tables, Chairs) scale proportionally based on their contribution ratio

---

## Screenshots

To add screenshots to this README:

1. Run `npm run dev` and open http://localhost:5173
2. Capture the Login page and save as `screenshots/login.png`
3. Log in, capture the Records page, and save as `screenshots/records.png`

---

## License

MIT
