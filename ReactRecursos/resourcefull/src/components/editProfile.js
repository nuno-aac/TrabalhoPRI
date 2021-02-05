import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import '../stylesheets/instyles.css';
import NavbarWrapper from './navbarWrapper';
import { useAuth } from '../contexts/authcontext';
import { useState } from 'react';

function EditProfile() {

    let { user } = useAuth();
    user=user.user;
    console.log(user);

    let [nome,setNome] = useState('');
    let [idade, setIdade] = useState('');
    let [afiliacao, setAfiliacao] = useState('');
    let [bio, setBio] = useState('');

    return (
        <NavbarWrapper>
            <div className='in-recurso-page'>
                <div className="w3-margin-48 w3-padding in-content-box">
                    <div className='w3-margin'>
                        <label className='w3-large w3-margin-bottom'>Nome:</label>
                        <input autoComplete='off' className="w3-input in-upload-input" type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder={user.nome}/>
                    </div>
                    <div className='w3-margin'>
                        <label className='w3-large w3-margin-bottom'>Idade:</label>
                        <input autoComplete='off' className="w3-input in-upload-input" type="text" value={idade} onChange={(e) => setIdade(e.target.value)} placeholder={user.age} />
                    </div>
                    <div className='w3-margin'>
                        <label className='w3-large w3-margin-bottom'>Afiliacao:</label>
                        <input autoComplete='off' className="w3-input in-upload-input" type="text" value={afiliacao} onChange={(e) => setAfiliacao(e.target.value)} placeholder={user.afiliacao} />
                    </div>
                    <div className='w3-margin'>
                        <label className='w3-large w3-margin-bottom'>Bio:</label><br/>
                        <textarea className='in-edit-bio' type="text" value={bio} onChange={(e) => setBio(e.target.value)} placeholder={user.bio}/>
                    </div>
                    <div className='in-flex-center w3-margin-bottom'>
                        <button className="w3-btn in-upload-submit in-recurso-button w3-xlarge" >Editar</button>  
                    </div>  
                </div>
            </div>
        </NavbarWrapper>
    );
}

export default EditProfile;