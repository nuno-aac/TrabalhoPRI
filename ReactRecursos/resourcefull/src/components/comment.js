import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import '../stylesheets/instyles.css';
import { Link } from 'react-router-dom'


//***********************/
// TODO
// --Rating
// --Data
// --Info Recurso
//
//***********************/
/*function timeSince(date) {
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
}*/

function Comment({ comment }) {

    return (
        <div className='in-post-comment'>
            <h3>{comment.user}:</h3>
            <span>
                {comment.comment}
            </span>
        </div>
    );
}

export default Comment;