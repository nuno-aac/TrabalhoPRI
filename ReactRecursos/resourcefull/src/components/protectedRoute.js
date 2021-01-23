import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import '../stylesheets/instyles.css';

import {
    Route,
    Redirect,
} from "react-router-dom";
import { useAuth } from '../contexts/authcontext';
import { useEffect, useState } from 'react';

function ProtectedRoute({ children, ...rest }) {
    let [loading,setLoading] = useState(true);
    let auth = useAuth();

    useEffect(() => {
        auth.findsession(() => {
            setLoading(false)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        loading ? (<></>) : 
            <Route
                {...rest}
                render={({ location }) =>
                    auth.user ? (
                        children
                    ) : (
                            <Redirect
                                to={{
                                    pathname: "/users/login",
                                    state: { from: location }
                                }}
                            />
                        )
                }
            />
    );
}

export default ProtectedRoute;