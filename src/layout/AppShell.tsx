import {
  Bell,
  ClipboardList,
  ChevronRight,
  Home,
  LayoutGrid,
  ListChecks,
  Megaphone,
  UserRound,
} from 'lucide-react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const items = [
  { to: '/app/dashboard', label: 'Панель', icon: LayoutGrid },
  { to: '/app/searches', label: 'Поиски', icon: ListChecks },
  { to: '/app/notifications', label: 'Уведомления', icon: Bell },
  { to: '/app/inforg/requests', label: 'Заявки', icon: ClipboardList },
  { to: '/app/profile', label: 'Профиль', icon: UserRound },
]

export function AppShell() {
  const { pathname } = useLocation()
  const showReadyButton = pathname === '/app/dashboard'

  return (
    <div className="frame">
      <aside className="sidebar">
        <Link className="brand" to="/">
          <img alt="ЛизаАлерт" className="brand-logo brand-logo-compact" src="/lizaalert-logo.svg" />
          <div>
            <p className="brand-name">Liza Alert</p>
            <p className="brand-sub">MVP Frontend</p>
          </div>
        </Link>
        <nav className="menu">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                className={({ isActive }) => `menu-link ${isActive ? 'is-active' : ''}`}
                key={item.to}
                to={item.to}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                <ChevronRight size={16} />
              </NavLink>
            )
          })}
        </nav>
        <a className="volunteer-cta" href="/">
          <Megaphone size={18} />
          Перейти в публичный режим
        </a>
      </aside>
      <main className="workspace">
        <header className="topbar">
          <div className="crumbs">
            <Home size={16} />
            <span>Главная</span>
            <ChevronRight size={14} />
            <strong>MVP Скелет</strong>
          </div>
          {showReadyButton ? <Button type="button">Я готов выехать</Button> : null}
        </header>
        <section className="content">
          <Outlet />
        </section>
      </main>
    </div>
  )
}
