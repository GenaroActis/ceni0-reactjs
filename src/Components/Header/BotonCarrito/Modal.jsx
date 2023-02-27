import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ContadorCarrito from './ContadorCarrito'

function Example(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
        <Modal.Body id='modalBody'>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Comprar
                </Button>
            </Modal.Footer>
        </Modal>
        <ContadorCarrito/>
    </>
    );
}

export default Example