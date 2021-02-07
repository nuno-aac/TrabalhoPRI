import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import '../stylesheets/instyles.css';
import NavbarWrapper from './navbarWrapper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EditPost() {
    let {id} = useParams()
    let [post,setPost] = useState(null)
    useEffect(() => {
        axios.get('http://localhost:6969/posts/' + id, { withCredentials: true })
            .then(dados => {
                console.log(dados.data)
                setPost(dados.data)
            })
            .catch(err => { console.log(err) })
    }, [id])

    useEffect(() => {
        if(post!=null){
            setTitulo(post.titulo)
            setConteudo(post.conteudo)
        }
    }, [post])

    let [titulo,setTitulo] = useState('');
    let [conteudo, setConteudo] = useState('');


    let editUser = () =>{
        axios.post('http://localhost:6969/posts/' + post._id + '/edit', {titulo:titulo,conteudo:conteudo}, { withCredentials: true })
            .then(dados => {
                console.log(dados)
                window.location.replace('/post/'+post._id);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <NavbarWrapper>
            <div className='in-recurso-page'>
                <div className="w3-margin-48 w3-padding in-content-box">
                    <div className='w3-margin'>
                        <label className='w3-large w3-margin-bottom'>Titulo:</label>
                        <input autoComplete='off' className="w3-input in-upload-input" type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                    </div>
                    <div className='w3-margin'>
                        <textarea className='in-edit-post' type="text" value={conteudo} onChange={(e) => setConteudo(e.target.value)} />
                    </div>
                    <div className='in-flex-center w3-margin-bottom'>
                        <button className="w3-btn in-upload-submit in-recurso-button w3-xlarge" onClick={editUser}>Editar</button>  
                    </div>  
                </div>
            </div>
        </NavbarWrapper>
    );
}

export default EditPost;