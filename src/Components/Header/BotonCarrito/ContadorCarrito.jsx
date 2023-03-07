import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../../context/CartContext';

function ContadorCarrito(props) {
    const { productosElegidos, initialProductosElegidos } = useContext(CartContext);
    const [cargando, setCargando] = useState(true);

    let initialCantidad = initialProductosElegidos.reduce((acumulador, product) => acumulador + product.elegidos, 0)

    const [totalCantidadNum, setTotalCantidadNum] = useState(initialCantidad);

    useEffect(() => {
        if (cargando) {
        setCargando(false);
        return;
        }

    setTotalCantidadNum(productosElegidos.reduce((acumulador, product) => acumulador + product.elegidos, 0));
    }, [productosElegidos]);

    return (
        <div>
            <h1 id='numCarro'>{totalCantidadNum}</h1>
        </div>
    );
}

export default ContadorCarrito;






