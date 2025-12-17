
import Banner from "../components/Home/Banner"
import Header from "../components/Home/Header"
import Main from "../components/Home/Main"
import Footer from "../components/Home/Footer"
import { Helmet } from "react-helmet-async";


function App() {
  return (
    <>
      <Helmet>
        <title>Quiz Clash Royale</title>
        <meta
          name="description"
          content="Quiz Clash Royale: teste seus conhecimentos, participe do ranking e dispute pontos com outros jogadores."
        />
      </Helmet>
      <Header />
      <Banner />
      <Main />
      <Footer />
    </>
  )
}

export default App
