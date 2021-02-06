import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import '../stylesheets/instyles.css';
import Like from './like';
import { useAuth } from '../contexts/authcontext';
import axios from 'axios';

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

function Comment({ comment }) {
    let { user } = useAuth();
    user = user.user

    let deleteComment = () => {
        axios.delete('http://localhost:6969/comments/' + comment.id, { withCredentials: true })
            .then(dados => {
                console.log(dados)
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div className='in-post-comment'>
            <span className='w3-large'>{comment.user}:</span>
            {comment.user === user.id || user.access === 'ADMIN' ? <span onClick={deleteComment} className='w3-right in-post-delete w3-large'>❌</span> : <></>}
            <br/>
            <span>
                {comment.comment}
            </span>
            <div className='w3-margin-top'>
                {timeSince(comment.dataComment)} ago
                                <Like upvotes={comment.upvotes} path={'posts/comment/' + comment._id + '/upvote'} />
                {comment.upvotes.length}
            </div>
        </div>
    );
}

export default Comment;