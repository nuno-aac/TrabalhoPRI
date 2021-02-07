import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import '../stylesheets/instyles.css';
import NavbarWrapper from './navbarWrapper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import fileDownload from 'js-file-download';
import StarRatings from 'react-star-ratings';
import { Link, useParams } from 'react-router-dom';
import Modal from 'react-modal'
import PostCard from './postCard';
import { useAuth } from '../contexts/authcontext';

function timeSince(date) {
    let now = new Date()

    var seconds = Math.floor((now.getTime() - Date.parse(date)) / 1000);

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


function Recurso() {
    let [isLoading, setIsLoading] = useState(true)
    let [recurso, setRecurso] = useState(null)
    let [titulo, setTitulo] = useState('')
    let [post, setPost] = useState('')
    let [posts,setPosts] = useState(null)
    let [rating, setRating] = useState(0)
    let [globalRating, setGlobalRating] = useState(0)

    let { user } = useAuth();
    user=user.user

    let openModal = () => {
        setIsModalOpen(true)
    }

    let closeModal = () => {
        setPost('')
        setTitulo('')
        setIsModalOpen(false)
    }

    let changeRating = (newRating, _name) => {
        axios.post('http://localhost:6969/recursos/' + id + '/rating', { rating: newRating }, { withCredentials: true })
            .then(dados => {
                setRating(newRating)
                window.location.reload()
            })
            .catch(err => { console.log(err) })
    }

    let downloadRecurso = () =>{
        axios.get('http://localhost:6969/recursos/download/' + id, { withCredentials: true,  responseType: 'blob' })
            .then(dados =>{
                fileDownload(dados.data,recurso.titulo +'.zip')
            })
            .catch(err => { console.log(err) })
    }

    let newPost = () => {
        axios.post('http://localhost:6969/posts',{idRec:id, tipo:recurso.tipo, titulo: titulo, conteudo: post, visibilidade: recurso.visibilidade, recTitle: recurso.titulo}, { withCredentials: true})
            .then(dados => {
                closeModal();
            })
            .catch(err => { console.log(err) })
    }

    let loadPosts = () => {
        axios.get('http://localhost:6969/posts?rec=' + id, { withCredentials: true })
            .then(dados => {
                setPosts(dados.data)
            })
            .catch(err => { console.log(err) })
    }

    let deleteRecurso = () => {
        axios.delete('http://localhost:6969/recursos/' + id, { withCredentials: true })
            .then(dados => {
                console.log(dados)
                window.location.replace('/recursos');
            })
            .catch(err => {
                console.log(err);
            });
    }

    let changeVisibilidade = () =>{
        let newVisibilidade = '';
        recurso.visibilidade === 'PRIVATE' ? newVisibilidade = 'PUBLIC' : newVisibilidade = 'PRIVATE'

        axios.post('http://localhost:6969/recursos/' + id + '/visibilidade', { visibilidade: newVisibilidade }, { withCredentials: true })
            .then(dados => {
                window.location.reload()
            })
            .catch(err => { console.log(err) })
    }

    let [isModalOpen, setIsModalOpen] = useState(false);

    let { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:6969/recursos/' + id, { withCredentials: true })
            .then(dados => {
                setRecurso(dados.data)
                setIsLoading(false)
            })
            .catch(err => { console.log(err) })
    }, [id])

    useEffect(() => {
        let totalRating = 0;
        if(recurso!=null){
            let myRating = recurso.ratings.filter(e => e.user === user.id)
            if(myRating.length > 0){
                setRating(myRating[0].rating)
            }
            recurso.ratings.forEach(element => {
                totalRating += element.rating
            });
            setGlobalRating(totalRating/Math.max(recurso.ratings.length,1))
        }
    }, [recurso,user])


    return (
        <NavbarWrapper>
            {
            isLoading ? 
            <>{/*NADA*/}</> 
            : 
            <div className='in-recurso-page'>
                <div className="in-recurso">
                    <div className='in-center-content'>
                        <img src={'/images/types/' + recurso.tipo + '.svg'} alt='File' className='in-recurso-image' />
                    </div>
                    <div>
                        <span className='w3-xxxlarge'>{recurso.titulo}</span>
                        <br/>
                        <div>Recurso by <Link to={'/users/' + recurso.autor}>{recurso.autor}</Link> <i>submited {timeSince(recurso.dataRegisto)} ago</i></div>
                        <div style={{marginTop:'30px',alignItems:'center'}} className='in-flex-row'>
                            <span className='w3-large w3-margin-right'>Rating </span>
                            <StarRatings rating={globalRating} starRatedColor="rgb(60, 136, 111)" starDimension='40px' numberOfStars={5} name='rating' />
                        </div>
                        <div style={{ marginTop: '20px', alignItems: 'center' }} className='in-flex-row'>
                            <span className='w3-large w3-margin-right'>Pessoal</span>
                            <StarRatings rating={rating} starRatedColor="rgb(60, 136, 111)" starHoverColor="rgb(60, 136, 111)" starDimension='40px' changeRating={changeRating} numberOfStars={5} name='rating' />
                        </div>
                    </div>
                    <div className='in-recurso-buttons'>
                        <button className="w3-btn in-upload-submit in-recurso-button w3-xlarge" onClick={openModal}>Criar Post</button>
                        <button className="w3-btn in-upload-submit in-recurso-button w3-xlarge" onClick={downloadRecurso}>Download</button>
                        {(user.access === 'ADMIN' || recurso.autor === user.id) ?
                            <button className={"w3-btn in-recurso-" + recurso.visibilidade + " in-recurso-button w3-xlarge"} onClick={changeVisibilidade}>{recurso.visibilidade}</button>
                            :
                            <></>
                        }
                        {recurso.autor === user.id || user.access === 'ADMIN' ? <span onClick={deleteRecurso} className='in-post-delete w3-center w3-large'>Delete ❌</span> : <></>}
                    </div>
                </div>
                <div className='in-posts-center'>
                    { posts == null ?
                        <button className="w3-btn in-upload-submit in-loadposts-button w3-xlarge" onClick={loadPosts}>Mostrar Posts</button>
                        :
                        posts.map((v, i) => <PostCard key={i} post={v} />)
                    }
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

export default Recurso;