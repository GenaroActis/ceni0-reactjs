import React, { createContext, useState, useEffect } from 'react'
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

    let initialProductosElegidos = [];

    initialProductosElegidos = window.localStorage.getItem('productosElegidos')
    ? (JSON.parse(window.localStorage.getItem('productosElegidos'))) : (initialProductosElegidos = []);

    let [productosElegidos, setProductosElegidos] = useState(initialProductosElegidos)

    console.log(productosElegidos)

    const itemEnCarrito = (id) => {
        return productosElegidos.find((product) => product.id === id) || null;
    };

    console.log(productosElegidos)

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
    };

    const limpiarCarrito = () => {
        productosElegidos = [];
        window.sessionStorage.clear();
        setProductosElegidos([...productosElegidos]);
        guardarLocalStorage();
    };

    const eliminarItem = (prodId) => {
        let itemParaActualizar = productosElegidos.find((product) => product.id === prodId);
        console.log(itemParaActualizar)
        // si la cantidad es menos a dos limpiamos el producto
        if (itemParaActualizar.elegidos < 2 ){
            productosElegidos = productosElegidos.filter((product) => product.id !== prodId);
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

    const limpiarItem = (prodId) => {
        productosElegidos = productosElegidos.filter((product) => product.id !== prodId);
        setProductosElegidos([...productosElegidos]);
        guardarLocalStorage();
    }

    let [totalPrecio, setTotalPrecio] = useState(0);

    const totalPrecioFunctions = () =>{
        if (productosElegidos.length === 0){
            console.log("array vacio")
        } else {
            totalPrecio = productosElegidos.reduce((acumulador, product) => acumulador + product.precioSubTotal, 0);
            setTotalPrecio(totalPrecio);
        }
    }
    const guardarLocalStorage = () => {
        // convertimos los objetos en json
        const JsonProductos = JSON.stringify(productosElegidos);
        // almacenamos en localStorage
        if (window.localStorage) {
            window.localStorage.setItem("productosElegidos", JsonProductos);
        }
    };

    // usamos el useEffect para actualizar el localStorage y el totalPrecio
    useEffect(() => {
        guardarLocalStorage();
        totalPrecioFunctions();
    }, [productosElegidos]);
    

    return(
        <CartContext.Provider value={{limpiarItem, totalPrecioFunctions, totalPrecio, productosElegidos, initialProductosElegidos, guardarLocalStorage, limpiarCarrito, itemEnCarrito,  eliminarItem, agregarProducto, localStorage}}>
        {children}
        </CartContext.Provider>
    )
}



export default CartProvider;       