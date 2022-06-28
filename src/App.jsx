import styled from "@emotion/styled"
import { useState, useEffect } from "react"
import { Formularios } from "./components/Formularios"
import  Resultados  from "./components/Resultados"
import  Spinner  from "./components/Spinner"
import Imagencriptomonedas from "./img/imagen-criptos.png"


const Contenedor = styled.div`
max-width: 900px;
margin: 0 auto;
width: 90%;
@media (min-width: 992px) {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2rem;
}

`
const Imagen = styled.img`
max-width: 400px;
width: 80%;
margin: 100px  auto 0 auto;
display: block;

`

const Heading = styled.h1`
  color: #fff;
  font-family: 'Lato', sans-serif;
  text-align: center;
  font-weight: 700;
  font-size: 34px;
  margin-top: 80px;
  margin-bottom: 50px;


  &::after {
    content: '';
    display: block;
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    margin: 10px auto 0 auto;
  }

  `


function App() {

  const [monedas, setMonedas] = useState({})
  const [resultado, setResultado] = useState({})
  const [ cargando, setCargando ] = useState(false)

  useEffect(() => {
    if(Object.keys(monedas).length > 0) {
      

      const cotizarCripto = async () => {
        
        setCargando(true)
        const { moneda, criptomoneda } = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        setResultado(resultado.DISPLAY[criptomoneda][moneda])
        setCargando(false)

        
      }
      cotizarCripto()
    }
  }, [monedas])

  return (
    <Contenedor>
      <Imagen
      src={Imagencriptomonedas}
      alt="Imagen de criptomonedas"
      />
      <div>
        <Heading >
          Cotiza criptomonedas al Instante!
        </Heading>
        <Formularios
        setMonedas={setMonedas}
        />
        {cargando && <Spinner/>}
       {resultado.PRICE && <Resultados resultado={resultado} />}
      </div>
    </Contenedor>
  )
}

export default App
