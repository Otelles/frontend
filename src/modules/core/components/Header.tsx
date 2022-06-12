import React from "react"
import { styled } from "@mui/system"
import { Logo } from "./Logo"
import { HeaderAuthBar } from "./HeaderAuthBar"
import { mainContentStyle } from "../styles/mainContentStyle"
import { CONTENT_WIDTH, CONTENT_WIDTH_PADDING, MOBILE_MENU_THRESHOLD } from "../constants"
import { MobileNav } from "./MobileNav"
import { NavLinks } from "./NavLinks"
import Link from "next/link"

const Outer = styled("header")`
  margin-top: 64px;

  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;
`

const Container = styled("div")`
  ${mainContentStyle}
`

const Bottom = styled("div")`
  margin-top: 32px;

  display: flex;
  align-items: center;
`

const Nav = styled("nav")`
  display: flex;
  align-items: center;

  @media (max-width: ${MOBILE_MENU_THRESHOLD}px) {
    display: none;
  }
`

const LogoContainer = styled("div")`
  display: flex;
  cursor: pointer;

  @media (max-width: ${CONTENT_WIDTH + CONTENT_WIDTH_PADDING}px) {
    justify-content: center;
  }
`

const SizedLogo = styled(Logo)`
  width: 400px;

  @media (max-width: 800px) {
    width: 60vw;
    min-width: 250px;
    max-width: 400px;

    margin-bottom: 24px;
  }
`

export function Header() {
  return (
    <Outer>
      <Container>
        <Link href={"/"} passHref>
          <LogoContainer>
            <SizedLogo />
          </LogoContainer>
        </Link>
        <Bottom>
          <MobileNav />
          <Nav>
            <NavLinks />
          </Nav>
          <HeaderAuthBar />
        </Bottom>
      </Container>
    </Outer>
  )
}
