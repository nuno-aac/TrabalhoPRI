import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import '../stylesheets/instyles.css';
import { useState } from 'react';
import { useAuth } from '../contexts/authcontext';
import { useHistory, useLocation } from 'react-router-dom';


function Login() {
    let [username,setUsername] = useState('')
    let [password, setPassword] = useState('')
    let auth = useAuth();
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    function handleLogin(){
        auth.signin(username, password, () => {history.push("/"); history.replace(from)})
        console.log(auth.user)
    }

    return (
        <div className="dt-background">
            <div className="dt-header-login w3-center">
                <img className="dt-header-logo" src="/images/logorelevo.png" alt="logo" />
                <h1 className="dt-name">Resourcefull</h1><a className="dt-reg-link" href="/users/register">
                    <h4>Não tem Conta? Registar</h4>
                </a>
            </div>
            <div className="dt-login-container">
                <div className="dt-login dt-round w3-container dt-login-form">
                    <input className="w3-input w3-margin-bottom dt-input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username..." />
                    <input className="w3-input w3-margin-bottom dt-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password..." />
                    <div className="w3-btn w3-dark-gray dt-round w3-margin" onClick={handleLogin} >Login</div>
                </div>
            </div>
            <div className="dt-footer-login">
                <h5 className="w3-center">Made with 🧠 PRI2020</h5>
            </div>
        </div>
    );
}

export default Login;