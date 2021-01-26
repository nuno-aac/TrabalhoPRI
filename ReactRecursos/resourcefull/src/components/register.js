import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


function Login() {
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    let [name, setName] = useState('')
    let [email, setEmail] = useState('')
    let [age, setAge] = useState('')

    let history = useHistory();

    function handleRegister() {
        axios.post('http://localhost:6969/users/register',{id:username,password:password,nome:name,email:email,age:age})
        .then(dados => {
            console.log(dados)
            history.push("/users/login");
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="dt-background">
            <div class="dt-header-login dt-align-center">
                <img class="dt-header-logo" alt="Logo" src="/images/logorelevo.png" />
                <h1 class="dt-name">Resourcefull</h1>
            </div>
            <div class="dt-login-container">
                <div class="dt-register dt-round w3-padding-left w3-padding-right">
                    <form class="w3-container dt-login-form" action="/users/register" method="POST">
                        <input className="w3-input w3-margin-bottom dt-input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username..." />
                        <input className="w3-input w3-margin-bottom dt-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password..." />
                        <input className="w3-input w3-margin-bottom dt-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome..." />
                        <input className="w3-input w3-margin-bottom dt-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email..." />
                        <input className="w3-input w3-margin-bottom dt-input" type='number' value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age..." />
                        <div class="w3-btn w3-dark-gray dt-round w3-margin" onClick={handleRegister}>Registar</div>
                            
                    </form>
                </div>
            </div>
            <div class="dt-footer-login">
                <h5 class="w3-center">Made with 🧠 PRI2020</h5>
            </div>
        </div>
    );
}

export default Login;