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
import UserProfile from './components/userProfile';
import RecursosSelf from './components/recursosSelf';
import EditPost from './components/editPost';
import NotFound from './components/notFound';

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
          <ProtectedRoute>
            <Switch>
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
              <Route exact path='/post/edit/:id'>
                <EditPost />
              </Route>
              <Route exact path='/user/me'>
                <Profile />
              </Route>
              <Route exact path='/users/:id'>
                <UserProfile />
              </Route>
              <Route exact path='/user/edit'>
                <EditProfile />
              </Route>
              <Route exact path='/recursos/mine'>
                <RecursosSelf />
              </Route>
              <Route exact path='*' >
                <NotFound />
              </Route>
            </Switch>
          </ProtectedRoute>
        </Switch >
      </Router>
    </ProvideAuth>
  );
}

export default App;
