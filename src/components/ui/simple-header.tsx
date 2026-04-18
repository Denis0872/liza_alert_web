import React from "react"
import { PhoneCall } from "lucide-react"
import { Sheet, SheetContent, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { MenuToggle } from "@/components/ui/menu-toggle"

type HeaderLink = {
  label: string
  href: string
}

type HeaderAction = {
  label: string
  href: string
}

type SimpleHeaderProps = {
  links?: HeaderLink[]
  primaryAction?: HeaderAction
  secondaryAction?: HeaderAction
  brandLabel?: string
}

export function SimpleHeader({
  links = [],
  brandLabel = "ЛизаАлерт",
  primaryAction = { label: "Оставить заявку", href: "/apply" },
  secondaryAction = { label: "Войти в кабинет", href: "/app/dashboard" },
}: SimpleHeaderProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur-lg">
      <nav className="mx-auto flex min-h-18 w-full max-w-6xl items-center justify-between gap-3 px-4 py-2">
        <a className="flex items-center gap-3 text-white" href="/">
          <img alt="ЛизаАлерт" className="h-9 w-auto object-contain" src="/lizaalert-logo.svg" />
          <p className="hidden text-sm font-semibold tracking-wide text-orange-200 md:block">{brandLabel}</p>
        </a>
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium text-slate-100 transition-colors hover:bg-slate-800 hover:text-white"
              href={link.href}
              key={link.label}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <div className="mr-2 inline-flex items-center gap-1 rounded-md border border-slate-700 bg-slate-900/80 px-2.5 py-1 text-xs font-medium text-slate-100">
            <PhoneCall className="size-3.5 text-orange-300" />
            8 800 700 54 52
          </div>
          <Button
            asChild
            className="border-slate-200 bg-white text-slate-900 hover:bg-slate-100"
            variant="outline"
          >
            <a href={secondaryAction.href}>{secondaryAction.label}</a>
          </Button>
          <Button asChild className="bg-orange-500 text-white hover:bg-orange-600">
            <a href={primaryAction.href}>{primaryAction.label}</a>
          </Button>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <Button size="icon" variant="outline" className="border-slate-400 bg-white/95 text-slate-900 lg:hidden">
            <MenuToggle
              strokeWidth={2.5}
              open={open}
              onOpenChange={setOpen}
              className="size-6"
            />
          </Button>
          <SheetContent
            className="bg-background/95 supports-[backdrop-filter]:bg-background/80 gap-0 backdrop-blur-lg"
            showClose={false}
            side="left"
          >
            <div className="grid gap-y-2 overflow-y-auto px-4 pt-12 pb-5">
              {links.map((link) => (
                <a
                  className="inline-flex h-10 items-center justify-start rounded-md px-3 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-100"
                  href={link.href}
                  key={link.label}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <SheetFooter>
              <div className="inline-flex items-center justify-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold text-slate-700">
                <PhoneCall className="size-3.5 text-orange-500" />
                8 800 700 54 52
              </div>
              <Button
                asChild
                className="border-slate-300 bg-white text-slate-900 hover:bg-slate-100"
                variant="outline"
              >
                <a href={secondaryAction.href}>{secondaryAction.label}</a>
              </Button>
              <Button asChild className="bg-orange-500 text-white hover:bg-orange-600">
                <a href={primaryAction.href}>{primaryAction.label}</a>
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
