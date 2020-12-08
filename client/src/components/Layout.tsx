import Head from 'next/head'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { theme } from '../theme'

const Container = styled.div``

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
  }
`

const Layout: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <Head>
          <title>Ludwig Casino</title>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <link href='https://fonts.googleapis.com/css2?family=Roboto&display=swap' rel='stylesheet' />
        </Head>
        {children}
      </Container>
    </ThemeProvider>
  )
}

export default Layout
