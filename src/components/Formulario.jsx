import React from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import ListadoNoticias from './ListadoNoticias';

const Formulario = () => {
    const [categoria,setCategoria] = useState("");
    const [pais,setPais] = useState("");
    const [noticias,setNoticias] = useState([]);
    const [mostrarSpinner,setMostrarSpinner] = useState(false);
    const direccionConsulta = 'https://newsdata.io/api/1/news?apikey=pub_24075474f026b0a805d5d0ba3a266e07cc5e1&language=es';

    const consultaAPI = async ()=>{
        setMostrarSpinner(true);
        let cat=categoria;
        if(cat=='ciencia') cat='&category=science';
        if(cat=='deporte') cat='&category=sports';
        if(cat=='tecnologia') cat='&category=technology';
        if(cat=='politica') cat='&category=politics';
        let consulta;
        console.log(cat)
        console.log(pais)
        if(cat!='Seleccione una categoria'||cat!=''){
            console.log("primer condicional")
            if(pais!='Seleccione un pais'||pais!=''){
                console.log("segundo condicional")
                consulta = await fetch(direccionConsulta+'&country='+pais+cat);
            } 
            else{
                console.log("segundo condicional else")
                consulta = await fetch(direccionConsulta+cat);
            }
        }
        else if(pais!=='Seleccione un pais'||pais!=''){
            console.log("primer condicional else if")
            consulta = await fetch(direccionConsulta+'&country='+pais);
        } 
        else consulta = await fetch(direccionConsulta);
        const datoResults = await consulta.json();
        setNoticias(datoResults.results);
        setCategoria('Seleccione una categoria');
        setPais(''),
        setMostrarSpinner(false);
    }
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        consultaAPI();
        setCategoria('Seleccione una categoria');
    }

    const mostrarComponenteSpinner = (mostrarSpinner===true)?(<div className="text-center my-5">
    <Spinner animation="grow" variant="secondary" />
  </div>) : '';

    return (
        <>
        <Form onSubmit={handleSubmit}>
            <Form.Group className='row justify-content-center my-4'>
                <Form.Label >Buscar por una categoria</Form.Label>
                <Form.Select 
                    onChange={(e)=>{
                        setCategoria(e.target.value)}} value={categoria}>
                    <option value="Seleccione una categoria">Seleccione una categoria</option>
                    <option value="ciencia">Ciencia</option>
                    <option value="deporte">Deporte</option>
                    <option value="tecnologia">Tecnologia</option>
                    <option value="politica">Politica</option>
                </Form.Select>
                <Form.Label >Buscar por un pais</Form.Label>
                <Form.Select 
                    onChange={(e)=>{
                        setPais(e.target.value)}} value={pais}>
                    <option value="Seleccione un pais">Seleccione un pais</option>
                    <option value="ar">Argentina</option>
                    <option value="br">Brasil</option>
                    <option value="uy">Uruguay</option>
                    <option value="py">Paraguay</option>
                </Form.Select>
                <Button className='col-2 mt-4' variant='success' type='submit'>Filtrar</Button>
            </Form.Group>
        </Form>
        {mostrarComponenteSpinner}
        <ListadoNoticias noticias={noticias} className="row"/>
        </>
    );
};

export default Formulario;