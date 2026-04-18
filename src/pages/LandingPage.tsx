import { Apple, ArrowRight, BellRing, Download, HeartHandshake, ShieldAlert, Smartphone, Users } from "lucide-react"
import { Link, useSearchParams } from "react-router-dom"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ScrollNavigationMenu } from "@/components/ui/scroll-navigation-menu"
import { StateBlock } from "@/components/ui/StateBlock"
import { demoNews } from "@/data/news"
import { cn } from "@/lib/utils"

const faqItems = [
  {
    id: "item-1",
    q: "Что делать, если пропал близкий человек?",
    a: "Сразу обращайтесь в полицию и параллельно оставляйте заявку на поиск. Подготовьте фото, приметы и последние известные данные о местонахождении.",
  },
  {
    id: "item-2",
    q: "Можно ли стать добровольцем без опыта?",
    a: "Да. В MVP достаточно выбрать режим добровольца и пройти базовую инструкцию, после чего откроется доступ к рабочей зоне.",
  },
  {
    id: "item-3",
    q: "Кто видит данные поиска?",
    a: "Публичная часть показывает только безопасный минимум. Рабочие данные доступны только в защищенной зоне приложения.",
  },
]

export function LandingPage() {
  const [searchParams] = useSearchParams()
  const state = searchParams.get("state")
  const latestNews = state === "empty" ? [] : demoNews.slice(0, 3)

  return (
    <div className="public-shell">
      <div className="public-overlay" />
      <ScrollNavigationMenu />

      <main className="hero">
        <section className="hero-copy">
          <Badge className="mb-3" variant="secondary">
            MVP 0.1
          </Badge>
          <h1>Потеряться не значит пропасть.</h1>
          <p>
            Мы делаем понятный цифровой вход для родственников и рабочий интерфейс для добровольцев
            и координаторов. Без перегруженности, с фокусом на скорость действий.
          </p>
          <div className="hero-actions mt-4">
            <Link className={cn(buttonVariants({ size: "lg" }))} to="/apply">
              Подать заявку
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className="hotline-strip mt-4">
            <strong>Горячая линия:</strong>
            <span>8 800 700 54 52</span>
          </div>
        </section>

        <section className="hero-cards">
          <Card className="bg-white/90">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldAlert size={16} />
                Активные поиски
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold tracking-tight">12</p>
            </CardContent>
          </Card>
          <Card className="bg-white/90">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users size={16} />
                На смене
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold tracking-tight">168</p>
            </CardContent>
          </Card>
          <Card className="bg-white/90">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HeartHandshake size={16} />
                Новые заявки
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold tracking-tight">4</p>
            </CardContent>
          </Card>
        </section>
      </main>

      <section className="landing-section" id="news">
        <div className="section-head">
          <h2>Последние новости</h2>
          <Link className={cn(buttonVariants({ variant: "outline" }))} to="/news">
            Открыть все
          </Link>
        </div>
        {state === "loading" ? (
          <StateBlock
            description="Подгружаем три последние новости для главной страницы."
            kind="loading"
            title="Загрузка новостей"
          />
        ) : state === "error" ? (
          <StateBlock
            description="Лента временно недоступна. Откройте страницу новостей позже."
            kind="error"
            title="Ошибка загрузки"
          />
        ) : latestNews.length === 0 ? (
          <StateBlock
            description="Последние новости пока отсутствуют."
            kind="empty"
            title="Нет публикаций"
          />
        ) : (
          <div className="news-grid">
            {latestNews.map((item) => (
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

      <section className="landing-section" id="faq">
        <div className="section-head">
          <h2>Что делать (FAQ)</h2>
          <Badge variant="outline">Простой режим</Badge>
        </div>
        <Accordion defaultValue={["item-1"]}>
          {faqItems.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="landing-section">
        <div className="section-head">
          <h2>Подписка на обновления</h2>
          <Badge className="gap-1" variant="secondary">
            <BellRing size={12} />
            Бета-функция
          </Badge>
        </div>
        <div className="subscribe-row">
          <Input className="h-11 bg-white/85" placeholder="Введите телефон или email" />
          <Button className="h-11 px-6">Подписаться</Button>
        </div>
      </section>

      <section className="landing-section">
        <div className="section-head">
          <h2>Скачать приложение</h2>
          <Badge variant="outline">Скоро</Badge>
        </div>
        <div className="download-grid">
          <Card className="download-card download-card-ios">
            <CardHeader className="download-card-header">
              <CardTitle className="download-os-title">
                <Apple className="size-7 text-white" />
                iOS
              </CardTitle>
            </CardHeader>
            <CardContent className="download-card-actions">
              <Button className="bg-orange-500 text-white hover:bg-orange-600" disabled>
                <Download className="size-4" />
                Скачать для iOS
              </Button>
            </CardContent>
          </Card>
          <Card className="download-card download-card-android">
            <CardHeader className="download-card-header">
              <CardTitle className="download-os-title">
                <Smartphone className="size-7 text-white" />
                Android
              </CardTitle>
            </CardHeader>
            <CardContent className="download-card-actions">
              <Button className="bg-orange-500 text-white hover:bg-orange-600" disabled>
                <Download className="size-4" />
                Скачать для Android
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="landing-footer" id="contacts">
        <Separator className="mb-3 bg-white/20" />
        <p>Для СМИ: smi@lizaalert.org</p>
        <p>Для партнёрства: DMS@lizaalert.org</p>
        <p>Общие вопросы: org@lizaalert.org</p>
      </footer>
    </div>
  )
}
