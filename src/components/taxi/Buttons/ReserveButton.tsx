import { Button } from "@/components/ui/button"
import Link from "next/link"

export const ReserveButton = ({ text, className }: { text: string; className?: string }) => {
  return (
    <Link href="#contacto">
      <Button className={(className ? className + " " : "") + "cursor-pointer"}>
        {text}
      </Button>
    </Link>
  )
}