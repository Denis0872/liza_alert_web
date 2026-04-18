"use client"

import * as React from "react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion"
import { ChevronDown, PhoneCall } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

type MenuLink = {
  title: string
  url: string
}

type MenuCategory = {
  id: number
  title: string
  items: MenuLink[]
}

interface ScrollNavbarProps {
  menuCategories?: MenuCategory[]
  className?: string
}

export const defaultMenuCategories: MenuCategory[] = [
  {
    id: 1,
    title: "Медиа",
    items: [
      { title: "Новости", url: "/news" },
      { title: "Публикации", url: "/publications" },
    ],
  },
  {
    id: 2,
    title: "Об отряде",
    items: [{ title: "О нас", url: "/about" }],
  },
  {
    id: 3,
    title: "Новичкам",
    items: [
      { title: "Новичкам", url: "/newcomers" },
      { title: "Правила безопасности", url: "/safety" },
    ],
  },
]

export function ScrollNavigationMenu({
  menuCategories = defaultMenuCategories,
  className = "",
}: ScrollNavbarProps) {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [hoveredCategory, setHoveredCategory] = React.useState<number | null>(null)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20)
  })

  return (
    <motion.header
      animate={{
        boxShadow: isScrolled ? "0 10px 28px rgba(15, 23, 42, 0.22)" : "0 0 0 rgba(0,0,0,0)",
      }}
      className={`sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl ${className}`}
      initial={false}
    >
      <nav className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between gap-3 px-4">
        <Link className="inline-flex items-center" to="/">
          <img alt="ЛизаАлерт" className="h-9 w-auto object-contain" src="/lizaalert-logo.svg" />
        </Link>

        <div className="relative hidden items-center gap-1 lg:flex">
          {menuCategories.map((category) => (
            <motion.div
              className="relative"
              key={category.id}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory((current) => (current === category.id ? null : current))}
            >
              <button
                className="group relative inline-flex h-10 items-center gap-1 rounded-md px-3 text-sm font-semibold text-slate-100 transition-colors hover:text-white"
                type="button"
              >
                {category.title}
                <ChevronDown className="size-4 text-slate-300 transition-transform group-hover:translate-y-[1px]" />
                {hoveredCategory === category.id ? (
                  <motion.div
                    className="absolute inset-0 -z-10 rounded-md bg-slate-800/90"
                    layoutId="category-hover"
                  />
                ) : null}
              </button>
              <AnimatePresence>
                {hoveredCategory === category.id ? (
                  <motion.div
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute top-full left-0 mt-2 w-58 rounded-xl border border-slate-700 bg-slate-900 p-2 shadow-2xl"
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  >
                    {category.items.map((item) => (
                      <Link
                        className="block rounded-md px-3 py-2 text-sm font-medium text-slate-100 transition-colors hover:bg-slate-800 hover:text-white"
                        key={item.title}
                        to={item.url}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <div className="inline-flex items-center gap-1 rounded-md border border-slate-700 bg-slate-900/80 px-2.5 py-1 text-xs font-semibold text-slate-100">
            <PhoneCall className="size-3.5 text-orange-300" />
            8 800 700 54 52
          </div>
          <Button asChild className="border-slate-200 bg-white text-slate-900 hover:bg-slate-100" variant="outline">
            <Link to="/app/dashboard">Войти в кабинет</Link>
          </Button>
          <Button asChild className="bg-orange-500 text-white hover:bg-orange-600">
            <Link to="/apply">Оставить заявку</Link>
          </Button>
        </div>
      </nav>
    </motion.header>
  )
}
