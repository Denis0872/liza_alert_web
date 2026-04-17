import { Activity, MapPinned, Siren, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Panel } from '../components/ui/Panel'
import { PageHeader } from '../components/ui/PageHeader'
import { StatCard } from '../components/ui/StatCard'
import { demoSearches } from '../data/mock'

export function DashboardPage() {
  return (
    <div className="page-grid">
      <Panel hero>
        <PageHeader
          description="Каркас дашборда для роли координатора и добровольца."
          title="Активные поиски"
        />
        <div className="stat-row">
          <StatCard icon={<Siren size={18} />} label="Сегодня" value="7" />
          <StatCard icon={<Users size={18} />} label="Добровольцы" value="168" />
          <StatCard icon={<MapPinned size={18} />} label="Штабы" value="4" />
          <StatCard icon={<Activity size={18} />} label="Реагирование" value="12 мин" />
        </div>
      </Panel>

      <Panel>
        <div className="panel-head">
          <h2>Ближайшие активы</h2>
          <Link to="/app/searches">Смотреть все</Link>
        </div>
        <div className="list">
          {demoSearches.map((search) => (
            <article className="list-item" key={search.id}>
              <div className="list-main">
                <strong>
                  {search.title}, {search.age}
                </strong>
                <p>{search.district}</p>
              </div>
              <Link to={`/app/searches/${search.id}`}>Открыть</Link>
            </article>
          ))}
        </div>
      </Panel>
    </div>
  )
}
