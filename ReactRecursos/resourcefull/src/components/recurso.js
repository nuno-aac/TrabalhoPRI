import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import '../stylesheets/instyles.css';
import NavbarWrapper from './navbarWrapper';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Recursos() {
    let [isLoading, setIsLoading] = useState(true);
    let [recurso, setRecurso] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:6969/recursos', { withCredentials: true })
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
                <></> 
                : 
                <div>
                    {/* Recurso */}
                </div>}
            </div>
        </NavbarWrapper>
    );
}

export default Recursos;