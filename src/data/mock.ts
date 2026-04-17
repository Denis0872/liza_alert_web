export type SearchStatus = 'ACTIVE' | 'AUTONOMOUS' | 'DONE'

export type SearchCard = {
  id: string
  title: string
  age: number
  district: string
  startedAt: string
  volunteers: number
  status: SearchStatus
}

export const demoSearches: SearchCard[] = [
  {
    id: 'LA-2451',
    title: 'Иванов Сергей',
    age: 64,
    district: 'Приморский район',
    startedAt: '17.04.2026 06:40',
    volunteers: 23,
    status: 'ACTIVE',
  },
  {
    id: 'LA-2452',
    title: 'Крылова Мария',
    age: 12,
    district: 'Выборгский район',
    startedAt: '17.04.2026 09:15',
    volunteers: 31,
    status: 'ACTIVE',
  },
  {
    id: 'LA-2448',
    title: 'Смирнов Алексей',
    age: 48,
    district: 'Гатчина',
    startedAt: '16.04.2026 21:03',
    volunteers: 12,
    status: 'AUTONOMOUS',
  },
]

export const statusLabel: Record<SearchStatus, string> = {
  ACTIVE: 'Актив',
  AUTONOMOUS: 'Автоном',
  DONE: 'Завершен',
}
