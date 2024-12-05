import { Poppins } from 'next/font/google'
 
// If loading a variable font, you don't need to specify the font weight
const poppins = Poppins({ subsets: ['latin'] })
 
export default function MyApp({ Component, pageProps }) {
  return (
    <main className={poppins.className}>
      <Component {...pageProps} />
    </main>
  )
}