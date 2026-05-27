import './FilterBar.css'

const STATUS_OPTIONS = [
  { value: 'todas', label: 'Todas' },
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'en_progreso', label: 'En progreso' },
  { value: 'completada', label: 'Completada' },
]

const PRIORITY_OPTIONS = [
  { value: 'todas', label: 'Todas' },
  { value: 'alta', label: 'Alta' },
  { value: 'media', label: 'Media' },
  { value: 'baja', label: 'Baja' },
]

const SORT_OPTIONS = [
  { value: 'createdAt_desc', label: 'Más recientes' },
  { value: 'createdAt_asc', label: 'Más antiguas' },
  { value: 'deadline_asc', label: 'Fecha límite' },
  { value: 'priority_desc', label: 'Prioridad (alta-baja)' },
  { value: 'priority_asc', label: 'Prioridad (baja-alta)' },
  { value: 'title_asc', label: 'Título A-Z' },
  { value: 'title_desc', label: 'Título Z-A' },
]

export default function FilterBar({ filters, setFilters }) {
  const update = (key, value) => setFilters(prev => ({ ...prev, [key]: value }))

  return (
    <div className="filterbar">
      <div className="filter-group">
        <span className="filter-label">Estado</span>
        <div className="filter-pills">
          {STATUS_OPTIONS.map(opt => (
            <button
              key={opt.value}
              className={`pill ${filters.status === opt.value ? 'pill--active' : ''}`}
              onClick={() => update('status', opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <span className="filter-label">Prioridad</span>
        <div className="filter-pills">
          {PRIORITY_OPTIONS.map(opt => (
            <button
              key={opt.value}
              className={`pill ${filters.priority === opt.value ? 'pill--active' : ''}`}
              onClick={() => update('priority', opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group filter-group--sort">
        <span className="filter-label">Ordenar</span>
        <select
          className="sort-select"
          value={filters.sortBy}
          onChange={e => update('sortBy', e.target.value)}
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
