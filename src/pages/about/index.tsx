import { Meta } from "src/modules/core/components/Meta"
import Link from "next/link"
import { useRouter } from "next/router"
import { ReactNode } from "react"

export const AboutLink = ({ to, children }: { to: string; children: ReactNode }) => {
  const router = useRouter()

  const isActive = router.pathname.toString() == to

  return (
    <div
      className={
        "transition-color border-b-4 leading-8 text-green-500 " +
        (isActive
          ? "border-b-green-500"
          : "border-b-transparent contrast-0 hover:text-gray-700 hover:border-b-gray-700 hover:contrast-50")
      }
    >
      <Link href={to} passHref className={"font-extrabold"}>
        {children}
      </Link>
    </div>
  )
}

export const AboutLinkBar = () => (
  <div className={"text-xl lg:text-2xl flex py-2 pb-3 mt-1 gap-4"}>
    <AboutLink to={"/about"}>Organisasjon</AboutLink>
    <AboutLink to={"/about/membership"}>Medlemskap</AboutLink>
    <AboutLink to={"/about/technical"}>Teknisk</AboutLink>
    <AboutLink to={"/about/board"}>Styret</AboutLink>
    <AboutLink to={"/about/statutes"}>Vedtekter</AboutLink>
  </div>
)

export default function About() {
  return (
    <div className={"w-full"}>
      <Meta
        meta={{
          title: "Om",
          description: "Informasjon om Frikanalen og hvordan du kan bli medlem",
        }}
      />
      <AboutLinkBar />
      <div className={"flex flex-col gap-4 lg:flex-row pt-2"}>
        <div className={"lg:basis-1/3 "}>
          <div className={"bg-gradient-to-b from-orange-300 to-orange-400 italic-semi text-right text-gray-800 p-8 "}>
            <div className={"font-extrabold text-xl italic-semi"}>
              «&nbsp;Målet med Frikanalen er å styrke ytringsfrihet og deltakerdemokratiet ved å gi flere mulighet til å
              ytre seg i TV-mediet.&nbsp;»
            </div>
            <div className={"text-right pt-2 pr-2"}>
              <Link
                href={"/about/statutes"}
                passHref
                className={"text-orange-900 text-xl hover:text-orange-100 no-underline"}
              >
                Frikanalens formålsparagraf
              </Link>
            </div>
          </div>
        </div>
        <div className={"p-8  bg-gradient-to-b space-y-4 from-green-300 to-green-400 lg:pr-12 lg:pb-24"}>
          <h2 className={"text-3xl text-gray-800 font-bold py-2"}>Frikanalen er sivilsamfunnets videoplatform</h2>

          <div className={"max-w-prose"}>
            <div>
              I samarbeid med våre medlemsorganisasjoner vil vi styrke norsk samfunnsliv og frivillighet med denne ideellt
              drevne videoplattformen av og for medlemmer.
            </div>
            <div>
              Vi tilbyr alle våre medlemmer adgang til å kringkaste eget innhold under eget redaktøransvar på en riksdekkende TV-kanal tilgjengelig for alle på nett og
              kabel-TV.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
