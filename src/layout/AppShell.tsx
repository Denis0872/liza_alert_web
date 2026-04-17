import {
  Bell,
  ChevronRight,
  Home,
  LayoutGrid,
  ListChecks,
  Megaphone,
  UserRound,
} from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { Button } from '../components/ui/Button'

const items = [
  { to: '/app/dashboard', label: 'Панель', icon: LayoutGrid },
  { to: '/app/searches', label: 'Поиски', icon: ListChecks },
  { to: '/app/notifications', label: 'Уведомления', icon: Bell },
  { to: '/app/profile', label: 'Профиль', icon: UserRound },
]

export function AppShell() {
  return (
    <div className="frame">
      <aside className="sidebar">
        <div className="brand">
          <img alt="ЛизаАлерт" className="brand-logo brand-logo-compact" src="/lizaalert-logo.svg" />
          <div>
            <p className="brand-name">Liza Alert</p>
            <p className="brand-sub">MVP Frontend</p>
          </div>
        </div>
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
          <Button type="button">Я готов выехать</Button>
        </header>
        <section className="content">
          <Outlet />
        </section>
      </main>
    </div>
  )
}
