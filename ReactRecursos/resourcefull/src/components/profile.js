import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import '../stylesheets/instyles.css';
import NavbarWrapper from './navbarWrapper';
import { useAuth } from '../contexts/authcontext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import PostCard from './postCard';
import Modal from 'react-modal'

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
        transform: 'translate(-50%, -50%)',
        width:'30vw',
        wordWrap: 'break-all'
    }
};

function Profile() {
    let auth = useAuth()

    let [posts, setPosts] = useState(null)
    let [token, setToken] = useState(null)
    let [isModalOpen,setIsModalOpen] = useState(false)
    
    let deleteUser = () => {
        axios.delete('http://localhost:6969/users/' + user.id, { withCredentials: true })
            .then(dados => {
                auth.signout(() => {
                    window.location.replace('/users/login')
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    let generateToken = () => {
        axios.get('http://localhost:6969/users/token', { withCredentials: true })
            .then(dados => {
                setToken(dados.data.token)
                setIsModalOpen(true)
                
            })
            .catch(err => {
                console.log(err);
            });
    }

    let closeModal = () => {
        setIsModalOpen(false)
    }


    let { user } = useAuth();
    user=user.user;
    console.log(user);

    let loadPosts = () => {
        axios.get('http://localhost:6969/posts?users=' + user.id, { withCredentials: true })
            .then(dados => {
                console.log(dados)
                setPosts(dados.data)
            })
            .catch(err => { console.log(err) })
    }

    return (
        <NavbarWrapper>
            <div className='in-recurso-page'>
                <div className="in-profile in-content-box">
                    <div className='in-flex-center'>
                        <img className='in-profile-img' src='https://devtalk.blender.org/uploads/default/original/2X/c/cbd0b1a6345a44b58dda0f6a355eb39ce4e8a56a.png' alt='User' />
                        <Link to='/user/edit'>Editar</Link>
                        <span onClick={deleteUser} className='in-post-delete w3-center w3-margin-top w3-large'>Delete ❌</span>
                    </div>
                    <div className='in-profile-details w3-margin-left'>
                        <div>
                            <span className='w3-jumbo'> {user.nome} </span> 
                            <span className='w3-small'>last visited {timeSince(user.dataUltimoAcesso)} ago </span>
                            <button className="w3-btn in-upload-submit in-loadposts-button w3-right" onClick={generateToken}>Gerar Token</button>
                        </div>
                        <div className='w3-large'>{user.id}, {user.age} anos{user.filiacao ? <span>, {user.filiacao} </span> : <></>} </div>
                        {
                        user.bio ?
                            <div>
                                <hr></hr>
                                <div className='w3-xxxlarge'>
                                    Bio:
                                </div>
                                <div>
                                    {user.bio}
                                </div>
                            </div>
                        :
                            <></>
                        }
                   </div>
                </div>
                <div className='in-posts-center'>
                    {posts == null ?
                        <button className="w3-btn in-upload-submit in-loadposts-button w3-xlarge" onClick={loadPosts}>Mostrar Posts</button>
                        :
                        posts.map((v, i) => <PostCard key={i} post={v} />)
                    }
                </div>
            </div>
            <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={customStyles} ariaHideApp={false}>
                <div className='in-new-post'>
                    <h2 className='in-upload-header'>Token:</h2>
                    <textarea className='in-profile-token' value={token}/>        
                </div>
            </Modal>
        </NavbarWrapper>
    );
}

export default Profile;