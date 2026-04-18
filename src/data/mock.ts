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

export type SearchPersonDetails = {
  id: string
  fullName: string
  age: number
  district: string
  status: SearchStatus
  photoUrl: string
  description: string
  specialSigns: string[]
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

const detailsMap: Record<string, SearchPersonDetails> = {
  "LA-2451": {
    id: "LA-2451",
    fullName: "Иванов Сергей Петрович",
    age: 64,
    district: "Приморский район",
    status: "ACTIVE",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    description:
      "Ушел из дома утром 17 апреля. Был одет в темно-синюю куртку и серую шапку. Может быть дезориентирован, при себе телефон без ответа.",
    specialSigns: ["Рост 178 см", "Седые волосы", "Темные очки в тонкой оправе"],
  },
  "LA-2452": {
    id: "LA-2452",
    fullName: "Крылова Мария Андреевна",
    age: 12,
    district: "Выборгский район",
    status: "ACTIVE",
    photoUrl: "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?auto=format&fit=crop&w=600&q=80",
    description:
      "Не вернулась домой после школы. Последний раз видели у автобусной остановки у станции метро. Возможно, направлялась в сторону парка.",
    specialSigns: ["Рост 154 см", "Русые волосы", "Черный рюкзак с белой полосой"],
  },
  "LA-2448": {
    id: "LA-2448",
    fullName: "Смирнов Алексей Игоревич",
    age: 48,
    district: "Гатчина",
    status: "AUTONOMOUS",
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
    description:
      "Поиск переведен в автономный режим. Последний контакт был в лесном массиве у садоводства. Требуется проверка точек и опрос очевидцев.",
    specialSigns: ["Рост 183 см", "Короткая стрижка", "Камуфляжная куртка"],
  },
}

export function getSearchDetails(id: string): SearchPersonDetails | undefined {
  return detailsMap[id]
}
