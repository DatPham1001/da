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
        {/* <ProtectedRoute exact path="/" component={Dashboard}></ProtectedRoute>
        <ProtectedRoute exact path="/contacts" component={Contact}></ProtectedRoute>
        <ProtectedRoute exact path="/jobs" component={Job}></ProtectedRoute>
        <ProtectedRoute exact path="/accounts" component={Account}></ProtectedRoute> */}
         <Route exact path="/" component={Dashboard}></Route>
        <Route exact path="/contacts" component={Contact}></Route>
        <Route exact path="/jobs" component={Job}></Route>
        <Route exact path="/accounts" component={Account}></Route>
      </Switch>

    </BrowserRouter>
  );
}

export default App;
