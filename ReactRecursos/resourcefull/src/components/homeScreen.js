import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import '../stylesheets/instyles.css';
import axios from 'axios'
import Navbar from './navbar';
import { useEffect } from 'react';

function HomeScreen() {
    useEffect(() => {
        axios.get('http://localhost:6969/', {withCredentials: true})
        .then(dados => console.log(dados))
        .catch(err => console.log(err))
    }, [])
    return (
        <div className="in-background">
            <Navbar/>
        </div>
    );
}

export default HomeScreen;