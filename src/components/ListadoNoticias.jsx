import React from 'react';
import Tarjeta from './Tarjeta';

const ListadoNoticias = ({noticias}) => {
    const listado = noticias.map(noticia=> <Tarjeta titulo={noticia.title} 
        descripcion={noticia.description} imagen={noticia.image_url}/>)
    return (
        <>
        <section className='row justify-content-center'>
            {listado}
        </section>
        </>
    );
};

export default ListadoNoticias;