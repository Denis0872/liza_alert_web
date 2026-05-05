import { CheckCircle2, CircleDot, Flame, PauseCircle, Pencil } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import type { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { PageHeader } from '../components/ui/PageHeader'
import { Panel } from '../components/ui/Panel'
import { type SearchSession, type SessionStatus } from '../data/inforg'
import { getSearches, saveSearches, subscribeInforgStore } from '../data/inforgStore'

type StatusTab = 'all' | SessionStatus

type CreateSearchForm = {
  title: string
  location: string
  coordinator: string
  status: SessionStatus
  summary: string
  tags: string
}

const statusTabs: Array<{ value: StatusTab; label: string }> = [
  { value: 'all', label: 'Все' },
  { value: 'critical', label: 'Горящие' },
  { value: 'active', label: 'Активные' },
  { value: 'passive', label: 'Пассивные' },
  { value: 'completed', label: 'Выполненные' },
]

const statusOrder: Record<SessionStatus, number> = {
  critical: 0,
  active: 1,
  passive: 2,
  completed: 3,
}

const statusMeta: Record<SessionStatus, { label: string; icon: ReactElement }> = {
  critical: { label: 'Горящий', icon: <Flame size={15} /> },
  active: { label: 'Активный', icon: <CircleDot size={15} /> },
  passive: { label: 'Пассивный', icon: <PauseCircle size={15} /> },
  completed: { label: 'Выполнена', icon: <CheckCircle2 size={15} /> },
}

const initialForm: CreateSearchForm = {
  title: '',
  location: '',
  coordinator: '',
  status: 'active',
  summary: '',
  tags: '',
}

const PAGE_SIZE = 9

export function SearchesPage() {
  const navigate = useNavigate()
  const [searches, setSearches] = useState<SearchSession[]>(() => getSearches())
  const [editingId, setEditingId] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<StatusTab>('all')
  const [query, setQuery] = useState('')
  const [isCreateOpen, setCreateOpen] = useState(false)
  const [form, setForm] = useState<CreateSearchForm>(initialForm)
  const [newTag, setNewTag] = useState('')
  const [page, setPage] = useState(1)
  const [isEditing, setEditing] = useState(false)
  const [draft, setDraft] = useState<SearchSession | null>(null)

  useEffect(() => subscribeInforgStore(() => setSearches(getSearches())), [])
  useEffect(() => setPage(1), [statusFilter, query])

  const sortedFiltered = useMemo(() => {
    const filtered = searches.filter((search) => {
      const statusMatch = statusFilter === 'all' || search.status === statusFilter
      const q = query.trim().toLowerCase()
      const queryMatch =
        q.length === 0 ||
        search.id.toLowerCase().includes(q) ||
        search.title.toLowerCase().includes(q) ||
        search.location.toLowerCase().includes(q)
      return statusMatch && queryMatch
    })

    return filtered.sort((a, b) => {
      if (statusOrder[a.status] !== statusOrder[b.status]) return statusOrder[a.status] - statusOrder[b.status]
      return b.updatedAt.localeCompare(a.updatedAt)
    })
  }, [query, searches, statusFilter])

  const totalPages = Math.max(1, Math.ceil(sortedFiltered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pagedItems = sortedFiltered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const active = editingId ? searches.find((item) => item.id === editingId) ?? null : null

  useEffect(() => {
    if (!active) {
      setDraft(null)
      setEditing(false)
      return
    }
    setDraft(active)
    setEditing(false)
    setNewTag('')
  }, [editingId, active?.updatedAt])

  const patchSearch = (id: string, patch: Partial<SearchSession>) => {
    const now = new Date().toLocaleString('ru-RU')
    const next = searches.map((search) => (search.id === id ? { ...search, ...patch, updatedAt: now } : search))
    setSearches(next)
    saveSearches(next)
  }

  const createSearch = () => {
    const title = form.title.trim()
    const location = form.location.trim()
    const coordinator = form.coordinator.trim()
    const summary = form.summary.trim()
    if (!title || !location || !coordinator || !summary) return

    const now = new Date().toLocaleString('ru-RU')
    const primitiveTags = form.tags
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)

    const nextSearch: SearchSession = {
      id: `SES-${Date.now().toString().slice(-5)}`,
      title,
      location,
      coordinator,
      summary,
      status: form.status,
      tags: primitiveTags,
      createdAt: now,
      updatedAt: now,
      targetName: title.replace(/^Поиск\s*/i, ''),
      targetDescription: summary,
      targetGeoLabel: location,
    }

    const next = [nextSearch, ...searches]
    setSearches(next)
    saveSearches(next)
    setForm(initialForm)
    setCreateOpen(false)
  }

  const saveDraft = () => {
    if (!draft) return
    patchSearch(draft.id, draft)
    setEditing(false)
  }

  return (
    <Panel>
      <PageHeader
        title="Поиски"
        description="Сюда попадают одобренные заявки и созданные вручную поиски."
        actions={
          <Button type="button" onClick={() => setCreateOpen(true)}>
            Создать поиск вручную
          </Button>
        }
      />

      <div className="inforg-toolbar multi-row">
        <input
          className="inforg-input"
          placeholder="Поиск: id, название, локация"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="status-tabs">
          {statusTabs.map((tab) => (
            <button
              key={tab.value}
              className={`status-tab ${statusFilter === tab.value ? 'active' : ''}`}
              onClick={() => setStatusFilter(tab.value)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="session-cards">
        {pagedItems.map((search) => (
          <article className={`session-card ${search.status}`} key={search.id} onClick={() => navigate(`/app/searches/${search.id}`)}>
            <div className="session-head">
              <strong>{search.title}</strong>
              <div className="card-head-actions">
                <button
                  type="button"
                  className="card-edit-btn"
                  aria-label="Изменить поиск"
                  onClick={(event) => {
                    event.stopPropagation()
                    setEditingId(search.id)
                  }}
                >
                  <Pencil size={14} />
                </button>
                <span className={`status-icon-badge ${search.status}`} aria-label={statusMeta[search.status].label}>
                  {statusMeta[search.status].icon}
                  <span className="status-hover-label">{statusMeta[search.status].label}</span>
                </span>
              </div>
            </div>
            <p>{search.location}</p>
            <small>Обновлено: {search.updatedAt}</small>
            <div className="tag-list compact">
              {search.tags.map((tag) => (
                <span className="tag-chip" key={`${search.id}-${tag}`}>
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
        {pagedItems.length === 0 ? (
          <p className="empty-note">Поиски не найдены.</p>
        ) : null}
      </div>

      {sortedFiltered.length > PAGE_SIZE ? (
        <div className="pagination-row">
          <Button type="button" variant="secondary" disabled={currentPage <= 1} onClick={() => setPage((prev) => Math.max(1, prev - 1))}>
            Назад
          </Button>
          <span>
            Страница {currentPage} из {totalPages}
          </span>
          <Button
            type="button"
            variant="secondary"
            disabled={currentPage >= totalPages}
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
          >
            Вперед
          </Button>
        </div>
      ) : null}

      {active && draft ? (
        <div className="inforg-modal-backdrop" role="presentation" onClick={() => setEditingId(null)}>
          <div className="inforg-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <div className="inforg-modal-head">
              <h2>Редактирование карточки поиска</h2>
              <div className="inline-controls">
                {!isEditing ? (
                  <Button type="button" onClick={() => setEditing(true)}>
                    Редактировать
                  </Button>
                ) : null}
                <Button type="button" variant="secondary" onClick={() => setEditingId(null)}>
                  Закрыть
                </Button>
              </div>
            </div>

            <div className="details-stack">
              <article className="detail-block">
                <h3>Настройка информации о поиске</h3>
                <label htmlFor="search-title">Название</label>
                <input
                  id="search-title"
                  className="inforg-input"
                  value={draft.title}
                  disabled={!isEditing}
                  onChange={(event) => setDraft({ ...draft, title: event.target.value })}
                />
                <label htmlFor="search-location">Локация</label>
                <input
                  id="search-location"
                  className="inforg-input"
                  value={draft.location}
                  disabled={!isEditing}
                  onChange={(event) => setDraft({ ...draft, location: event.target.value })}
                />
                <label htmlFor="search-coordinator">Координатор</label>
                <input
                  id="search-coordinator"
                  className="inforg-input"
                  value={draft.coordinator}
                  disabled={!isEditing}
                  onChange={(event) => setDraft({ ...draft, coordinator: event.target.value })}
                />
                <label htmlFor="search-status">Статус</label>
                <select
                  id="search-status"
                  className="inforg-select"
                  value={draft.status}
                  disabled={!isEditing}
                  onChange={(event) => setDraft({ ...draft, status: event.target.value as SessionStatus })}
                >
                  <option value="passive">Пассивный</option>
                  <option value="active">Активный</option>
                  <option value="critical">Горящий</option>
                  <option value="completed">Выполнена</option>
                </select>
                <label htmlFor="search-summary">Описание</label>
                <textarea
                  id="search-summary"
                  className="inforg-textarea"
                  value={draft.summary}
                  disabled={!isEditing}
                  onChange={(event) => setDraft({ ...draft, summary: event.target.value })}
                />
              </article>

              <article className="detail-block">
                <p>Теги (примитивно)</p>
                <div className="tag-list">
                  {draft.tags.map((tag) => (
                    <button
                      className="tag-chip removable"
                      key={`${draft.id}-${tag}`}
                      onClick={() => isEditing && setDraft({ ...draft, tags: draft.tags.filter((item) => item !== tag) })}
                      type="button"
                      disabled={!isEditing}
                    >
                      {tag} ×
                    </button>
                  ))}
                </div>
                {isEditing ? (
                  <div className="inline-controls">
                    <input
                      className="inforg-input"
                      placeholder="Новый тег"
                      value={newTag}
                      onChange={(event) => setNewTag(event.target.value)}
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        const tag = newTag.trim()
                        if (!tag || draft.tags.includes(tag)) return
                        setDraft({ ...draft, tags: [...draft.tags, tag] })
                        setNewTag('')
                      }}
                    >
                      Добавить
                    </Button>
                  </div>
                ) : null}
              </article>

              {isEditing ? (
                <div className="inline-controls modal-actions">
                  <Button type="button" onClick={saveDraft}>
                    Сохранить
                  </Button>
                  <Button type="button" variant="secondary" onClick={() => { setDraft(active); setEditing(false); }}>
                    Отменить
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      {isCreateOpen ? (
        <div className="inforg-modal-backdrop" role="presentation" onClick={() => setCreateOpen(false)}>
          <div className="inforg-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <div className="inforg-modal-head">
              <h2>Новый поиск</h2>
              <Button type="button" variant="secondary" onClick={() => setCreateOpen(false)}>
                Закрыть
              </Button>
            </div>
            <div className="details-stack">
              <article className="detail-block">
                <label htmlFor="create-title">Название</label>
                <input
                  id="create-title"
                  className="inforg-input"
                  value={form.title}
                  onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
                />
                <label htmlFor="create-location">Локация</label>
                <input
                  id="create-location"
                  className="inforg-input"
                  value={form.location}
                  onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))}
                />
                <label htmlFor="create-coordinator">Координатор</label>
                <input
                  id="create-coordinator"
                  className="inforg-input"
                  value={form.coordinator}
                  onChange={(event) => setForm((prev) => ({ ...prev, coordinator: event.target.value }))}
                />
                <label htmlFor="create-status">Статус</label>
                <select
                  id="create-status"
                  className="inforg-select"
                  value={form.status}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, status: event.target.value as SessionStatus }))
                  }
                >
                  <option value="passive">Пассивный</option>
                  <option value="active">Активный</option>
                  <option value="critical">Горящий</option>
                  <option value="completed">Выполнена</option>
                </select>
                <label htmlFor="create-summary">Описание</label>
                <textarea
                  id="create-summary"
                  className="inforg-textarea"
                  value={form.summary}
                  onChange={(event) => setForm((prev) => ({ ...prev, summary: event.target.value }))}
                />
                <label htmlFor="create-tags">Теги (через запятую)</label>
                <input
                  id="create-tags"
                  className="inforg-input"
                  value={form.tags}
                  onChange={(event) => setForm((prev) => ({ ...prev, tags: event.target.value }))}
                />
                <Button type="button" onClick={createSearch}>
                  Создать поиск
                </Button>
              </article>
            </div>
          </div>
        </div>
      ) : null}
    </Panel>
  )
}
