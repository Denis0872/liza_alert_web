import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { PageHeader } from '../components/ui/PageHeader'
import { Panel } from '../components/ui/Panel'
import { StatusBadge } from '../components/ui/StatusBadge'
import { demoSearches } from '../data/mock'

export function SearchesPage() {
  return (
    <Panel>
      <PageHeader
        actions={<Button type="button">Создать поиск</Button>}
        title="Список поисков"
      />
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Номер</th>
              <th>ФИО / возраст</th>
              <th>Район</th>
              <th>Статус</th>
              <th>Волонтеры</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {demoSearches.map((search) => (
              <tr key={search.id}>
                <td>{search.id}</td>
                <td>
                  {search.title}, {search.age}
                </td>
                <td>{search.district}</td>
                <td>
                  <StatusBadge status={search.status} />
                </td>
                <td>{search.volunteers}</td>
                <td>
                  <Link to={`/app/searches/${search.id}`}>Открыть</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  )
}
