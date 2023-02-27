import React from 'react'


const Inicio = () => {
    return (
        <>
        <a href="/Productos">
            <div className='divTodos'>
                <div className='TodosProd'>
                    <span>Productos Destacados&nbsp;&nbsp;&nbsp;</span>
                </div>
                <div className='TodosProd2'>
                    <span>Productos Destacados&nbsp;&nbsp;&nbsp;</span>
                </div>
            </div>
        </a>
        <video id='Video' controls>
            <source type='video/mp4' src='https://res.cloudinary.com/dsdicaf5h/video/upload/v1677263045/cenicero/Untitled_2_of5elw.mp4'/>
        </video>
        </>
    )
}

export default Inicio