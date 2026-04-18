import { Link } from "react-router-dom"
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from "@/lib/utils"
import { TextInput } from '../components/ui/TextInput'

export function ApplyPage() {
  return (
    <div className="public-shell">
      <div className="public-overlay" />
      <main className="single-panel">
        <h1>Подача заявки</h1>
        <p>
          MVP-скелет. На следующем этапе здесь будет пошаговая форма: данные пропавшего,
          обстоятельства, контакты заявителя.
        </p>
        <div className="form-grid">
          <TextInput label="ФИО пропавшего" placeholder="Например: Иванов Сергей Петрович" />
          <TextInput label="Возраст" placeholder="Например: 64" type="number" />
          <TextInput label="Последнее место" placeholder="Например: Приморский район, ул. ... " />
          <TextInput label="Телефон заявителя" placeholder="+7..." type="tel" />
        </div>
        <div className="hero-actions">
          <Button type="button">Отправить заявку</Button>
          <Link className={cn(buttonVariants({ variant: "secondary", size: "lg" }))} to="/">
            На главную
          </Link>
        </div>
      </main>
    </div>
  )
}
