import React from 'react';
import { Card,Button } from 'react-bootstrap';

const Tarjeta = ({titulo,descripcion,imagen}) => {
    return (
        <Card className='my-3 col-lg-3 mx-4'>
            <Card.Img className='img-fluid' src={imagen}/>
            <Card.Body>
                <Card.Title>{titulo}</Card.Title>
                <Card.Text>
                    {descripcion}
                </Card.Text>
                <Button variant="primary">Ver mas</Button>
            </Card.Body>
        </Card>
    );
};

export default Tarjeta;