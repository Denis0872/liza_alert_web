import { useMemo } from "react"
import { useParams } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollNavigationMenu } from "@/components/ui/scroll-navigation-menu"

const contentMap: Record<string, { title: string; description: string }> = {
  publications: {
    title: "Публикации",
    description: "Здесь будут материалы отряда, статьи, инструкции и полезные публикации.",
  },
  about: {
    title: "О нас",
    description: "Раздел о миссии отряда, принципах работы, команде и истории движения.",
  },
  newcomers: {
    title: "Новичкам",
    description: "Стартовый раздел для новых добровольцев: с чего начать и как подготовиться.",
  },
  safety: {
    title: "Правила безопасности",
    description: "Базовые правила поведения в городе и на природе для снижения рисков.",
  },
}

export function PublicSectionPage() {
  const { slug } = useParams()
  const content = useMemo(() => contentMap[slug ?? ""] ?? null, [slug])

  return (
    <div className="public-shell">
      <div className="public-overlay" />
      <ScrollNavigationMenu />
      <section className="landing-section">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>{content?.title ?? "Раздел не найден"}</CardTitle>
            <CardDescription>
              {content?.description ?? "Проверьте адрес раздела или перейдите на главную страницу."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Контент раздела будет расширяться по мере наполнения MVP. Сейчас это структурная
              точка навигации в публичной части сайта.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
