import { ButtonLink } from '../components/ui/Button'

export function NotFoundPage() {
  return (
    <div className="public-shell">
      <div className="single-panel">
        <h1>Страница не найдена</h1>
        <p>Проверьте адрес или вернитесь на главную страницу.</p>
        <ButtonLink to="/">Вернуться</ButtonLink>
      </div>
    </div>
  )
}
