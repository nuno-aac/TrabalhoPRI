import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import '../stylesheets/instyles.css';
import NavbarWrapper from './navbarWrapper';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Recursos() {
    let [isLoading,setIsLoading] = useState(true);
    let [recursos, setRecursos] = useState([])

    useEffect(() =>{
        axios.get('http://localhost:6969/recursos', { withCredentials:true })
        .then(dados => { 
            console.log(dados.data)
            setRecursos(dados.data.recursosPriv) 
            setIsLoading(false)
        })
        .catch(err => { console.log(err) })
    },[])

    return (
        <NavbarWrapper>
            <div className='in-recursos-container'>
                {isLoading ? <></> : recursos.map((v, i) => <div className='in-recurso' key={i}><div>{v.titulo}</div></div>) }
            </div>
        </NavbarWrapper>
    );
}

export default Recursos;