import { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { HierarchicalTable } from '../components/HierarchicalTable'
import { initialData } from '../data/initialData'

export function Records() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="records-page">
      <Navbar />
      <main className="records-content">
        <div className="records-toolbar">
          <div className="search-box">
            <span className="search-icon" aria-hidden>🔍</span>
            <input
              type="search"
              placeholder="Search by label..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        <HierarchicalTable
          initialRows={initialData.rows}
          searchTerm={searchTerm}
        />
      </main>
    </div>
  )
}
