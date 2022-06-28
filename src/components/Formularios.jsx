import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useSelectMonedas } from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas.js'
import { Error } from './Error'

const InputSubmit = styled.input`
background-color: #9497ff;
border: none;
width: 100%;
padding: 10px;
color: #fff;
font-weihgt: 700;
text-transform: uppercase;
font-size: 20px;
border-radius: 5px;
transition: background-color .3s ease;
margin-top: 30px;

&:hover {
    cursor: pointer;
    background-color: #7a7dfe;
}

`

export const Formularios = ({setMonedas}) => {
    const [criptos, setCryptos] = useState([])
    const [error, setError] = useState(false)
    

    const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu Moneda', monedas)
    const [ criptomoneda, SelectCriptomonedas ] = useSelectMonedas('Elige tu Moneda', criptos)

    /* 
    const [ criptomoneda, SelectCriptomonedas ] = useSelectMonedas('Elige tu Criptomoneda', criptos) */


    useEffect(() => {
              const consultarAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=30&tsym=USD"
            const respuesta = await fetch(url)
            const resultados = await respuesta.json() // convierte la respuesta a json   
            
            
            const arrayCrypto = resultados.Data.map(cripto => {
                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
                
               return objeto
            })
            setCryptos(arrayCrypto)
                        
        }
        consultarAPI()
   }, [])

   const handleSubmit = e => {
         e.preventDefault()
         if([moneda, criptomoneda].includes("")){
            
            setError(true)
            return
         }
        setError(false)
        setMonedas({
            moneda,
            criptomoneda
        })
        
   }
    
  return (
    <div>
        {error && <Error>Todos los campos son obligatorios</Error>}
        <form onSubmit={handleSubmit}>

        <SelectMonedas />
        <SelectCriptomonedas/>

        <InputSubmit type="submit" value="Cotizar"/>
        </form>
    </div>
  )
}
