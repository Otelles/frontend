import { ExternalLink } from "src/modules/ui/components/ExternalLink"

export const Footer = ({ className }: { className?: string }) => (
  <div className={"flex " + (className || "")}>
    <span className={"grow"}>© 2009 - {new Date().getFullYear()} Foreningen Frikanalen</span>
    <nav className={"space-x-4"}>
      <ExternalLink href="https://github.com/Frikanalen/frikanalen">GitHub</ExternalLink>
      <ExternalLink href="https://frikanalen.no/api/">API</ExternalLink>
      <ExternalLink href="https://frikanalen.no/xmltv/">XMLTV</ExternalLink>
    </nav>
  </div>
)
