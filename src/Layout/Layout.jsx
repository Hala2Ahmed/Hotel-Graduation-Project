import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
export default function Layout() {
  return (
    <div>
      <Navbar />
      <div className=''>
      <Outlet />
    </div>
      <Footer />
    </div>
  )
}
