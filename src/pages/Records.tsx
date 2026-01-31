import { useNavigate } from 'react-router-dom'
import { HierarchicalTable } from '../components/HierarchicalTable'
import { initialData } from '../data/initialData'

export function Records() {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <div className="records-page">
      <header className="records-header">
        <h1>Hierarchical Records</h1>
        <button type="button" className="btn btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <main className="records-content">
        <HierarchicalTable initialRows={initialData.rows} />
      </main>
    </div>
  )
}
