import { Map, MessagesSquare, UserPlus } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { PageHeader } from '../components/ui/PageHeader'
import { Panel } from '../components/ui/Panel'

export function SearchDetailsPage() {
  const { id } = useParams()

  return (
    <div className="page-grid">
      <Panel hero>
        <PageHeader
          description="Скелет страницы с разделами: общая информация, карта, команды, коммуникация."
          title={`Карточка поиска ${id}`}
        />
        <div className="hero-actions page-header-actions">
          <Button type="button">
            <UserPlus size={18} />
            Я готов (пеший / экипаж)
          </Button>
          <Button type="button" variant="secondary">
            <MessagesSquare size={18} />
            Открыть чат
          </Button>
        </div>
      </Panel>
      <Panel>
        <div className="panel-head">
          <h2>Карта поиска</h2>
          <span className="status status-active">Черновой режим</span>
        </div>
        <div className="map-skeleton">
          <Map size={40} />
          <p>Здесь будет интеграция Yandex Maps с ролевыми слоями.</p>
        </div>
      </Panel>
    </div>
  )
}
