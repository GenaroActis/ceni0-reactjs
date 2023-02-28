import React, { useState, useEffect } from 'react';

function ContadorCarrito(props) {
    return <h1 id='numCarro'>{props.numero}</h1>;
}

function App() {
    const [numeroProductos, setNumeroProductos] = useState(0);

    useEffect(() => {
    // Escuchar los cambios en el almacenamiento local
    window.addEventListener('storage', handleStorageChange);

    // Obtener el número de productos del almacenamiento local al cargar la página
    const productosElegidos = window.localStorage.getItem("productosElegidos");
    const productosElegidosParse = JSON.parse(productosElegidos);
    setNumeroProductos(productosElegidosParse?.length || 0);
    }, []);

    function handleStorageChange() {
    // Obtener el número de productos actualizado del almacenamiento local
    const productosElegidos = window.localStorage.getItem("productosElegidos");
    const productosElegidosParse = JSON.parse(productosElegidos);
    setNumeroProductos(productosElegidosParse?.length || 0);
    }

    return (
    <div>
        <ContadorCarrito numero={numeroProductos} />
    </div>
    );
}

export default App;