# TableUI - Hierarchical Records

A React application featuring a hierarchical table with allocation controls, variance tracking, and a professional dark-themed UI.


## Features

- **Hierarchical Table**: Parent-child rows with automatic subtotal calculations
- **Allocation % Button**: Increase a row's value by a percentage (e.g., 10% on 800 → 880)
- **Allocation Val Button**: Set a row's value directly; distributes proportionally to children when updating parent rows
- **Variance Display**: Shows percentage change from original values
- **Grand Total Row**: Sums all top-level values with variance
- **Professional UI**: Black theme with orange accents, login screen, and responsive layout

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router

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

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── HierarchicalTable.tsx
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

## Usage Examples

### Allocation by Percentage

1. Enter `10` in the input next to "Phones"
2. Click **Allocation %**
3. Phones value: 800 → 880 (+10%)
4. Electronics subtotal updates to 1580

### Allocation by Value

1. Enter `400` in the input next to "Tables"
2. Click **Allocation Val**
3. Tables value: 300 → 400
4. Furniture subtotal updates to 1100

### Parent Row Distribution

1. Enter `2000` in the input next to "Furniture"
2. Click **Allocation Val**
3. Furniture: 1000 → 2000
4. Children (Tables, Chairs) scale proportionally based on their contribution ratio

## License

MIT
