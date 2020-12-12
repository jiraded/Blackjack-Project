import Head from 'next/head'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { theme } from '../theme/index'
import Header from './Header'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
  }
`

const Layout: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Head>
        <title>Ludwig Casino</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link href='https://fonts.googleapis.com/css2?family=Roboto&display=swap' rel='stylesheet' />
      </Head>
      <Header />
      {children}
    </ThemeProvider>
  )
}

export default Layout
