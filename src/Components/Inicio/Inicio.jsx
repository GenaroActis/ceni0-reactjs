import React from 'react'
import { Link } from 'react-router-dom';

const Inicio = () => {
    
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
        <video id='Video' controls>
            <source type='video/mp4' src='https://res.cloudinary.com/dsdicaf5h/video/upload/v1677263045/cenicero/Untitled_2_of5elw.mp4'/>
        </video>
        </>
    )
}

export default Inicio