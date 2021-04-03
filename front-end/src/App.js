import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Component/Login';
import { ProtectedRoute } from './ProtectedRoute';
import Home from './Component/Home';
import Dashboard from './Component/Dashboard';
import Contact from './Component/Contact/Contact';
import Job from './Component/Jobs/Job';
import Account from './Component/Account/Account';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login}></Route> 
        <ProtectedRoute exact path="/" component={Dashboard}></ProtectedRoute>
        <ProtectedRoute exact path="/contacts" component={Contact}></ProtectedRoute>
        <ProtectedRoute exact path="/jobs" component={Job}></ProtectedRoute>
        <ProtectedRoute exact path="/accounts" component={Account}></ProtectedRoute>
      </Switch>

    </BrowserRouter>
  );
}

export default App;
