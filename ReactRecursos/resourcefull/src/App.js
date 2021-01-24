import './stylesheets/style.css';
import './stylesheets/docstyles.css';
import './stylesheets/instyles.css';

import Login from './components/login'
import ProtectedRoute from './components/protectedRoute'
import {ProvideAuth} from './contexts/authcontext'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import HomeScreen from './components/homeScreen';
import Recursos from './components/recursos';

function App() {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route exact path="/users/login">
            <Login/>
          </Route >
          <ProtectedRoute path="/">
            <Route exact path='/recursos'>
              <Recursos />
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
