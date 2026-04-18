import { Link, useParams, useSearchParams } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollNavigationMenu } from "@/components/ui/scroll-navigation-menu"
import { StateBlock } from "@/components/ui/StateBlock"
import { demoNews, getNewsById } from "@/data/news"
import { cn } from "@/lib/utils"

export function NewsDetailsPage() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const state = searchParams.get("state")
  const item = id ? getNewsById(id) : undefined
  const related = demoNews.filter((entry) => entry.id !== id).slice(0, 3)

  return (
    <div className="public-shell">
      <div className="public-overlay" />
      <ScrollNavigationMenu />

      <section className="landing-section">
        {state === "loading" ? (
          <StateBlock
            description="Подгружаем текст новости и связанные материалы."
            kind="loading"
            title="Загрузка новости"
          />
        ) : state === "error" ? (
          <StateBlock
            description="Не удалось загрузить материал. Попробуйте открыть страницу еще раз."
            kind="error"
            title="Ошибка загрузки"
          />
        ) : !item ? (
          <StateBlock
            description="Новость не найдена. Возможно, ссылка устарела."
            kind="empty"
            title="Материал отсутствует"
          />
        ) : (
          <Card className="bg-white">
            <CardHeader>
              <div className="hero-actions">
                <Badge variant="outline">{item.date}</Badge>
                <Badge variant="secondary">Новость отряда</Badge>
              </div>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.excerpt}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {item.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </CardContent>
          </Card>
        )}
      </section>

      <section className="landing-section">
        <div className="section-head">
          <h2>Связанные новости</h2>
        </div>
        <div className="news-grid">
          {related.map((entry) => (
            <Card className="bg-white" key={entry.id}>
              <CardHeader>
                <CardDescription>{entry.date}</CardDescription>
                <CardTitle>{entry.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{entry.excerpt}</p>
                <Link className={cn(buttonVariants({ variant: "outline" }), "mt-3")} to={`/news/${entry.id}`}>
                  Читать
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
