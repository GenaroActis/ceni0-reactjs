import React from 'react'
import Cards from './Cards'

// const callBack = new Promise ((resolve, reject)=>{
//         setTimeout(()=>{
//             resolve(json)
//         }, 3000)
//     });
    

// traemos los productos del json


const Body = () => {
//     console.log(json)
//     callBack
// .then((resp)=>{console.log(resp)})
// .catch((error)=> {console.log(error)})
    return (
        <>
        <Cards />
        </>
    )
}


export default Body