import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import '../stylesheets/instyles.css';
import NavbarWrapper from './navbarWrapper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Comment from './comment';

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

    useEffect(() => {
        axios.get('http://localhost:6969/posts/6015671962d4ba66404d63b7/' + id, { withCredentials: true })
            .then(dados => {
                console.log(dados.data)
                setPost(dados.data)
                setIsLoading(false)
            })
            .catch(err => { console.log(err) })
    }, [id])

    return (
        <NavbarWrapper>
            {
                isLoading ?
                <>{/*NADA*/}</>
                :
                <div className='in-post-page'>
                    <div className="in-post in-content-box">
                        <div>
                            <img src='/images/file.svg' alt='File' className='in-post-image' />
                            <span className='w3-xxxlarge'>{post.titulo}</span>
                        </div>
                        <div className='in-post-content'>
                            <span className='w3-large'>{post.conteudo}</span>
                        </div>
                        <div>
                                {timeSince(1)}
                        </div>
                    </div>
                    <div className='in-post-comments in-content-box'>
                        <div className='in-comment-input'>
                            <span className='w3-xxlarge w3-margin-bottom'> Comments</span>
                            <textarea className='in-comment-text' value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Conteudo..." />
                            <button className="w3-btn in-upload-submit" onClick={postComment}> Comentar </button>
                        </div>
                        {post.comments.map((v, i) => <Comment key={i} comment={v} />)}
                    </div>
                </div>
            }
        </NavbarWrapper>
    );
}

export default Post;