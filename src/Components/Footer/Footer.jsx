import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer id='footer' className="py-3">
            <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                <li className="nav-item"><a href="/Productos" className="nav-link px-2 text-white">Productos</a></li>
                <li className="nav-item"><a href="/" className="nav-link px-2 text-white">Inicio</a></li>
                <li className="nav-item"><a href="/Nosotros" className="nav-link px-2 text-white">Nosotros</a></li>
            </ul>
            <p className="text-center text-white">© 2022 Company, Inc</p>
        </footer>
    )
}

export default Footer