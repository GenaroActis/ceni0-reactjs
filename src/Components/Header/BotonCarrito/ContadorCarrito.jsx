import React from 'react';

function ContadorCarrito(props) {
    return <h1 id='numCarro'>{props.numero}</h1>;
}

function App() {
    return (
        <div>
        <ContadorCarrito numero="1" />
        </div>
    );
}
export default App