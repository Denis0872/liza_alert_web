"use client"

import * as React from "react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion"
import { BookOpenText, ChevronDown, Newspaper, ShieldAlert, UserRound } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

type MenuLink = {
  title: string
  url: string
  icon?: React.ReactNode
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
      { title: "Новости", url: "/news", icon: <Newspaper className="size-4 text-orange-300" /> },
      { title: "Публикации", url: "/publications", icon: <BookOpenText className="size-4 text-orange-300" /> },
    ],
  },
  {
    id: 2,
    title: "Об отряде",
    items: [{ title: "О нас", url: "/about", icon: <UserRound className="size-4 text-orange-300" /> }],
  },
  {
    id: 3,
    title: "Новичкам",
    items: [
      { title: "Новичкам", url: "/newcomers", icon: <BookOpenText className="size-4 text-orange-300" /> },
      { title: "Правила безопасности", url: "/safety", icon: <ShieldAlert className="size-4 text-orange-300" /> },
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
    <header className={`sticky top-0 z-50 w-full px-3 pt-3 ${className}`}>
      <motion.nav
        animate={{
          boxShadow: isScrolled ? "0 14px 34px rgba(15, 23, 42, 0.38)" : "0 8px 20px rgba(15, 23, 42, 0.2)",
        }}
        className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between gap-3 rounded-2xl border border-slate-700/90 bg-slate-950/95 px-4"
        initial={false}
      >
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
                <motion.span
                  animate={{ rotate: hoveredCategory === category.id ? 180 : 0 }}
                  className="inline-flex"
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <ChevronDown className="size-4 text-slate-300" />
                </motion.span>
                {hoveredCategory === category.id ? (
                  <motion.div
                    className="absolute inset-0 -z-10 rounded-md border border-slate-500/70 bg-slate-700/95"
                    layoutId="category-hover"
                  />
                ) : null}
              </button>
              <AnimatePresence>
                {hoveredCategory === category.id ? (
                  <motion.div
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute top-full left-0 mt-2 w-64 rounded-xl border border-slate-500 bg-slate-900 p-2 shadow-2xl"
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  >
                    {category.items.map((item) => (
                      <Link
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium !text-white transition-colors hover:bg-slate-700 hover:!text-white"
                        key={item.title}
                        to={item.url}
                      >
                        {item.icon}
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
          <Button
            asChild
            className="border-orange-300 bg-orange-300 text-slate-900 hover:bg-orange-400"
            variant="outline"
          >
            <Link to="/app/dashboard">Войти</Link>
          </Button>
          <Button asChild className="bg-orange-500 text-white hover:bg-orange-600">
            <Link to="/app/dashboard">Стать добровольцем</Link>
          </Button>
        </div>
      </motion.nav>
    </header>
  )
}
