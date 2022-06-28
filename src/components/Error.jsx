import React from 'react'
import styled from '@emotion/styled'


const Texto = styled.div`
background-color: #b7322c;
color: #fff;
font-size: 30px;
font-weight: bold;
padding: 15px;
text-family: 'Lato', sans-serif;
text-transform: uppercase;
text-align: center;


`






export const Error = ({children}) => {
  return (
    <Texto>{children}</Texto>
  )
}
