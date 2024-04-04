
import Votacao from './Votacao'
import Grafico from './Grafico'
import NavBar from './NavBar'

const Section_Info_Votar = () => {
  return (
    <>
    <NavBar/>
     <section className="d-flex mt-4 justify-content-around voto_grafico">
        <Votacao/>
        <Grafico/>
     </section>
     
    </>
  )
}

export default Section_Info_Votar