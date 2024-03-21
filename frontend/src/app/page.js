import Footer from '@/Components/Footer'
import MainSlider from '@/Components/MainSlider'
import Navbar from '@/Components/Navbar'
import React from 'react'

export default function Home() {
  return (
    <>
    <Navbar/>
    <main style={{minHeight:"300vh"}}>
      
      <MainSlider/>
    </main>
    <Footer/>
    </>
  )
}
