import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import '../stylesheets/instyles.css';
import NavbarWrapper from './navbarWrapper';
import { useAuth } from '../contexts/authcontext';

function Profile() {

    let { user } = useAuth();
    user=user.user;
    console.log(user);

    return (
        <NavbarWrapper>
            <div className='in-recurso-page'>
                <div className="in-profile in-content-box">
                   <div className='w3-border'>
                        <img className='in-profile-img' src='https://devtalk.blender.org/uploads/default/original/2X/c/cbd0b1a6345a44b58dda0f6a355eb39ce4e8a56a.png' alt='User' />
                   </div>
                   <div>
                        {user.nome}<br/>
                        {user.nome}<br/>
                        {user.nome}<br/>
                        {user.nome}<br/>
                        {user.nome}<br/>
                        {user.nome}<br/>
                        {user.nome}<br/>
                        {user.nome}<br/>
                        {user.nome}<br/>
                        {user.nome}<br/>
                        {user.nome}<br/>
                        {user.nome}<br/>
                        {user.nome}<br/>
                        {user.nome}<br/>

                   </div>
                </div>
                <button className="w3-btn in-upload-submit in-loadposts-button w3-xlarge">Mostrar Posts</button>
            </div>
        </NavbarWrapper>
    );
}

export default Profile;