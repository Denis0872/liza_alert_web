import { PageHeader } from '../components/ui/PageHeader'
import { Panel } from '../components/ui/Panel'
import { StatCard } from '../components/ui/StatCard'

export function ProfilePage() {
  return (
    <Panel>
      <PageHeader
        description="Скелет профиля: статистика, роль, доступность, история участий."
        title="Профиль добровольца"
      />
      <div className="stat-row">
        <StatCard label="Участий" value="12" />
        <StatCard label="Пеший" value="8" />
        <StatCard label="Экипаж" value="4" />
        <StatCard label="Ценный волонтер" value="3" />
      </div>
    </Panel>
  )
}
