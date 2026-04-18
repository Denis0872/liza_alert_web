import { Map, MessagesSquare, UserPlus } from 'lucide-react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StateBlock } from '@/components/ui/StateBlock'
import { getSearchDetails, statusLabel } from '@/data/mock'
import { PageHeader } from '../components/ui/PageHeader'
import { Panel } from '../components/ui/Panel'

export function SearchDetailsPage() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const state = searchParams.get('state')
  const details = id ? getSearchDetails(id) : undefined

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
        {state === 'loading' ? (
          <StateBlock
            description="Подгружаем карточку человека и служебные данные по поиску."
            kind="loading"
            title="Загрузка карточки"
          />
        ) : state === 'error' ? (
          <StateBlock
            description="Не удалось получить карточку поиска. Повторите попытку позже."
            kind="error"
            title="Ошибка загрузки"
          />
        ) : details ? (
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Карточка пропавшего человека</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="person-card">
                <img alt={details.fullName} className="person-photo" src={details.photoUrl} />
                <div className="person-meta">
                  <h3>
                    {details.fullName}, {details.age}
                  </h3>
                  <div className="hero-actions">
                    <Badge variant="secondary">{statusLabel[details.status]}</Badge>
                    <Badge variant="outline">{details.district}</Badge>
                  </div>
                  <p className="person-description">{details.description}</p>
                  <ul>
                    {details.specialSigns.map((sign) => (
                      <li key={sign}>{sign}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <StateBlock
            description="По этому номеру пока нет данных в системе."
            kind="empty"
            title="Карточка не найдена"
          />
        )}
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
