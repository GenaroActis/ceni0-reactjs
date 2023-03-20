import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import { getDocs, getFirestore, collection} from 'firebase/firestore'
import Spinner from 'react-bootstrap/Spinner';
import Carousel from 'react-bootstrap/Carousel';
import { CarouselItem } from 'react-bootstrap';

const Inicio = () => {
    
    const [cardsProducts, setCardsProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const db = getFirestore()
        const cardsProductsRef = collection(db, "items")
        getDocs(cardsProductsRef).then((snapshot)=>{
            setCardsProducts(snapshot.docs.map((doc) => ({id:doc.id, ...doc.data()}) ))
        })
        .finally(() => setLoading(false));
    }, []);

    if (loading === true){
        return (
        <div className='container-fluid' id='spinner'>
            <h1>Cargando...</h1>
        <Spinner className='spinner' animation="border"/>
        </div>
        )
    }

    return (
        <>
        <Link className="nav-link" aria-current="page" to={'/Category/todos'}>
            <div className='divTodos'>
                <div className='TodosProd'>
                    <span>Productos Destacados&nbsp;&nbsp;&nbsp;</span>
                </div>
                <div className='TodosProd2'>
                    <span>Productos Destacados&nbsp;&nbsp;&nbsp;</span>
                </div>
            </div>
        </Link>
        <div id='Video'>
                <div id="products">
                    <Carousel variant="dark rounded">
                    {
                    cardsProducts.map((product)=>(
                        <CarouselItem key={product.id} className='text-center'>
                            <Link id="link" className="nav-link" aria-current="page" to={`/Producto/${product.id}`}>
                                <div className="card text-dark mt-5">
                                    <img src={product.img1} className="card-img-top mt-2 img-fluid" alt={`slide ${product.id}`} srcSet="" />
                                    <div className="card-body">
                                        <h1 className="card-title">{product.nombre}</h1>
                                        <h2>Talle {product.talle}</h2>
                                        <h1 className="card-text shadow-lg p-3 mb-5 bg-white rounded">${product.precio}</h1>
                                    </div>
                                </div>
                            </Link>
                        </CarouselItem>
                    ))
                    }
                    </Carousel>
                </div>
            <video controls>
                <source type='video/mp4' src='https://res.cloudinary.com/dsdicaf5h/video/upload/v1677263045/cenicero/Untitled_2_of5elw.mp4'/>
            </video>
        </div>
        <ToastContainer/>
        </>
    )
}

export default Inicio