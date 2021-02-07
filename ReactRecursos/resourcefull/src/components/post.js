import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import '../stylesheets/instyles.css';
import NavbarWrapper from './navbarWrapper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Comment from './comment';
import Like from './like';
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



function Post() {
    let [isLoading, setIsLoading] = useState(true)
    let [post, setPost] = useState(null)
    let [comment, setComment] = useState('')
    let [comments, setComments] = useState([])

    let { user } = useAuth();
    user = user.user

    let { id } = useParams();

    let postComment = () => {
        axios.post('http://localhost:6969/posts/' + id + '/comment',{ comment: comment }, { withCredentials: true })
        .then(dados => {
            console.log(dados)
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        });
    }

    let deletePost = () => {
        axios.delete('http://localhost:6969/posts/' + id, { withCredentials: true })
            .then(dados => {
                console.log(dados)
                window.location.replace('/');
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        axios.get('http://localhost:6969/posts/'+ id, { withCredentials: true })
            .then(dados => {
                console.log(dados.data)
                setPost(dados.data)
                setIsLoading(false)
            })
            .catch(err => { console.log(err) })
    }, [id])

    useEffect(()=>{
        if(post !== null){
            axios.get('http://localhost:6969/posts/' + post._id +'/comments', { withCredentials: true })
                .then(dados => {
                    console.log(dados.data)
                    setComments(dados.data)
                })
                .catch(err => { console.log(err) })
        }
    }, [post])

    return (
        <NavbarWrapper>
            {
                isLoading ?
                <>{/*NADA*/}</>
                :
                <div className='in-post-page'>
                    <div className="in-post in-content-box">
                        <div>
                            <img src={'/images/types/'+post.tipo+'.svg'} alt='File' className='in-post-image' />
                            <span className='w3-xxxlarge'>{post.titulo}</span><span> Post sobre <Link to={'/recurso/'+post.recursoID}>{post.recTitle}</Link></span>
                            {post.autor === user.id || user.access === 'ADMIN' ? <span onClick={deletePost} className='w3-right in-post-delete w3-large'>❌</span> : <></>}
                            {post.autor === user.id ? <a href={'/post/edit/' + id} className='w3-right in-decoration-none in-post-delete w3-large'>✏️</a> : <></>}
                        </div>
                        <div className='in-post-content'>
                                <span className='w3-large  in-text'>{post.conteudo}</span>
                        </div>
                        <div className='in-flex-row'>
                            <div className='in-post-footer'>
                                    Posted {timeSince(post.dataRegisto)} ago by <Link style={{marginLeft:'5px'}}to={'/users/' + post.autor}> {post.autor}</Link>
                                <Like upvotes={post.upvotes} path={'posts/' + post._id + '/upvote'} />
                                {post.upvotes.length}
                            </div>
                        </div>
                    </div>
                    <div className='in-post-comments in-content-box'>
                        <div className='in-comment-input'>
                            <span className='w3-xxlarge w3-margin-bottom'> Comments</span>
                            <textarea className='in-comment-text' value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Conteudo..." />
                            <button className="w3-btn in-upload-submit" onClick={postComment}> Comentar </button>
                        </div>
                        {comments.map((v, i) => <Comment key={i} comment={v} />)}
                    </div>
                </div>
            }
        </NavbarWrapper>
    );
}

export default Post;