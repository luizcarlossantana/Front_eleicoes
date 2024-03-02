
import Votacao from './Votacao'
import Grafico from './Grafico'

const Section_Info_Votar = () => {
  return (
    <>
     <section className="d-flex mt-4 justify-content-around ">
        <Votacao/>
        <Grafico/>
     </section>
     
    </>
  )
}

export default Section_Info_Votar