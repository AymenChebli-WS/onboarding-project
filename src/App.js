import './App.css';
import Header from './components/Header'
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import AddEditRecruit from './components/AddEditRecruit';
import Home from './components/Home';
import ListRecruit from './components/ListRecruit';
import Navigbar from './components/navigation/Navigbar';
import Sidebar from './components/navigation/Sidebar';
import ViewRecruit from './components/ViewRecruit';
import NoSuchPage from './components/NoSuchPage';
import Login from './components/Auth/Login';
import { AuthProvider } from './components/Auth/Status';
import PrivateRoute from './components/Auth/PrivateRoute';
import MainComp from './components/MainComp';
import ListEvaluations from './components/Evaluations/ListEvaluations';
import AllEvaluations from './components/Evaluations/AllEvaluations';
import ReactNotification from 'react-notifications-component';
import 'animate.css';
import 'react-notifications-component/dist/theme.css';



function App() {
  return (
    <div className="parent">
      <ReactNotification />
      <AuthProvider>
      <Router>
        <div>
        <div className="Parent">
            <Navigbar />
            <Sidebar />
            <Route exact path="/login" component={Login} />
            <div className="contentS">
                    <PrivateRoute exact path="/" component={Home} />
                    <PrivateRoute exact path="/list-recruit" component={ListRecruit} />
                    <PrivateRoute exact path="/addedit-recruit" component={AddEditRecruit} />
                    <PrivateRoute exact path="/update-recruit/:id" component={AddEditRecruit} />
                    <PrivateRoute exact path="/view-recruit/:id" component={ViewRecruit} />
                    <PrivateRoute exact path="/list-evaluations" component={AllEvaluations} />
            </div>
        </div>
        </div>
      </Router>
    </AuthProvider>
        
        
    </div>
  );
}

export default App;
