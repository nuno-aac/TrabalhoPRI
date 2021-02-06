import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import '../stylesheets/instyles.css';
import { useAuth } from '../contexts/authcontext';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal'
import { useEffect, useState } from 'react';
import Searchbar from './searchBar';
import axios from 'axios';

const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
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
        setNumFiles([1]);
        setIsModalOpen(false)
    }
    
    let [isModalOpen,setIsModalOpen] = useState(false);
    let [numFiles, setNumFiles] = useState([1])
    let [tipos, setTipos] = useState([])

    let handleLogout = () => {
        auth.signout(() => {
            history.push('/users/login')
        })
    }

    let addFile = () => {
        setNumFiles([...numFiles,1])
    }

    useEffect(() => {
        axios.get('http://localhost:6969/tipos', {withCredentials: true})
            .then(dados => {
                setTipos(dados.data)
            })
            .catch(err => {
                console.log(err)
            })
    },[])

    return (
        <>
            <div className="w3-container w3-bar in-navbar-container">
                <div className="in-navbar-left">
                    <a className="in-navbar-item" href="/"><div className="w3-xlarge"><img src="/images/home.svg" className="in-icon" alt="Home" /></div></a>
                    <a className="in-navbar-item" href="/recursos">Recursos</a>
                    <div className="in-navbar-item" onClick={openModal}>Upload</div>
                </div>
                <div className='in-searchbar-container'>
                    <Searchbar/>
                </div>
                <div className="in-navbar-right">
                    <a className="in-navbar-item" href="/user/me">Perfil</a>
                    <a className="in-navbar-item" href="/">Os meus Recursos</a>
                    <div className="in-navbar-item" onClick={handleLogout}><div className="w3-xlarge"><img src="/images/logout.svg" className="in-icon" alt="Logout" /></div></div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={customStyles} ariaHideApp={false}>
                <div className="in-upload-modal in-flex-center">
                    <div className="in-upload-header w3-margin-bottom">
                        <h2>Upload de Ficheiro</h2>
                    </div>
                    <div className="in-upload">
                        <form className="w3-container in-flex-center w3-center" action="http://localhost:6969/recursos" method="POST" encType="multipart/form-data">
                            <div className="div w3-margin">
                                <label>
                                    <h4> <b>Título:</b></h4>
                                </label>
                                <input className="w3-input in-upload-input" type="text" name="titulo" autoComplete="off" />
                            </div>
                            <div className='in-upload-files'>
                                { numFiles.map((v,i) => <input className="w3-input w3-margin" type="file" key={i} name="myFile" />) }
                                <div className="w3-btn in-upload-submit" onClick={addFile}> + </div>
                            </div>
                            <div className="w3-margin-top"><label>Tipo de Recurso: </label><select name="tipo">
                                <option value="">-Select-</option>
                                {tipos.map((v, i) =>  <option value={v} key={i}>{v}</option> )}
                            </select></div>
                            <div className='w3-margin'>
                                <input className="w3-input w3-margin-bottom dt-input" type='number' placeholder="Ano..." name='year'/>
                            </div>
                            <div className="w3-margin-bottom">
                                <div className="w3-margin-left"> <label> Público </label><input type="radio" name="visibilidade" value="PUBLIC" /></div>
                                <div className="w3-margin-left"><label> Privado </label><input type="radio" name="visibilidade" value="PRIVATE" /></div>
                            </div>
                            <div className="w3-margin"> <input className="w3-btn in-upload-submit" type="submit" value="Submit" /></div>
                        </form>
                    </div>
                    <div className="in-upload-footer w3-margin-top">
                        <h5 className="w3-center">Made with 🧠 PRI2020</h5>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default Navbar;