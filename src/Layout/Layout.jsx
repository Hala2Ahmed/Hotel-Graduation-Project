import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import ScrollToTopArrow from '../components/ScrollToTopArrow/ScrollToTopArrow'
import Scrollup from '../components/Scrollup/Scrollup'
export default function Layout() {
  return (
    <div>
      <Navbar />
      <div>
        <Scrollup />
        <ScrollToTopArrow />
      <Outlet />
    </div>
      <Footer />
    </div>
  )
}
