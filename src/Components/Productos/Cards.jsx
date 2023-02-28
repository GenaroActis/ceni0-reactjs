import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'


// visualizamos las cards de los productos
const Cards = () => {

    const [cardsProducts, setCardsProducts] = useState([])
    

    useEffect(() => {
        
        fetch('https://res.cloudinary.com/dsdicaf5h/raw/upload/v1677544978/cenicero/productos_ugha4n.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(dataJson => setCardsProducts(dataJson.results))
        .catch(error => console.log('Error fetching data: ', error));
    }, []);
    return (
    <div className='row' id='productos'>
        {
            cardsProducts.map(product => (
                <Link key={product.id} className="nav-link" aria-current="page" to={`/Producto/${product.id}`}>
                    <div className='card text-dark mt-5'>
                        <img src={product.img1} className='card-img-top mt-2 img-fluid' alt="" srcSet="" />
                        <img src={product.img2} className='card-img img-fluid' id='img2' alt="" srcSet="" />
                        <div className='card-body'>
                            <h1 className='card-title'>{product.nombre}</h1>
                            <h2>Talle {product.talle}</h2>
                            <h1 className='card-text shadow-lg p-3 mb-5 bg-white rounded'>${product.precio}</h1>
                        </div>
                    </div>
                </Link>
            ))
        }
    </div>
    )
}



export default Cards
