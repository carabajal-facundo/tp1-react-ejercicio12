import React from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import ListadoNoticias from './ListadoNoticias';

const Formulario = () => {
    const [categoria,setCategoria] = useState("");
    const [noticias,setNoticias] = useState([]);
    const [mostrarSpinner,setMostrarSpinner] = useState(false);
    const direccionConsulta = 'https://newsdata.io/api/1/news?apikey=pub_24075474f026b0a805d5d0ba3a266e07cc5e1&language=es&category=';

    const consultaAPI = async ()=>{
        setMostrarSpinner(true);
        let cat=categoria;
        if(cat=='ciencia') cat='science';
        if(cat=='deporte') cat='sports';
        if(cat=='tecnologia') cat='technology';
        if(cat=='politica') cat='politics';
        const consulta = await fetch(direccionConsulta+cat);
        const datoResults = await consulta.json();
        setNoticias(datoResults.results);
        setCategoria('Seleccione una opcion');
        setMostrarSpinner(false);
    }
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        consultaAPI();
        setCategoria('Seleccione una opcion');
    }

    const mostrarComponenteSpinner = (mostrarSpinner===true)?(<div className="text-center my-5">
    <Spinner animation="grow" variant="secondary" />
  </div>) : '';

    return (
        <>
        <Form onSubmit={handleSubmit}>
            <Form.Group className='d-flex my-4'>
                <Form.Label >Buscar por una categoria</Form.Label>
                <Form.Select 
                    onChange={(e)=>{
                        setCategoria(e.target.value)}} value={categoria}>
                    <option>Seleccione una opcion</option>
                    <option value="ciencia">Ciencia</option>
                    <option value="deporte">Deporte</option>
                    <option value="tecnologia">Tecnologia</option>
                    <option value="politica">Politica</option>
                </Form.Select>
                <Button variant='success' type='submit'>Filtrar</Button>
            </Form.Group>
        </Form>
        {mostrarComponenteSpinner}
        <ListadoNoticias noticias={noticias} className="row"/>
        </>
    );
};

export default Formulario;