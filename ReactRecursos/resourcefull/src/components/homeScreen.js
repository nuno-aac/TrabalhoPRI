import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import '../stylesheets/instyles.css';
import NavbarWrapper from './navbarWrapper';
import { useEffect, useState } from 'react';
import axios from 'axios';

function HomeScreen() {
    let [posts,setPosts] = useState(null);
    let [isLoading,setIsLoading] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:6969/posts', { withCredentials: true })
            .then(dados => {
                console.log(dados.data)
                setPosts(dados.data)
                setIsLoading(false)
            })
            .catch(err => { console.log(err) })
    },[])

    return (
        <NavbarWrapper>
            {
                isLoading ? 
                <></>
                :
                posts.map((v, i) => <div key={i}>{v.titulo + ' - ' + v.conteudo}</div>)
            }
        </NavbarWrapper>
    );

}

export default HomeScreen;