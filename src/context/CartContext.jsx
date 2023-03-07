import React, { createContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CartContext = createContext();

const CartProvider = ({children}) =>{

    const notify2 = () => toast.error('Limite Stock!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
    const notify1 = () => toast.success('Agregado!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const initialProductosElegidos = window.localStorage.getItem('productosElegidos')
    ? JSON.parse(window.localStorage.getItem('productosElegidos'))
    : {};

    let [productosElegidos, setProductosElegidos] = useState(
        initialProductosElegidos
    )

    const itemEnCarrito = (id) => {
        return productosElegidos.find((product) => product.id === id);
    };

    const agregarProducto = (product) => {
        const itemParaActualizar = itemEnCarrito(product.id);
        
            // si el elemento si existe actualizamos cantidad elegida y precio subtotal
            
            if (itemParaActualizar){
                if (itemParaActualizar.elegidos === 5){
                    console.log("stockLimite")
                    notify2()
                } else {
                let precioParaActualizar = itemParaActualizar.precio;
                itemParaActualizar.elegidos = itemParaActualizar.elegidos + 1;
                itemParaActualizar.precioSubTotal = itemParaActualizar.elegidos * precioParaActualizar;
                setProductosElegidos([...productosElegidos]);
                notify1()
                }
                
            }
            // si el elemento no existe ya en el array productosElegidos que....
            else{
                    productosElegidos.push({
                        id : product.id,
                        nombre : product.nombre,
                        precio : product.precio,
                        img1 : product.img1,
                        img2 : product.img2,
                        precioSubTotal : product.precio,
                        elegidos : 1,
                    })
                    notify1()
                    setProductosElegidos([...productosElegidos]);
            }
        guardarLocalStorage();
    };

    const guardarLocalStorage = () => {
        // convertimos los objetos en json
        const JsonProductos = JSON.stringify(productosElegidos);
        // almacenamos en localStorage
        if (window.localStorage) {
            window.localStorage.setItem("productosElegidos", JsonProductos);
        }
    };

    const limpiarCarrito = () => {
        productosElegidos = [];
        window.sessionStorage.clear();
        setProductosElegidos([...productosElegidos]);
    };

    const eliminarItem = (product) => {
        let itemParaActualizar = productosElegidos.find((product) => product.id === product.id);
        console.log(itemParaActualizar)
        // si la cantidad es menos a dos limpiamos el producto
        if (itemParaActualizar.elegidos < 2 ){
            let prodId = itemParaActualizar
            productosElegidos = productosElegidos.filter((product) => product.id !== product.id);
            itemParaActualizar.elegidos = 0;
        }
        // sino descontamos uno a cantidad elegida
        else {
            itemParaActualizar.elegidos = itemParaActualizar.elegidos - 1;
            let precioParaActualizar = itemParaActualizar.precio;
            itemParaActualizar.precioSubTotal = itemParaActualizar.elegidos * precioParaActualizar;
        };
        setProductosElegidos([...productosElegidos]);
        guardarLocalStorage();
    };

    const totalPrecio = productosElegidos.reduce((acumulador, product) => acumulador + product.precioSubTotal, 0);

    const localStorage = () => {
        // convertimos los objetos en json
        const JsonProductos = JSON.stringify(productosElegidos)
        // almacenamos en localStorage
        window.localStorage.setItem("productosElegidos", JsonProductos)
        window.dispatchEvent(new Event('storage'))
    };

    return(
        <CartContext.Provider value={{ productosElegidos,initialProductosElegidos, guardarLocalStorage, limpiarCarrito, itemEnCarrito,  eliminarItem, totalPrecio, agregarProducto, localStorage}}>
        {children}
        </CartContext.Provider>
    )
}



export default CartProvider;       