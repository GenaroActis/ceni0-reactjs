import React from 'react'
import BotonCarrito from './BotonCarrito/Modal'

import { Link } from 'react-router-dom'
import ButtonInst from './ButtonInst'

const Header = () => {

    return (
    <>
    <header>
        <h2 className="cenic">Cenicero.com.ar</h2>
        <div id="header">
            <img src="https://res.cloudinary.com/dsdicaf5h/image/upload/v1674159144/cenicero/Sin_t%C3%ADtulo-1_cscv6i.png" alt=""  id="imgLogo" className='img-fluid'/>
            <div className="d-flex flex-wrap justify-content-center py-3 mb-4">
                <div id="menu">
                    <ul className="nav nav-pills">
                        <li className="nav-item"><Link className="nav-link" aria-current="page" to={'/Category/todos'}>Productos</Link></li>
                        <li className="nav-item" id='navInicio'><Link className="nav-link" aria-current="page" to={'/ceni0-reactjs'}>Inicio</Link></li>
                        <li className="nav-item"><Link className="nav-link" aria-current="page" to={'/Nosotros'}>Nosotros</Link></li>
                    </ul>
                </div>
                <div className='divButtons'>
                    <BotonCarrito/>
                    <ButtonInst/>
                </div>
            </div>
        </div>
    </header>
    </>
    )
}

export default Header