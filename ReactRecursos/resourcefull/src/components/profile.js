import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import '../stylesheets/instyles.css';
import NavbarWrapper from './navbarWrapper';
import { useAuth } from '../contexts/authcontext';
import { Link } from 'react-router-dom';

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

function Profile() {

    let { user } = useAuth();
    user=user.user;
    console.log(user);

    return (
        <NavbarWrapper>
            <div className='in-recurso-page'>
                <div className="in-profile in-content-box">
                    <div className='in-flex-center'>
                        <img className='in-profile-img' src='https://devtalk.blender.org/uploads/default/original/2X/c/cbd0b1a6345a44b58dda0f6a355eb39ce4e8a56a.png' alt='User' />
                        <Link to='/users/edit'>Editar</Link>
                    </div>
                    <div className='in-profile-details w3-margin-left'>
                        <div>
                            <span className='w3-jumbo'> {user.nome} </span>
                            <span className='w3-small'>last visited {timeSince(user.dataUltimoAcesso)} ago </span>
                        </div>
                        <div className='w3-large'>{user.id}, {user.age} anos {user.afiliacao ? <span>, {user.afiliacao} </span> : <></>} </div>
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
                
                <button className="w3-btn in-upload-submit in-loadposts-button w3-xlarge">Mostrar Posts</button>
            </div>
        </NavbarWrapper>
    );
}

export default Profile;