import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {doc, getDoc, getDocs, getFirestore, collection} from 'firebase/firestore'
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

const Category = () => {
    
    const categorias = useParams();
    const [cardsProducts, setCardsProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [categoria, setCategoria] = useState('todos');

    useEffect(() => {
        const db = getFirestore()
        const cardsProductsRef = collection(db, "items")
        getDocs(cardsProductsRef).then((snapshot)=>{
            if(snapshot.docs.id === undefined){
                console.log("cargando productos...")
            }
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


    const clickCategoria = (nuevaCategoria) => {
        setCategoria(nuevaCategoria);
        navigate (`/Category/${nuevaCategoria}`)
    };

    const productosFiltrados = categorias.CategoryId === 'todos' ? cardsProducts : 
    cardsProducts.filter((producto) => producto.categoria === categorias.CategoryId);
    console.log(productosFiltrados)

    return (
        <>
    <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
            <Dropdown className='d-flex justify-content-center'>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Categorias
                </Dropdown.Toggle>
                <Dropdown.Menu  className='d-flex flex-column text-center align-self-center' id="dropDown">
                    <Dropdown.Item onClick={() => clickCategoria('todos')} >Todos</Dropdown.Item>
                    <Dropdown.Item onClick={() => clickCategoria('chomba')} >Chombas</Dropdown.Item>
                    <Dropdown.Item onClick={() => clickCategoria('remera')} >Remeras</Dropdown.Item>
                    <Dropdown.Item onClick={() => clickCategoria('gorra')} >Gorras</Dropdown.Item>
                    <Dropdown.Item onClick={() => clickCategoria('campera')} >Camperas</Dropdown.Item>
                    <Dropdown.Item onClick={() => clickCategoria('bermuda')} >Bermudas</Dropdown.Item>
                    <Dropdown.Item onClick={() => clickCategoria('camisa')} >Camisas</Dropdown.Item>
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
    )
}

export default Category