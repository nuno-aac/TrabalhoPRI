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

function App() {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route path="/users/login">
            <Login/>
          </Route >
          <ProtectedRoute path="/">
            <HomeScreen/>
          </ProtectedRoute>
        </Switch >
      </Router>
    </ProvideAuth>
  );
}

export default App;
