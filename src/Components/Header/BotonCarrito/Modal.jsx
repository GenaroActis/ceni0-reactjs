import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ContadorCarrito from './ContadorCarrito'


window.addEventListener('storage', () => {
    console.log("evento");
});

function Example(props) {
    const [show, setShow] = useState(false);

    const productosElegidos = window.localStorage.getItem("productosElegidos");
    const productosElegidosParse = JSON.parse(productosElegidos);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    function vaciarCarrito(){
        window.dispatchEvent(new Event('storage'))
        localStorage.clear();
        console.log("event")
        window.location.reload()
    };
    
    return (
    <>
        <Button id="buttonC" variant="primary" onClick={handleShow}>
            <img src="https://res.cloudinary.com/dsdicaf5h/image/upload/v1677255374/cenicero/carrito-de-compras_1_nkqp6z.png" className="imgBoton"/>
            <h2 id="numCarrito">{props.numCarrito}</h2>
        </Button>

        <Modal id="modal" className='text-center' show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Carrito</Modal.Title>
            </Modal.Header>
        <Modal.Body id='modalBody'>
            {   productosElegidos === null ? (
                <div className='display-3 shadow-lg text-danger p-3 mb-5 bg-white rounded'>¡Tu carrito esta vacio!</div>
            ) : (
            productosElegidosParse.map(product=>
                <div key={product.id} className='card shadow-lg text-dark mt-5'>
                <img src={product.img1} className='card-img-top mt-2 img-fluid' alt="" srcSet="" />
                <div className='card-body'>
                    <h1 className='card-title'>{product.nombre}</h1>
                    <h2>Talle {product.talle}</h2>
                    <h3>Cantidad {product.elegidos}</h3>
                    {product.elegidos === 1?(
                    <h1 className='card-text shadow-lg p-3 bg-white rounded'>${product.precio} </h1>
                    ):(
                        <h2 className='card-text shadow-lg p-3 bg-white rounded'>por unidad ${product.precio} <br /> Total  ${product.precioSubTotal} </h2>
                    )}
                </div>
            </div>
            ))
            }
        </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    Cerrar
                </Button>
                {productosElegidosParse === null? (
                    console.log("carrito vacio")
                ):(
                <>
                <Button variant="danger" onClick={vaciarCarrito}>
                    vaciar carrito
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Comprar
                </Button>
                
                </>
                )}
            </Modal.Footer>
        </Modal>
        <ContadorCarrito/>
    </>
    );
}

export default Example