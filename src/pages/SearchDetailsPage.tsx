import { MapPin, MessageSquareText, Pencil, Tag } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StateBlock } from '@/components/ui/StateBlock'
import { PageHeader } from '../components/ui/PageHeader'
import { Panel } from '../components/ui/Panel'
import { getSearches, saveSearches, subscribeInforgStore } from '../data/inforgStore'
import type { SearchSession } from '../data/inforg'

const statusLabel: Record<SearchSession['status'], string> = {
  passive: 'Пассивный',
  active: 'Активный',
  critical: 'Горящий',
  completed: 'Выполнена',
}

export function SearchDetailsPage() {
  const { id } = useParams()
  const [searches, setSearches] = useState<SearchSession[]>(() => getSearches())
  const [isEditing, setEditing] = useState(false)
  const [draft, setDraft] = useState<SearchSession | null>(null)

  useEffect(() => subscribeInforgStore(() => setSearches(getSearches())), [])

  const details = useMemo(() => searches.find((item) => item.id === id), [id, searches])

  useEffect(() => {
    if (!details) {
      setDraft(null)
      setEditing(false)
      return
    }
    setDraft(details)
    setEditing(false)
  }, [details?.updatedAt, details?.id])

  const saveDraft = () => {
    if (!draft) return
    const now = new Date().toLocaleString('ru-RU')
    const next = searches.map((item) => (item.id === draft.id ? { ...draft, updatedAt: now } : item))
    setSearches(next)
    saveSearches(next)
    setEditing(false)
  }

  const handlePhotoUpload = (file?: File) => {
    if (!file || !draft) return
    const reader = new FileReader()
    reader.onload = () => {
      setDraft((prev) => (prev ? { ...prev, targetPhotoUrl: String(reader.result) } : prev))
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="page-grid">
      <Panel hero>
        <PageHeader
          description="Карточка цели и ключевая информация для добровольцев."
          title={details ? details.title : `Карточка поиска ${id}`}
        />
        <div className="hero-actions page-header-actions">
          <Link to="/app/searches">
            <Button type="button" variant="secondary">
              Назад к списку
            </Button>
          </Link>
          {details && isEditing ? (
            <>
              <Button type="button" onClick={saveDraft}>
                Сохранить
              </Button>
              <Button type="button" variant="secondary" onClick={() => { setDraft(details); setEditing(false) }}>
                Отменить
              </Button>
            </>
          ) : null}
        </div>
      </Panel>

      <Panel>
        {!details || !draft ? (
          <StateBlock
            description="По этому номеру пока нет данных в системе."
            kind="empty"
            title="Карточка не найдена"
          />
        ) : (
          <Card className="bg-white">
            <CardHeader>
              <div className="card-title-with-action">
                <Button type="button" variant="secondary" className="icon-btn" onClick={() => setEditing((prev) => !prev)}>
                  <Pencil size={14} />
                </Button>
                <CardTitle>Карточка цели</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="person-card">
                {draft.targetPhotoUrl ? (
                  <img alt={draft.targetName} className="person-photo" src={draft.targetPhotoUrl} />
                ) : (
                  <div className="person-photo target-photo-empty">Фото не загружено</div>
                )}

                <div className="person-meta">
                  <h3>
                    {draft.targetName || 'Без имени'}
                    {draft.targetAge ? `, ${draft.targetAge}` : ''}
                  </h3>
                  <div className="hero-actions">
                    <Badge variant="secondary">{statusLabel[draft.status]}</Badge>
                    <Badge variant="outline">{draft.location}</Badge>
                  </div>

                  {isEditing ? (
                    <>
                      <label htmlFor="target-name">ФИО</label>
                      <input
                        id="target-name"
                        className="inforg-input"
                        value={draft.targetName}
                        onChange={(event) => setDraft({ ...draft, targetName: event.target.value })}
                      />
                      <label htmlFor="target-age">Возраст</label>
                      <input
                        id="target-age"
                        className="inforg-input"
                        type="number"
                        value={draft.targetAge ?? ''}
                        onChange={(event) =>
                          setDraft({ ...draft, targetAge: event.target.value ? Number(event.target.value) : undefined })
                        }
                      />
                    </>
                  ) : null}

                  <p className="person-description">{draft.targetDescription || draft.summary}</p>

                  {isEditing ? (
                    <textarea
                      className="inforg-textarea"
                      value={draft.targetDescription}
                      onChange={(event) => setDraft({ ...draft, targetDescription: event.target.value })}
                    />
                  ) : null}

                  <div className="detail-tags">
                    <Tag size={16} />
                    <div className="tag-list compact">
                      {draft.tags.map((tag) => (
                        <span className="tag-chip" key={`${draft.id}-${tag}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </Panel>

      {details && draft ? (
        <Panel>
          <div className="panel-head">
            <h2>Вложения и геолокация</h2>
            <Button type="button" variant="secondary" disabled>
              <MessageSquareText size={16} /> Открыть чат (скоро)
            </Button>
          </div>
          <div className="details-stack">
            <article className="detail-block">
              <label htmlFor="target-geo-label">Геолокация (описание точки)</label>
              <input
                id="target-geo-label"
                className="inforg-input"
                value={draft.targetGeoLabel ?? ''}
                disabled={!isEditing}
                onChange={(event) => setDraft({ ...draft, targetGeoLabel: event.target.value })}
              />
              <div className="geo-row">
                <input
                  className="inforg-input"
                  placeholder="Широта"
                  value={draft.targetLat ?? ''}
                  disabled={!isEditing}
                  onChange={(event) => setDraft({ ...draft, targetLat: event.target.value })}
                />
                <input
                  className="inforg-input"
                  placeholder="Долгота"
                  value={draft.targetLng ?? ''}
                  disabled={!isEditing}
                  onChange={(event) => setDraft({ ...draft, targetLng: event.target.value })}
                />
              </div>
              <div className="detail-geo">
                <MapPin size={16} />
                <span>{draft.targetGeoLabel || draft.location}</span>
                {draft.targetLat && draft.targetLng ? (
                  <small>
                    ({draft.targetLat}, {draft.targetLng})
                  </small>
                ) : null}
              </div>
            </article>

            <article className="detail-block">
              <p>Прикрепление медиа / карты</p>
              {isEditing ? (
                <input className="inforg-input" type="file" accept="image/*" onChange={(event) => handlePhotoUpload(event.target.files?.[0])} />
              ) : null}
              <div className="map-skeleton">
                <MapPin size={36} />
                <p>Интеграция с картой будет подключена в следующем этапе.</p>
              </div>
            </article>
          </div>
        </Panel>
      ) : null}
    </div>
  )
}
