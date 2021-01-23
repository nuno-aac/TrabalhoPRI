import { createContext, useContext, useState } from "react";
import axios from 'axios'

const authContext = createContext();

function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

function useAuth() {
    return useContext(authContext);
}

const serverAuth = {
    isAuthenticated: false,
    signin: (username,password,cb) => {
        axios.post('http://localhost:6969/users/login', { id: username, password: password }, { withCredentials: true })
            .then(dados => {
                console.log(dados)
                if(dados.status === 201) serverAuth.isAuthenticated=true
                cb(dados.data)
            })
            .catch(err => {
                alert('Wrong credentials...')
                console.log(err)
                cb(null)
            })
    },
    findsession: (cb) => {
        axios.get('http://localhost:6969/', { withCredentials: true })
            .then(dados => {
                console.log(dados)
                if (dados.status === 201) serverAuth.isAuthenticated = true
                cb(dados.data)
            })
            .catch(err => {
                console.log(err)
                cb(null)
            })
    },
    signout(cb) {
        axios.get('http://localhost:6969/users/logout', { withCredentials: true })
            .then(dados => {
                console.log(dados)
                if (dados.status === 201) serverAuth.isAuthenticated = false
                cb(null)
            })
            .catch(err => {
                console.log(err)
                cb(null)
            })
    }
};

function useProvideAuth() {
    const [user, setUser] = useState(null);

    const signin = (us,pass,cb) => {
        return serverAuth.signin(us,pass,(u => {
            setUser(u);
            cb();
        }));
    };

    const findsession = (cb) => {
        return serverAuth.findsession(u => {
            setUser(u);
            cb();
        });
    };

    const signout = cb => {
        return serverAuth.signout(u => {
            setUser(u);
            cb();
        });
    };

    return {
        user,
        signin,
        findsession,
        signout
    };
}

export {useAuth, ProvideAuth};