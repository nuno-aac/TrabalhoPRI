import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import '../stylesheets/instyles.css';
import { useAuth } from '../contexts/authcontext';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal'
import { useState } from 'react';

const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 8, 0, 0.85)'
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        borderRadius: '15px',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

function Navbar() {
    let auth = useAuth();
    let history = useHistory();

    let openModal = () =>{  
        setIsModalOpen(true)
    }

    let closeModal = () => {
        setIsModalOpen(false)
    }
    
    let [isModalOpen,setIsModalOpen] = useState(false);
    let [numFiles, setNumFiles] = useState([1])

    let handleLogout = () => {
        auth.signout(() => {
            history.push('/users/login')
        })
    }

    let addFile = () => {
        setNumFiles([...numFiles,1])
    }

    return (
        <>
            <div class="w3-container w3-bar in-navbar-container">
                <div class="in-navbar-left">
                    <a class="in-navbar-item" href="/"><div class="w3-xlarge"><img src="/images/home.svg" class="in-icon" alt="Home" /></div></a>
                    <a class="in-navbar-item" href="/recursos">Recursos</a>
                    <btn class="in-navbar-item" onClick={openModal}>Upload</btn>
                </div>
                <div class="in-navbar-right">
                    <a class="in-navbar-item" href="/users/perfil">Perfil</a>
                    <a class="in-navbar-item" href="/">Os meus Recursos</a>
                    <btn class="in-navbar-item" onClick={handleLogout}><div class="w3-xlarge"><img src="/images/logout.svg" class="in-icon" alt="Logout" /></div></btn>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={customStyles}>
                <div class="in-upload-modal in-flex-center">
                    <div class="in-upload-header w3-margin-bottom">
                        <h2>Upload de Ficheiro</h2>
                    </div>
                    <div class="in-upload">
                        <form class="w3-container in-flex-center w3-center" action="http://localhost:6969/recursos" method="POST" enctype="multipart/form-data">
                            <div class="div w3-margin">
                                <label>
                                    <h4> <b>Título:</b></h4>
                                </label>
                                <input class="w3-input in-upload-input" type="text" name="titulo" autocomplete="off" />
                            </div>
                            <div className='in-upload-files'>
                                { numFiles.map((v,i) => <input class="w3-input w3-margin" type="file" name="myFile" />)
                                }
                                <div class="w3-btn in-upload-submit" onClick={addFile}> + </div>
                            </div>
                            <div class="w3-margin-top"><label>Tipo de Recurso: </label><select name="tipo">
                                <option value="">-Select-</option>
                                <option value="slides">Slides</option>
                                <option value="teste">Teste</option>
                            </select></div>
                            <div class="w3-margin">
                                <div class="w3-margin-left"> <label>Público </label><input type="radio" name="visibilidade" value="PUBLIC" /></div>
                                <div class="w3-margin-left"><label>Privado </label><input type="radio" name="visibilidade" value="PRIVATE" /></div>
                            </div>
                            <div class="w3-margin"> <input class="w3-btn in-upload-submit" type="submit" value="Submit" /></div>
                        </form>
                    </div>
                    <div class="in-upload-footer w3-margin-top">
                        <h5 class="w3-center">Made with 🧠 PRI2020</h5>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default Navbar;