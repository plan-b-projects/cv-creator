import Header from '../components/header/header'
import Footer from "../components/footer/footer"
import type { ReactNode } from "react"
import styled from 'styled-components'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  )
}

const Main = styled.main`
  min-height: calc(100vh - 150px);
  position: relative;
  overflow: hidden;
`
