import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import React from 'react'
import Navbar from './navbar'

function Layout() {
  return (
    <Box>
      <Navbar/>
      <Outlet/>
    </Box>


  )
}

export default Layout