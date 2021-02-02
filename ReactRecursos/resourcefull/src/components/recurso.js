import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import '../stylesheets/instyles.css';
import NavbarWrapper from './navbarWrapper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import fileDownload from 'js-file-download';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal'

function timeSince(date) {
    let now = new Date()

    var seconds = Math.floor((now.getTime() - Date.parse(date)) / 1000);
    console.log(date + '||-||' + seconds)

    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
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
        axios.post('http://localhost:6969/posts/' + id,{titulo: titulo, conteudo: post}, { withCredentials: true})
            .then(dados => {
                console.log(dados)
                closeModal();
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
            })
            .catch(err => { console.log(err) })
    }, [id])

    useEffect(() =>{
        if(recurso!=null) setIsLoading(false)
    }, [recurso])

    return (
        <NavbarWrapper>
            {
            isLoading ? 
            <>{/*NADA*/}</> 
            : 
            <div className='in-recurso-page'>
                <div className="in-recurso">
                    <div className='in-center-content'>
                        <img src='/images/file.svg' alt='File' className='in-recurso-image' />
                    </div>
                    <div>
                        <span className='w3-xxxlarge'>{recurso.titulo}</span>
                        <br/>
                        <span clas>Recurso by {recurso.autor} <i>sumbited {timeSince(recurso.dataRegisto)} ago</i></span>
                    </div>
                    <div className='in-recurso-buttons'>
                        <button className="w3-btn in-upload-submit in-recurso-button w3-xlarge" onClick={openModal}>Criar Post</button>
                        <button className="w3-btn in-upload-submit in-recurso-button w3-xlarge" onClick={downloadRecurso}>Download</button>
                    </div>
                </div>
            </div>
            }
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