import React, { useState, useEffect, Fragment} from 'react'
import { useParams } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



let productosElegidos = [];

// si ya hay un producto en el localStorage lo recuperamos 
if(window.localStorage.getItem("productosElegidos")){
    productosElegidos = JSON.parse(window.localStorage.getItem("productosElegidos"));
}



const  Producto = () => {
    
    // toastify
    const notify = () => toast.success('Agregado!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    const [cardsProducts, setCardsProducts] = useState([])
    const { id } = useParams();
    
    // fetch al link del json
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

    const productoFiltrado = cardsProducts.filter(product => String(product.id) === id )

    return (
        <div key={id} id='detalleProducto'>
            {
            productoFiltrado.map(product =>(
                // carousel boostrap
                <React.Fragment key={product.id}>
                    <div id='carousel'>
                        <Carousel variant="dark">
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src={product.img1}
                                alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src={product.img2}
                                alt="Second slide"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </div>
                    {/* generamos la card con los detalles del producto */}
                    <div id='cardDetalles'>
                        <Card>
                            <Card.Body className='text-center'>
                                <Card.Title id='nombre' className="display-1 shadow-lg p-3 mb-5 bg-white rounded">{product.nombre}</Card.Title>
                                <Card.Text id='medidas' className="display-3 shadow-lg p-3 mb-5 bg-white rounded">
                                Talle {product.talle} <br />
                                {product.medidas} 
                                </Card.Text>
                                <Card.Text id='precio' className="display-1 shadow-lg p-3 mb-5 bg-white rounded">
                                ${product.precio}
                                </Card.Text>
                                <div className="d-grid gap-2 col-6 mx-auto">
                                <button id='botonAgregar' onClick={()=>{
                                    // toastify
                                    notify()
                                    // funcion agregado en boton
                                    const botonAgregar = document.querySelector("#botonAgregar")
                                    function agregado() {
                                        botonAgregar.textContent = "agregado";
                                        botonAgregar.style.backgroundColor = "#da8a0d";
                                        botonAgregar.style.color = "white";
                                        setTimeout(function() {
                                            botonAgregar.textContent = "agregar";
                                            botonAgregar.style.backgroundColor = "white";
                                            botonAgregar.style.color = "#0d6efd";
                                        }, 3000);
                                    };
                                    agregado()
                                    
                                    // generamos la funcion de agregar producto
                                    const agregarProducto = (id) =>{
                                        const productoEnCarrito = productosElegidos.find((prod) =>{
                                            return prod.id == product.id
                                        });;
                                        
                                        // si ya existe actualizamos cantidadElegida
                                        if (productoEnCarrito){
                                                let productoParaActualizar = productosElegidos.find((prod) =>{
                                                return prod.id == product.id
                                            });
                                                let precioParaActualizar = productoParaActualizar.precio;
                                                productoParaActualizar.elegidos = productoParaActualizar.elegidos + 1;
                                                productoParaActualizar.precioSubTotal = productoParaActualizar.elegidos * precioParaActualizar;
                                                console.log(productosElegidos);
                                                console.log(productoParaActualizar);
                                        }
                                        // si el elemento no existe ya en el array productosElegidos que....
                                        else{
                                            productosElegidos.push({
                                                id : product.id,
                                                nombre : product.nombre,
                                                precio : product.precio,
                                                talle : product.talle,
                                                img1 : product.img1,
                                                img2 : product.img2,
                                                precioSubTotal : product.precioSubTotal,
                                                elegidos : 1,
                                                medidas : product.medidas
                                                });
                                                console.log("click")
                                                console.log(productosElegidos);
                                            };
                                        };
                                        agregarProducto(); 
                                        
                                        // convertimos los objetos en json
                                        const JsonProductos = JSON.stringify(productosElegidos)
                                        // almacenamos en localStorage
                                        window.localStorage.setItem("productosElegidos", JsonProductos)
                                        window.dispatchEvent(new Event('storage'))
                                }} type="button" className='btn btn-lg btn-outline-primary'>agregar</button>
                                </div>
                                {/* // toastify */}
                                <ToastContainer />
                            </Card.Body>
                        </Card>
                    </div>
                </React.Fragment>
            ))
            };
        </div>
    )
};



export default Producto