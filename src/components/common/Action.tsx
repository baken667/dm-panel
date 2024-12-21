import { ReactNode } from "react"
import { Button } from "../ui/button"

interface ActionProps {
  title: ReactNode
  action: ReactNode
  handler: () => void
}

function Action({ title, action, handler }: ActionProps) {
  return (
    <div className="p-4 flex flex-row justify-between items-center bg-white border rounded-lg">
      <div className="text-lg font-bold text-primary">
        {title}
      </div>
      <Button onClick={handler}>
        {action}
      </Button>
    </div>
  )
}
export default Action