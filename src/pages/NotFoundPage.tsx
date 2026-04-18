import { Link } from "react-router-dom"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function NotFoundPage() {
  return (
    <div className="public-shell">
      <div className="single-panel">
        <h1>Страница не найдена</h1>
        <p>Проверьте адрес или вернитесь на главную страницу.</p>
        <Link className={cn(buttonVariants({ size: "lg" }))} to="/">
          Вернуться
        </Link>
      </div>
    </div>
  )
}
