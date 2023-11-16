```javascript
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import PasswordManagementPage from './components/PasswordManagementPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={RegistrationPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/manage-passwords" component={PasswordManagementPage} />
      </Switch>
    </Router>
  );
}

export default App;
```