import React, { useState } from 'react'
import styled from '@emotion/styled'

const Label = styled.label`
color: #fff;
display: block;
font-size: 20px;
font-weight: 700;
font-family: 'Lato', sans-serif;
margin: 15px 0;

`

const Select = styled.select`
width: 100%;
border-radius: 10px;
font-size: 20px;
padding: 14px;

`



export const useSelectMonedas = (label, opciones) => {

    const [state, setState] = useState("")
  
    const SelectMonedas = () => (
        <>
       
            <Label>{label}</Label>

            <Select
            value={state}
            onChange={e => setState(e.target.value)}
            >
                <option value="">Seleccione</option>
                {opciones.map(opcion => (
                    <option key={opcion.id} value={opcion.id}>{opcion.nombre}</option>
                ))}
            </Select>
        </>


    )

    return [
        state,
        SelectMonedas
    ]

}
