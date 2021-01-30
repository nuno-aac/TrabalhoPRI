import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import '../stylesheets/instyles.css';
import NavbarWrapper from './navbarWrapper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import fileDownload from 'js-file-download';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal'



const style = {
    height: '3em',
    width: '7em',
    margin: '7px',
    transform: 'translate(0, 0)'
}

const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
        backgroundColor: 'rgba(0, 8, 0, 0.85)'
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        borderRadius: '15px',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};


function Recursos() {
    let [isLoading, setIsLoading] = useState(true)
    let [recurso, setRecurso] = useState(null)
    let [titulo, setTitulo] = useState('')
    let [post, setPost] = useState('')

    let openModal = () => {
        setIsModalOpen(true)
    }

    let closeModal = () => {
        setPost('')
        setIsModalOpen(false)
    }

    let downloadRecurso = () =>{
        axios.get('http://localhost:6969/recursos/download/' + id, { withCredentials: true,  responseType: 'blob' })
            .then(dados =>{
                fileDownload(dados.data,recurso.titulo +'.zip')
            })
            .catch(err => { console.log(err) })
    }

    let newPost = () => {
        axios.post('http://localhost:6969/posts/' + id,{titulo: titulo, conteudo: post}, { withCredentials: true, responseType: 'blob' })
            .then(dados => {
                console.log(dados)
            })
            .catch(err => { console.log(err) })
    }

    let [isModalOpen, setIsModalOpen] = useState(false);

    let { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:6969/recursos/' + id, { withCredentials: true })
            .then(dados => {
                console.log(dados.data)
                setRecurso(dados.data)
                setIsLoading(false)
            })
            .catch(err => { console.log(err) })
    }, [id])

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
                    <button className="w3-button w3-black" style={style} onClick={openModal}>Criar Post</button>
                    <button className="w3-button w3-black" style={style}>Ver Post</button>
                    <button className="w3-button w3-black" style={style} onClick={downloadRecurso}>Download</button>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={customStyles} ariaHideApp={false}>
                <div className='in-new-post'>
                    <h2 className='in-upload-header'>Novo Post</h2>
                    <input className='in-titulo-input' value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Titulo..." />
                    <textarea className='in-post-input' value={post} onChange={(e) => setPost(e.target.value)} placeholder="Conteudo..." />
                    <div className='w3-btn in-upload-submit' on onClick={newPost}>Post</div>
                </div>
            </Modal>
        </NavbarWrapper>
    );
}

export default Recursos;