export type RequestStatus = 'new' | 'in_review' | 'rejected' | 'converted_to_session'
export type SessionStatus = 'passive' | 'active' | 'critical' | 'completed'

export type InforgTag = {
  id: string
  name: string
  color: string
  scope: 'request' | 'session' | 'both'
  isActive: boolean
}

export type InforgRequest = {
  id: string
  createdAt: string
  applicantName: string
  applicantPhone: string
  missingPersonName: string
  missingPersonAge?: number
  lastSeenLocation: string
  description: string
  source: 'web' | 'tg' | 'vk' | 'phone'
  status: RequestStatus
  reviewComment?: string
}

export type SearchSession = {
  id: string
  title: string
  createdAt: string
  updatedAt: string
  status: SessionStatus
  location: string
  coordinator: string
  summary: string
  tags: string[]
  requestId?: string
  targetName: string
  targetAge?: number
  targetDescription: string
  targetPhotoUrl?: string
  targetGeoLabel?: string
  targetLat?: string
  targetLng?: string
}

export const requestStatusLabel: Record<RequestStatus, string> = {
  new: 'Новая',
  in_review: 'На проверке',
  rejected: 'Отклонена',
  converted_to_session: 'Переведена в поиск',
}

export const inforgTagsMock: InforgTag[] = [
  { id: 'tg-1', name: 'дезориентация', color: '#d97706', scope: 'both', isActive: true },
  { id: 'tg-2', name: 'лес', color: '#166534', scope: 'session', isActive: true },
  { id: 'tg-3', name: 'город', color: '#0f766e', scope: 'both', isActive: true },
  { id: 'tg-4', name: 'ночь', color: '#1d4ed8', scope: 'both', isActive: true },
]

export const inforgRequestsMock: InforgRequest[] = [
  {
    id: 'REQ-1001',
    createdAt: '05.05.2026 09:12',
    applicantName: 'Елена Смирнова',
    applicantPhone: '+7 921 555-11-02',
    missingPersonName: 'Смирнов Павел Алексеевич',
    missingPersonAge: 72,
    lastSeenLocation: 'СПб, Приморский район, ул. Савушкина',
    description: 'Ушел утром в магазин, домой не вернулся. Может быть дезориентирован.',
    source: 'web',
    status: 'new',
  },
  {
    id: 'REQ-1002',
    createdAt: '05.05.2026 08:41',
    applicantName: 'Иван Орлов',
    applicantPhone: '+7 911 222-19-11',
    missingPersonName: 'Орлова Мария Ивановна',
    missingPersonAge: 15,
    lastSeenLocation: 'ЛО, Всеволожск, ж/д станция Бернгардовка',
    description: 'Не пришла домой после школы, телефон выключен.',
    source: 'tg',
    status: 'in_review',
    reviewComment: 'Ожидаем уточнение по одежде.',
  },
  {
    id: 'REQ-1003',
    createdAt: '04.05.2026 21:05',
    applicantName: 'Сергей Волков',
    applicantPhone: '+7 921 777-43-33',
    missingPersonName: 'Волков Артем Сергеевич',
    missingPersonAge: 41,
    lastSeenLocation: 'ЛО, Тосненский район, садоводство Лесное',
    description: 'Уехал в лес, связь пропала.',
    source: 'phone',
    status: 'rejected',
    reviewComment: 'Заявка дублирует REQ-998.',
  },
]

export const inforgSessionsMock: SearchSession[] = [
  {
    id: 'SES-3012',
    title: 'Поиск Смирнов П.А., Приморский район',
    createdAt: '05.05.2026 10:02',
    updatedAt: '05.05.2026 10:16',
    status: 'critical',
    location: 'СПб, Приморский район',
    coordinator: 'Коорд. Анна К.',
    summary: 'Срочный городской поиск. Нужны экипажи и проверка камер.',
    tags: ['город', 'дезориентация'],
    requestId: 'REQ-1001',
    targetName: 'Смирнов Павел Алексеевич',
    targetAge: 72,
    targetDescription: 'Дезориентирован, возможны проблемы с памятью.',
    targetPhotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    targetGeoLabel: 'Последняя точка: ул. Савушкина, д. 14',
    targetLat: '59.98705',
    targetLng: '30.25413',
  },
  {
    id: 'SES-3011',
    title: 'Поиск Орлова М.И., Всеволожск',
    createdAt: '05.05.2026 09:01',
    updatedAt: '05.05.2026 09:50',
    status: 'active',
    location: 'ЛО, Всеволожск',
    coordinator: 'Коорд. Дмитрий Р.',
    summary: 'Работа по свидетельствам, осмотр маршрута школа-дом.',
    tags: ['город', 'ночь'],
    requestId: 'REQ-1002',
    targetName: 'Орлова Мария Ивановна',
    targetAge: 15,
    targetDescription: 'Школьная форма, черный рюкзак, телефон выключен.',
    targetPhotoUrl: 'https://images.unsplash.com/photo-1481214110143-ed630356e1bb?auto=format&fit=crop&w=600&q=80',
    targetGeoLabel: 'Станция Бернгардовка',
    targetLat: '60.01542',
    targetLng: '30.64588',
  },
  {
    id: 'SES-3004',
    title: 'Поиск Волков А.С., Тосненский район',
    createdAt: '04.05.2026 19:44',
    updatedAt: '05.05.2026 07:10',
    status: 'completed',
    location: 'ЛО, Тосненский район',
    coordinator: 'Коорд. Ольга П.',
    summary: 'Поиск завершен, человек найден.',
    tags: ['лес'],
    targetName: 'Волков Артем Сергеевич',
    targetAge: 41,
    targetDescription: 'В камуфляжной куртке, мог уйти в лесной массив.',
    targetGeoLabel: 'СНТ Лесное',
    targetLat: '59.50312',
    targetLng: '30.86342',
  },
]
