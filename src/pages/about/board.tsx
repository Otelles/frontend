import { AboutLinkBar } from "./index"
import Link from "next/link"

export const Board = () => (
  <div>
    <AboutLinkBar />
    <div className={"flex gap-4"}>
      <div className={"lg:basis-1/4"}>
        <div className={"bg-gradient-to-b from-green-300 to-green-400 italic-semi text-green-900 p-5 "}>
          placeholder
        </div>
      </div>
      <div className={""}>
        <p>
          Styreleder Ola Tellesbø, Bevegelsen for sosialisme <Link href="mailto:post@frikanalen.no">post@frikanalen.no</Link>
        </p>
        <p>
          Nestleder Tore Sinding Bekkedal <Link href="mailto:toresbe@protonmail.com">toresbe@protonmail.com</Link>
        </p>
        <p>
          Styremedlem Olav Hardang, Bladet Evangelisten
        </p>
        <p>
          Styremedlem Estehan Zouain, NUUG
        </p>
        <p>
          Styremedlem Rune Hagerup, EMPO
        </p>        
        <p>
          Teknisk leder Tore Sinding Bekkedal kan nås på{" "} <Link href="mailto:toresbe@protonmail.com">toresbe@protonmail.com</Link>     
        </p>
      </div>
    </div>
  </div>
)
export default Board
