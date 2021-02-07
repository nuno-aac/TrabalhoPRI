import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import '../stylesheets/instyles.css';
import { useAuth } from '../contexts/authcontext';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal'
import { useState } from 'react';
import Searchbar from './searchBar';
import Upload from './upload';

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

    let handleLogout = () => {
        auth.signout(() => {
            history.push('/users/login')
        })
    }

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
                    <a className="in-navbar-item" href="/recursos/mine">Os meus Recursos</a>
                    <div className="in-navbar-item" onClick={handleLogout}><div className="w3-xlarge"><img src="/images/logout.svg" className="in-icon" alt="Logout" /></div></div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={customStyles} ariaHideApp={false}>
                <Upload numFiles={numFiles} setNumFiles={setNumFiles}/>
            </Modal>
        </>
    );
}

export default Navbar;