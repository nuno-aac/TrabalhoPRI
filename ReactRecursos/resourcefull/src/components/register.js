import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import '../stylesheets/instyles.css';
import { useState } from 'react';
import { useAuth } from '../contexts/authcontext';
import { useHistory, useLocation } from 'react-router-dom';


function Login() {
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    let [name, setName] = useState('')
    let [email, setEmail] = useState('')
    let [age, setAge] = useState('')

    let auth = useAuth();
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    function handleRegister() {
        auth.signin(username, password, () => { history.push("/"); history.replace(from) })
        console.log(auth.user)
    }

    return (
        <div className="dt-background">
            <div class="dt-header-login dt-align-center">
                <img class="dt-header-logo" alt="Logo" src="/images/logorelevo.png" />
                <h1 class="dt-name">Resourcefull</h1>
                <div class="dt-login-container">
                    <div class="dt-register dt-round w3-padding-left w3-padding-right"></div>
                </div>
                <form class="w3-container dt-login-form" action="/users/register" method="POST">
                    <input class="w3-input w3-margin-bottom dt-input" type="text" name="id" placeholder="Username..." />
                    <input class="w3-input w3-margin-bottom dt-input" type="password" name="password" placeholder="Password..." />
                    <input class="w3-input w3-margin-bottom dt-input" type="text" name="nome" placeholder="Nome..." />
                    <input class="w3-input w3-margin-bottom dt-input" type="text" name="email" placeholder="Email..." />
                    <input class="w3-input w3-margin-bottom dt-input" type="number" name="age" placeholder="Idade..." />
                    <input type="hidden" name="access" value="USER" />
                    <input type="hidden" name="dataRegisto" value="{}" />
                    <div class="w3-btn w3-dark-gray dt-round w3-margin" onClick={handleRegister}>Registar</div>
                </form>
            </div>
            <div class="dt-footer-login">
                <h5 class="w3-center">Made with 🧠 PRI2020</h5>
            </div>
        </div>
    );
}

export default Login;