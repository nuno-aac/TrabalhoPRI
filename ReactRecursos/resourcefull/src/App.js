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
import Post from './components/post';
import Profile from './components/profile';
import EditProfile from './components/editProfile';

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
            <Route exact path='/post/:id'>
              <Post />
            </Route>
            <Route exact path='/users/me'>
              <Profile />
            </Route>
            <Route exact path='/users/edit'>
              <EditProfile />
            </Route>
          </ProtectedRoute>
        </Switch >
      </Router>
    </ProvideAuth>
  );
}

export default App;
