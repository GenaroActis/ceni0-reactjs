import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import {CartContext} from '../../context/CartContext';
import Alert from 'react-bootstrap/Alert';
    
    const userData = [];

const FinalizarCompra = () => {
    const {productosElegidos, totalPrecio} = useContext(CartContext)

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');


    const submit = (event) => {
        event.preventDefault();
        if(email === '' || nombre === ''){
            console.log("rellenar campos")
        } else{
            // generamos una exprecion regular y validamos el email
            let expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
            let valido = expReg.test(email)
            console.log(valido)
            if(valido === true){
                // si el email es valido guardamos la información del usuario en variables
                userData.push({ nombre, email });
                console.log(userData);
            }else {
                console.log(userData)
            }
        }
    }



    return (
        <form id="form" onSubmit={submit}>
            <div className="form-group mt-5">
                <label htmlFor="cliente" className="col-12 col-md-2 col-form-label h2">Cliente :</label>
                    <div className="col-12 col-md-10">
                        <input type="text" className="form-control" id="persona" placeholder="Nombre y Apellido"  onChange={(event) => setNombre(event.target.value)} />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="col-12 col-md-2 col-form-label h2">Correo :</label>
                    <div className="col-12 col-md-10">
                        <input type="text" className="form-control" id="email" placeholder="Correo Electronico" onChange={(event) => setEmail(event.target.value)}/>
                    </div>
                </div>
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
                    {productosElegidos.map(product =>                  
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
                <div className="d-flex justify-content-center">
                    <div className="p-2">
                        <Link className="btn btn-warning btn-block" aria-current="page" to={'/Productos'}>Seguir Comprando</Link>
                    </div>
                    <div className="p-2">
                        <button className="btn btn-success btn-block" id="button" onClick={
                            console.log("submit")
                        }>
                            Finalizar Compra
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default FinalizarCompra