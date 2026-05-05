import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/ui/PageHeader'
import { Panel } from '@/components/ui/Panel'
import { type InforgRequest, requestStatusLabel, type RequestStatus, type SessionStatus } from '@/data/inforg'
import { convertRequestToSearch, getRequests, saveRequests, subscribeInforgStore } from '@/data/inforgStore'

const filterableStatuses: Array<{ value: 'all' | RequestStatus; label: string }> = [
  { value: 'all', label: 'Все' },
  { value: 'new', label: 'Новые' },
  { value: 'in_review', label: 'На проверке' },
  { value: 'converted_to_session', label: 'В поиске' },
  { value: 'rejected', label: 'Отклоненные' },
]

export function InforgRequestsPage() {
  const [requests, setRequests] = useState<InforgRequest[]>(() => getRequests())
  const [statusFilter, setStatusFilter] = useState<'all' | RequestStatus>('all')
  const [query, setQuery] = useState('')
  const [activeId, setActiveId] = useState<string | null>(null)
  const [convertStatus, setConvertStatus] = useState<SessionStatus>('active')

  useEffect(() => subscribeInforgStore(() => setRequests(getRequests())), [])

  const filtered = useMemo(() => {
    return requests.filter((item) => {
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter
      const q = query.trim().toLowerCase()
      const matchesQuery =
        q.length === 0 ||
        item.id.toLowerCase().includes(q) ||
        item.missingPersonName.toLowerCase().includes(q) ||
        item.applicantPhone.toLowerCase().includes(q) ||
        item.lastSeenLocation.toLowerCase().includes(q)
      return matchesStatus && matchesQuery
    })
  }, [query, requests, statusFilter])

  const activeRequest = activeId ? requests.find((item) => item.id === activeId) ?? null : null

  const patchRequest = (id: string, patch: Partial<InforgRequest>) => {
    const next = requests.map((item) => (item.id === id ? { ...item, ...patch } : item))
    setRequests(next)
    saveRequests(next)
  }

  const rejectRequest = (request: InforgRequest) => {
    if (request.status === 'rejected' || request.status === 'converted_to_session') return
    patchRequest(request.id, {
      status: 'rejected',
      reviewComment: request.reviewComment?.trim() || 'Отклонено инфоргом.',
    })
  }

  return (
    <Panel>
      <PageHeader title="Заявки" description="Входящие заявки для проверки и перевода в поиск." />

      <div className="inforg-toolbar">
        <input
          className="inforg-input"
          placeholder="Поиск: id, имя, телефон, локация"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select
          className="inforg-select"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value as 'all' | RequestStatus)}
        >
          {filterableStatuses.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Заявка</th>
              <th>Пропавший</th>
              <th>Источник</th>
              <th>Статус</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {filtered.map((request) => (
              <tr key={request.id}>
                <td>
                  <strong>{request.id}</strong>
                  <p>{request.createdAt}</p>
                </td>
                <td>
                  {request.missingPersonName}
                  {request.missingPersonAge ? `, ${request.missingPersonAge}` : ''}
                </td>
                <td>{request.source}</td>
                <td>
                  <span className={`rq-status rq-${request.status}`}>{requestStatusLabel[request.status]}</span>
                </td>
                <td>
                  <Button type="button" variant="secondary" onClick={() => setActiveId(request.id)}>
                    Открыть
                  </Button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5}>Ничего не найдено по текущим фильтрам.</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {activeRequest ? (
        <div className="inforg-modal-backdrop" role="presentation" onClick={() => setActiveId(null)}>
          <div className="inforg-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <div className="inforg-modal-head">
              <h2>Карточка заявки</h2>
              <Button type="button" variant="secondary" onClick={() => setActiveId(null)}>
                Закрыть
              </Button>
            </div>
            <div className="details-stack">
              <article className="detail-block">
                <strong>{activeRequest.missingPersonName}</strong>
                <p>Заявитель: {activeRequest.applicantName}</p>
                <p>Телефон: {activeRequest.applicantPhone}</p>
                <p>Локация: {activeRequest.lastSeenLocation}</p>
                <p>Описание: {activeRequest.description}</p>
              </article>

              <article className="detail-block">
                <label htmlFor="request-status">Статус заявки</label>
                <select
                  id="request-status"
                  className="inforg-select"
                  value={activeRequest.status}
                  disabled={activeRequest.status === 'rejected' || activeRequest.status === 'converted_to_session'}
                  onChange={(event) => patchRequest(activeRequest.id, { status: event.target.value as RequestStatus })}
                >
                  <option value="new">Новая</option>
                  <option value="in_review">На проверке</option>
                  <option value="converted_to_session">Переведена в поиск</option>
                  <option value="rejected">Отклонена</option>
                </select>

                <label htmlFor="convert-status">Статус нового поиска</label>
                <select
                  id="convert-status"
                  className="inforg-select"
                  value={convertStatus}
                  onChange={(event) => setConvertStatus(event.target.value as SessionStatus)}
                  disabled={activeRequest.status === 'rejected' || activeRequest.status === 'converted_to_session'}
                >
                  <option value="passive">Пассивный</option>
                  <option value="active">Активный</option>
                  <option value="critical">Горящий</option>
                  <option value="completed">Выполнена</option>
                </select>
              </article>

              <article className="detail-block">
                <label htmlFor="comment">Комментарий инфорга</label>
                <textarea
                  id="comment"
                  className="inforg-textarea"
                  value={activeRequest.reviewComment ?? ''}
                  disabled={activeRequest.status === 'rejected'}
                  onChange={(event) => patchRequest(activeRequest.id, { reviewComment: event.target.value })}
                />
              </article>

              <div className="inline-controls">
                <Button
                  type="button"
                  onClick={() => {
                    const ok = convertRequestToSearch(activeRequest.id, convertStatus)
                    if (ok) setActiveId(null)
                  }}
                  disabled={activeRequest.status === 'rejected' || activeRequest.status === 'converted_to_session'}
                >
                  Одобрить и создать поиск
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => rejectRequest(activeRequest)}
                  disabled={activeRequest.status === 'rejected' || activeRequest.status === 'converted_to_session'}
                >
                  Отклонить
                </Button>
              </div>
              {activeRequest.status === 'rejected' ? (
                <p className="warning-note">Заявка отклонена и больше не редактируется.</p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </Panel>
  )
}
