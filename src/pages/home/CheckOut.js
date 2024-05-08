import { Container, Typography } from '@mui/material'
import React from 'react'
import Navbar from '../../components/Navbar'

const CheckOut = () => {
  return (
    <>
    <Navbar />
    <Container sx={{ mt: 8, backgroundColor: "white", padding: 4 }}>
        <Typography sx={{ textAlign: "center" , fontSize: "30px"}}>
        Thankyou...🙂 for shopping with us!!!....
        </Typography>
        <Typography sx={{ textAlign: "center" , fontSize: "30px"}}>
            Visit Again💜
        </Typography>
      
    </Container>
    </>
  )
}

export default CheckOut
