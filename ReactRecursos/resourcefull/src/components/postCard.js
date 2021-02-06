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

function PostCard({ post }) {

    return (
        <Link to={"/post/" + post._id} style={{ textDecoration: 'none' }}>
            <div className='in-posts-post'>
                <div className='in-posts-details'>
                    <div>
                        <span className='w3-xxlarge in-font-quicksand'>{post.titulo}</span>
                        <span> Post sobre {post.recTitle}</span>
                    </div>
                    <div>
                        {timeSince(post.dataRegisto)} ago by {post.autor}
                    </div>
                </div>
                <div className='in-center-content'>
                    <img src={'/images/types/' + post.tipo + '.svg'} alt='File' className='in-img-card' />
                </div>
            </div>
        </Link>
    );
}

export default PostCard;