import React from 'react'

import Header from './Header/Header'
import Footer from './Footer/Footer'
import Body from './Productos/Body'

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Nosotros from './pages/Nosotros'
import Productos from './pages/Productos'
import ProductoDetalle from './pages/ProductoDetalles'
import Inicio from './Inicio/Inicio'

import  '../scss/reset.css'
import  '../scss/Header&Footer.css'
import  '../scss/body.css'
import  '../scss/Inicio.css'





const Landing = () => {
    return (
    <div id='landing'>
        <React.StrictMode>
            <BrowserRouter>
                <Header/>
                
                <Routes>
                    <Route exact path="/" element={<Inicio/>}/>
                    <Route exact path="/Nosotros" element={<Nosotros/>}/>
                    <Route exact path="/Productos" element={<Body/>}/>
                    <Route exact path="/Producto/:id" element={<ProductoDetalle/>}/>
                </Routes>
            </BrowserRouter>
            <Footer/>
        </React.StrictMode>
    </div>
    )
}
export default Landing