import React, { useState, useEffect} from 'react'



// visualizamos las cards de los productos
const Cards = () => {

    const [cardsProducts, setCardsProducts] = useState([])
    const [productosElegidos, setProductosElegidos] = useState([]);
    

    useEffect(() => {
        
        fetch('https://res.cloudinary.com/dsdicaf5h/raw/upload/v1676644291/cenicero/productos_vjfpuo.json')
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
                <div key={product.id} className='card text-dark mt-5'>
                    <img src={product.img1} className='card-img-top mt-2 img-fluid' alt="" srcSet="" />
                    <img src={product.img2} className='card-img img-fluid' id='img2' alt="" srcSet="" />
                    <div className='card-body'>
                        <h1 className='card-title'>{product.nombre}</h1>
                        <h2>{product.talle}</h2>
                        <h1 className='card-text'>${product.precio}</h1>
                        <button onClick={()=>{
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
                                        img1 : product.img1,
                                        img2 : product.img2,
                                        precioSubTotal : product.precioSubTotal,
                                        elegidos : 1,
                                        });
                                        console.log("click")
                                        console.log(productosElegidos);
                                };
                            };
                            agregarProducto(); 
                        }} className='btn btn-outline-primary'>agregar</button>
                    </div>
                </div>
                
            ))
        }
    </div>
    )
}



export default Cards
