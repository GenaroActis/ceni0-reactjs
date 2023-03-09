import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

const Cards = () => {
    const [cardsProducts, setCardsProducts] = useState([]);
    const [categoria, setCategoria] = useState('todos');

    useEffect(() => {
        fetch('https://res.cloudinary.com/dsdicaf5h/raw/upload/v1678377920/cenicero/productos_fm4ugd.json')
        .then((response) => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((dataJson) => setCardsProducts(dataJson.results))
        .catch((error) => console.log('Error fetching data: ', error));
    }, []);

    const productosFiltrados = categoria === 'todos' ? cardsProducts : cardsProducts.filter((producto) => producto.categoria === categoria);

    const clickCategoria = (nuevaCategoria) => {
        setCategoria(nuevaCategoria);
    };

    return (
    <>
    <div className='d-flex flex-column align-items-center mt-5'>
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Categorias
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => clickCategoria('todos')} category="Todo">Todos</Dropdown.Item>
                <Dropdown.Item onClick={() => clickCategoria('chomba')} category="Chombas">Chombas</Dropdown.Item>
                <Dropdown.Item onClick={() => clickCategoria('buzo')} category="Buzos">Buzos</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
            <div className="row" id="productos">
            {productosFiltrados.map((product) => (
                <Link key={product.id} className="nav-link" aria-current="page" to={`/Producto/${product.id}`}>
                    <div className="card text-dark mt-5">
                        <img src={product.img1} className="card-img-top mt-2 img-fluid" alt="" srcSet="" />
                        <img src={product.img2} className="card-img img-fluid" id="img2" alt="" srcSet="" />
                        <div className="card-body">
                            <h1 className="card-title">{product.nombre}</h1>
                            <h2>Talle {product.talle}</h2>
                            <h1 className="card-text shadow-lg p-3 mb-5 bg-white rounded">${product.precio}</h1>
                        </div>
                    </div>
                </Link>
            ))}
            </div>
        </div>
    </>
    );
};

export default Cards;