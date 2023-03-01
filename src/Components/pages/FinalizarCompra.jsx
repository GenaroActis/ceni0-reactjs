import React from 'react'

const FinalizarCompra = () => {
    const productosElegidos = window.localStorage.getItem("productosElegidos");
    const productosElegidosParse = JSON.parse(productosElegidos);

    const totalPrecio = window.localStorage.getItem("Total");

    return (
        <div>
            <div  className="form-group table-responsive">
                <table  className="mt-5 mb-5 table">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Sub Total</th>
                        </tr>
                    </thead>
                    {productosElegidosParse.map(product =>                  
                    <tbody key={product.id}>
                        <tr>
                            <td>{product.nombre}</td>
                            <td>${product.precio}</td>
                            <td>{product.elegidos}</td>
                            <td>${product.precioSubTotal}</td>
                        </tr>
                    </tbody>
                    )}
                    <tbody>
                        <tr>
                            <th colSpan="4" scope="col" className="text-right">
                                <h2>total precio ${totalPrecio}</h2>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FinalizarCompra