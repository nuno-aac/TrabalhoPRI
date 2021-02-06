import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import '../stylesheets/instyles.css';
import NavbarWrapper from './navbarWrapper';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
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

function UserProfile() {
    let { id } = useParams()
    let [posts, setPosts] = useState(null)
    let [user,setUser] = useState(null)
    let globalUser = useAuth().user.user;
    
    useEffect(()=> {
        axios.get('http://localhost:6969/users/' + id, { withCredentials: true })
            .then(dados => {
                console.log(dados)
                setUser(dados.data)
            })
            .catch(err => { console.log(err) })
    },[id])

    let loadPosts = () => {
        axios.get('http://localhost:6969/posts?users=' + user.id, { withCredentials: true })
            .then(dados => {
                console.log(dados)
                setPosts(dados.data)
            })
            .catch(err => { console.log(err) })
    }

    let deleteUser = () => {
        axios.delete('http://localhost:6969/users/' + user.id, { withCredentials: true })
            .then(dados => {
                window.location.replace('/')
            })
            .catch(err => {
                console.log(err);
            });
    }

    let toAdministrador = () => {
        axios.post('http://localhost:6969/users/' + user.id + '/admin', {}, { withCredentials: true })
            .then(dados => {
                window.location.reload()
            })
            .catch(err => console.log(err))
    }

    return (
        <NavbarWrapper>
            {user !== null ?
            <div className='in-recurso-page'>
                <div className="in-profile in-content-box">
                    <div className='in-flex-center'>
                        <img className='in-profile-img' src='https://devtalk.blender.org/uploads/default/original/2X/c/cbd0b1a6345a44b58dda0f6a355eb39ce4e8a56a.png' alt='User' />
                        {globalUser.access === 'ADMIN' && user.access !== 'ADMIN' ? <span className='w3-pointer' onClick={toAdministrador}>{user.access !== 'ADMIN' ? 'Tornar Admin 👑' : 'Retirar Admin 💼'}</span> : <></>}
                            {globalUser.access === 'ADMIN' ? <span className='w3-pointer' onClick={deleteUser} >Delete ❌</span> : <></>}
                    </div>
                    <div className='in-profile-details w3-margin-left'>
                        <div>
                            <span className='w3-jumbo'> {user.nome} </span>
                            <span className='w3-small'>last visited {timeSince(user.dataUltimoAcesso)} ago </span>
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
            :
            <></>
            }
        </NavbarWrapper>
    );
}

export default UserProfile;