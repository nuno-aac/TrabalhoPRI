import './stylesheets/style.css';
import './stylesheets/docstyles.css';
import './stylesheets/instyles.css';

import ProtectedRoute from './components/protectedRoute'
import {ProvideAuth} from './contexts/authcontext'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Login from './components/login'
import Register from './components/register';
import HomeScreen from './components/homeScreen';
import Recursos from './components/recursos';
import Recurso from './components/recurso';

function App() {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route exact path="/users/login">
            <Login/>
          </Route >
          <Route exact path="/users/register">
            <Register />
          </Route >
          <ProtectedRoute path="/">
            <Route exact path='/recursos'>
              <Recursos />
            </Route>
            <Route exact path='/recurso/:id'>
              <Recurso />
            </Route>
            <Route exact path='/'>
              <HomeScreen />
            </Route>
          </ProtectedRoute>
        </Switch >
      </Router>
    </ProvideAuth>
  );
}

export default App;
