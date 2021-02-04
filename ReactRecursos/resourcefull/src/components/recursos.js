import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import '../stylesheets/instyles.css';
import NavbarWrapper from './navbarWrapper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RecursoCard from './recursoCard'
import Sidebar from './sidebar';


function Recursos() {
    let [queryString,setQueryString] = useState('')
    let [isLoading,setIsLoading] = useState(true);
    let [recursos, setRecursos] = useState([])

    useEffect(() =>{
        axios.get('http://localhost:6969/recursos', { withCredentials:true })
        .then(dados => { 
            console.log(dados.data)
            setRecursos(dados.data.recursosPriv.concat(dados.data.recursosPublic)) 
            setIsLoading(false)
        })
        .catch(err => { console.log(err) })
    },[])

    let loadFilters = () => {
        axios.get('http://localhost:6969/recursos' + queryString, { withCredentials: true })
            .then(dados => {
                console.log(dados.data)
                setRecursos(dados.data.recursosPriv.concat(dados.data.recursosPublic))
                setIsLoading(false)
            })
            .catch(err => { console.log(err) })
    }

    useEffect(() => {
        console.log(queryString)
    }, [queryString])

    return (
        <NavbarWrapper>
            <div className='in-recursos'>
                <div className='in-recursos-sidebar in-flex-center'>
                    <Sidebar setQueryString={setQueryString} loadFilters={loadFilters}/>
                </div>
                <div className='in-recursos-container'>
                    {isLoading ? <></> : recursos.map((v, i) => <RecursoCard recurso={v} key={i}/>) }
                </div>
            </div>
        </NavbarWrapper>
    );
}

export default Recursos;