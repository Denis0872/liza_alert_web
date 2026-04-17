import { ArrowRight, HeartHandshake, ShieldAlert, Users } from 'lucide-react'
import { ButtonLink } from '../components/ui/Button'

const newsItems = [
  {
    title: 'Набор в группу прозвона',
    date: '17 апреля 2026',
    excerpt: 'Открыт набор добровольцев, готовых помогать на этапе первичного сбора информации.',
  },
  {
    title: 'Вводная лекция для новичков',
    date: '16 апреля 2026',
    excerpt: 'Короткий вводный поток по ролям, безопасности и базовым действиям в первые часы поиска.',
  },
  {
    title: 'Памятка: если пропал человек',
    date: '15 апреля 2026',
    excerpt: 'Собрали базовые шаги для родственников: кого уведомить, что подготовить, куда обращаться.',
  },
]

const faqItems = [
  {
    question: 'Что делать, если пропал близкий человек?',
    answer:
      'Сразу подайте заявление в полицию и оставьте заявку в отряде. Не ждите 24 часа. Подготовьте фото, особые приметы и последние известные данные.',
  },
  {
    question: 'Как стать добровольцем?',
    answer:
      'Перейдите в рабочую зону, выберите роль добровольца и заполните короткую анкету. После этого получите базовые инструкции и доступ к активам.',
  },
  {
    question: 'Кому доступна информация о поиске?',
    answer:
      'В MVP показывается только необходимый минимум данных. Чувствительная информация и внутренние маршруты ограничены рабочей зоной.',
  },
]

export function LandingPage() {
  return (
    <div className="public-shell">
      <div className="public-overlay" />
      <header className="public-header public-header-strong">
        <div className="brand">
          <img alt="ЛизаАлерт" className="brand-logo" src="/lizaalert-logo.svg" />
          <div>
            <p className="brand-name">Liza Alert</p>
            <p className="brand-sub">Санкт-Петербург и ЛО</p>
          </div>
        </div>
        <nav className="public-menu">
          <a href="#news">Новости</a>
          <a href="#faq">FAQ</a>
          <a href="#contacts">Контакты</a>
        </nav>
        <div className="public-nav">
          <ButtonLink to="/app/dashboard" variant="secondary">
            Рабочая зона
          </ButtonLink>
          <ButtonLink to="/apply">Оставить заявку</ButtonLink>
        </div>
      </header>

      <main className="hero">
        <section className="hero-copy">
          <p className="eyebrow">MVP Первая версия</p>
          <h1>Простой интерфейс для родственников, добровольцев и координаторов.</h1>
          <p>
            На старте родственник может оставить заявку на поиск, а доброволец быстро перейти в
            рабочий режим и отметить готовность к выезду.
          </p>
          <div className="hero-actions">
            <ButtonLink to="/apply">
              Подать заявку
              <ArrowRight size={18} />
            </ButtonLink>
            <ButtonLink to="/app/dashboard" variant="secondary">
              Я доброволец
            </ButtonLink>
          </div>
          <div className="hotline-strip">
            <strong>Горячая линия:</strong>
            <span>8 800 700 54 52</span>
          </div>
        </section>
        <section className="hero-cards">
          <article className="metric-card">
            <ShieldAlert size={18} />
            <h3>Активные поиски</h3>
            <strong>12</strong>
          </article>
          <article className="metric-card">
            <Users size={18} />
            <h3>На смене</h3>
            <strong>168</strong>
          </article>
          <article className="metric-card">
            <HeartHandshake size={18} />
            <h3>Новые заявки</h3>
            <strong>4</strong>
          </article>
        </section>
      </main>

      <section className="landing-section" id="news">
        <div className="section-head">
          <h2>Примитивная лента новостей</h2>
          <a href="https://lizaalert.org/novosti-otryada/" rel="noreferrer" target="_blank">
            Все новости
          </a>
        </div>
        <div className="news-grid">
          {newsItems.map((item) => (
            <article className="news-card" key={item.title}>
              <span>{item.date}</span>
              <h3>{item.title}</h3>
              <p>{item.excerpt}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section" id="faq">
        <div className="section-head">
          <h2>Что делать (FAQ)</h2>
        </div>
        <div className="faq-list">
          {faqItems.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="landing-footer" id="contacts">
        <p>Для СМИ: smi@lizaalert.org</p>
        <p>Для партнёрства: DMS@lizaalert.org</p>
        <p>Общие вопросы: org@lizaalert.org</p>
      </footer>
    </div>
  )
}
