import {
  type InforgRequest,
  type SearchSession,
  type SessionStatus,
  inforgRequestsMock,
  inforgSessionsMock,
} from './inforg'

const REQUESTS_KEY = 'liza_inforg_requests'
const SEARCHES_KEY = 'liza_inforg_searches'
const CHANGE_EVENT = 'liza-inforg-store-change'

function hasWindow() {
  return typeof window !== 'undefined'
}

function readJson<T>(key: string, fallback: T): T {
  if (!hasWindow()) return fallback
  const raw = window.localStorage.getItem(key)
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function writeJson<T>(key: string, value: T) {
  if (!hasWindow()) return
  window.localStorage.setItem(key, JSON.stringify(value))
}

function emitChange() {
  if (!hasWindow()) return
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT))
}

export function subscribeInforgStore(onChange: () => void) {
  if (!hasWindow()) return () => undefined
  const handler = () => onChange()
  window.addEventListener(CHANGE_EVENT, handler)
  return () => window.removeEventListener(CHANGE_EVENT, handler)
}

export function getRequests(): InforgRequest[] {
  return readJson<InforgRequest[]>(REQUESTS_KEY, inforgRequestsMock)
}

export function saveRequests(next: InforgRequest[]) {
  writeJson(REQUESTS_KEY, next)
  emitChange()
}

export function getSearches(): SearchSession[] {
  return readJson<SearchSession[]>(SEARCHES_KEY, inforgSessionsMock)
}

export function saveSearches(next: SearchSession[]) {
  writeJson(SEARCHES_KEY, next)
  emitChange()
}

export function convertRequestToSearch(requestId: string, status: SessionStatus) {
  const requests = getRequests()
  const request = requests.find((item) => item.id === requestId)
  if (!request || request.status === 'rejected' || request.status === 'converted_to_session') return false

  const now = new Date().toLocaleString('ru-RU')
  const nextSearch: SearchSession = {
    id: `SES-${Date.now().toString().slice(-5)}`,
    title: `Поиск ${request.missingPersonName}`,
    createdAt: now,
    updatedAt: now,
    status,
    location: request.lastSeenLocation,
    coordinator: 'Не назначен',
    summary: request.description,
    tags: [],
    requestId: request.id,
    targetName: request.missingPersonName,
    targetAge: request.missingPersonAge,
    targetDescription: request.description,
    targetGeoLabel: request.lastSeenLocation,
    targetLat: '',
    targetLng: '',
  }

  const nextRequests = requests.map((item) =>
    item.id === requestId ? { ...item, status: 'converted_to_session' as const } : item,
  )
  const nextSearches = [nextSearch, ...getSearches()]

  saveRequests(nextRequests)
  saveSearches(nextSearches)
  return true
}
