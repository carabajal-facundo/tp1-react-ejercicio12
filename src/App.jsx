import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Formulario from './components/Formulario';
import { Container } from 'react-bootstrap';


function App() {
  return (
    <>
      <h1 className='text-center my-5'>Noticias</h1>
      <hr/>
      <Container className='border border-3 border-black-subtle radius rounded'>
        <Formulario/>
      </Container>
    </>
  )
}

export default App
