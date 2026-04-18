import { Link, useSearchParams } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollNavigationMenu } from "@/components/ui/scroll-navigation-menu"
import { StateBlock } from "@/components/ui/StateBlock"
import { cn } from "@/lib/utils"
import { demoNews } from "@/data/news"

export function NewsPage() {
  const [searchParams] = useSearchParams()
  const state = searchParams.get("state")
  const visibleNews = state === "empty" ? [] : demoNews

  return (
    <div className="public-shell">
      <div className="public-overlay" />
      <ScrollNavigationMenu />

      <section className="landing-section">
        <div className="section-head">
          <h2>Новости отряда</h2>
          <Badge variant="outline">Архив MVP</Badge>
        </div>
        {state === "loading" ? (
          <StateBlock
            description="Получаем последние публикации и архив новостей."
            kind="loading"
            title="Загрузка новостей"
          />
        ) : state === "error" ? (
          <StateBlock
            description="Не удалось получить список новостей. Попробуйте обновить страницу."
            kind="error"
            title="Ошибка загрузки"
          />
        ) : visibleNews.length === 0 ? (
          <StateBlock
            description="Сейчас нет опубликованных новостей. Проверьте позже."
            kind="empty"
            title="Пустая лента"
          />
        ) : (
          <div className="news-page-grid">
            {visibleNews.map((item) => (
              <Card className="bg-white" key={item.id}>
                <CardHeader>
                  <CardDescription>{item.date}</CardDescription>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{item.excerpt}</p>
                  <Link className={cn(buttonVariants({ variant: "outline" }), "mt-3")} to={`/news/${item.id}`}>
                    Читать
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
