import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import '../stylesheets/instyles.css';
import NavbarWrapper from './navbarWrapper';
import { useEffect, useState } from 'react';
import axios from 'axios';

const style = {
    height: '3em',
    width: '7em',
    margin: '7px',
    transform: 'translate(0, 0)'
}


function Recursos() {
    let [isLoading, setIsLoading] = useState(true);
    let [recurso, setRecurso] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:6969/recursos/600efb659234621ca4825d2b', { withCredentials: true })
            .then(dados => {
                console.log(dados.data)
                setRecurso(dados.data)
                setIsLoading(false)
            })
            .catch(err => { console.log(err) })
    }, [])

    return (
        <NavbarWrapper>
            <div className='in-recursos-container'>
                {isLoading ? 
                <>{/*NADA*/}</> 
                : 
                <div className="w3-center">
                    {
                        <table className="w3-table-all">
                            <tr>
                                <th>Autor</th>
                                <td>{recurso.autor}</td>
                            </tr>
                            <tr>
                                <th>Título</th>
                                <td>{recurso.titulo}</td>
                            </tr>
                            <tr>
                                <th>Tipo</th>
                                <td>{recurso.tipo}</td>
                            </tr>
                            <tr>
                                <th>Data de Registo</th>
                                <td>{recurso.dataRegisto}</td>
                            </tr>
                            <tr>
                                <th>Visibilidade</th>
                                <td>{recurso.visibilidade}</td>
                            </tr>
                        </table>
                         
                    }

                </div>}
                <div style={style}>
                    <button class="w3-button w3-black" style={style}>Criar Post</button>
                    <button class="w3-button w3-black" style={style}>Ver Post</button>
                    <button class="w3-button w3-black" style={style}>Download</button>
                </div>
            </div>
        </NavbarWrapper>
    );
}

export default Recursos;