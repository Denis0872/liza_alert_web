import { Button } from '../components/ui/Button'
import { PageHeader } from '../components/ui/PageHeader'
import { Panel } from '../components/ui/Panel'

const notifications = [
  'Актив начат: Приморский район. Нужны 2 экипажа.',
  'Координатор обновил зону поиска для группы #4.',
  'Новая заявка прошла модерацию и добавлена в актив.',
]

export function NotificationsPage() {
  return (
    <Panel>
      <PageHeader
        description="В MVP здесь будет лента событий и переход к нужному поиску."
        title="Уведомления"
      />
      <div className="list">
        {notifications.map((message) => (
          <article className="list-item" key={message}>
            <p className="list-main">{message}</p>
            <Button type="button" variant="secondary">
              Перейти
            </Button>
          </article>
        ))}
      </div>
    </Panel>
  )
}
