import { Button } from "../../ui/button"
import { Phone } from "lucide-react"

const CallButton = ({ className }: { className?: string }) => {
  return (
    <a href="tel:+34641230218">
      <Button
        variant="outline"
        className={className || "border-white text-foreground hover:bg-white hover:text-black bg-transparent"}
      >
        <Phone className="w-4 h-4 mr-2" />
        Llamar
      </Button>
    </a>
  )
}

export default CallButton
