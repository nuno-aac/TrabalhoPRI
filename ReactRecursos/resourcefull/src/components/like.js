import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import '../stylesheets/instyles.css';

import { useAuth } from '../contexts/authcontext';
import axios from 'axios';


function Like({ upvotes, path }) {
    let {user} = useAuth();
    let username = user.user.id;

    let checked = upvotes.includes(username);

    let upvote = () => {
        axios.post('http://localhost:6969/' + path, {}, { withCredentials: true })
            .then(dados => {
                console.log(dados)
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <span onClick={upvote}>
            {checked
            ?
                <img className='in-like-img' src='/images/like.svg' alt='Like' />
            :
                <img className='in-nolike-img' src='/images/like.svg' alt='Like' />
            }
            
        </span>
    );
}

export default Like;