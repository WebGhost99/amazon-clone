import '../styles/globals.css'
import { SessionProvider as AuthProvider } from "next-auth/react"
import { store } from '../store'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }) {
  return (

  <AuthProvider session={pageProps.session}>
    <Provider store={store}>
    <Component {...pageProps} />
    </Provider>
  </AuthProvider>
  
  )
}

export default MyApp
