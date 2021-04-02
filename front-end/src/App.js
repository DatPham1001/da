import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Component/Login';
import { ProtectedRoute } from './ProtectedRoute';
import Home from './Component/Home';
import Dashboard from './Component/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login}></Route>
        <ProtectedRoute exact path="/" component={Dashboard}></ProtectedRoute>
      </Switch>

    </BrowserRouter>
  );
}

export default App;
