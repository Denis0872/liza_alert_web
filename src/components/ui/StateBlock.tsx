import { AlertTriangle, LoaderCircle, SearchX } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type StateKind = "loading" | "empty" | "error"

type StateBlockProps = {
  kind: StateKind
  title: string
  description: string
}

const iconByKind = {
  loading: LoaderCircle,
  empty: SearchX,
  error: AlertTriangle,
} satisfies Record<StateKind, typeof LoaderCircle>

export function StateBlock({ kind, title, description }: StateBlockProps) {
  const Icon = iconByKind[kind]

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className={kind === "loading" ? "animate-spin" : ""} size={18} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  )
}
