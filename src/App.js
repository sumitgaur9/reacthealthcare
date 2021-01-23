import logo from './logo.svg';
import './App.css';
import React from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './Login';
import Doctoreditdisplaylist from './Doctoreditdisplaylist';
import Patienteditdisplaylist from './Patienteditdisplaylist';
import Nurseeditdisplaylist from './Nurseeditdisplaylist';
import Physioeditdisplaylist from './Physioeditdisplaylist';
import Pharmacisteditdisplaylist from './Pharmacisteditdisplaylist';
import Labtechicianeditdisplaylist from './Labtechicianeditdisplaylist';
import Medicineslist from './Medicineslist';
import Labtestlist from './Labtestlist';
import Labtestpackagelist from './Labtestpackagelist';
import Otherlinks from './Otherlinks';
import Paymentlist from './Paymentlist';
import Phamracistdashboard from './Phamracistdashboard';
import Nursedashboard from './Nursedashboard';
import Labtechniciandashboard from './Labtechniciandashboard';
import Registration from './Registration';
import Patientdashboard from './Patientdashboard';
import Doctordashboard from './Doctordashboard';



// import Navbar from './Navbar';


const App=({})=>{
  const location = useLocation();   // using this line we are able to hide header in login and registration page  this is required for router detect

  const exclusionArray = [
    '/login',
    '/',
    '/registration',
  ]
  
return (
 <div>

  {exclusionArray.indexOf(location.pathname) < 0 && <Navbar />}
    <Switch>
      <Route exact path='/' component={Login}></Route>
      <Route exact path="/login" component={Login} />
      <Route exact path="/doctorlist" component={Doctoreditdisplaylist} />
      <Route exact path="/patientlist" component={Patienteditdisplaylist} />
      <Route exact path="/nurselist" component={Nurseeditdisplaylist} />
      <Route exact path="/physiolist" component={Physioeditdisplaylist} />
      <Route exact path="/pharmacistlist" component={Pharmacisteditdisplaylist} />
      <Route exact path="/labtechnician" component={Labtechicianeditdisplaylist} />
      <Route exact path="/medicineslist" component={Medicineslist} />
      <Route exact path="/labtestlist" component={Labtestlist} />
      <Route exact path="/labtestpackagelist" component={Labtestpackagelist} />
      <Route exact path="/otherlinks" component={Otherlinks} />
      <Route exact path="/paymentlist" component={Paymentlist} />
      <Route exact path="/pharmacistdashboard" component={Phamracistdashboard} />
      <Route exact path="/nursedashboard" component={Nursedashboard} />
      <Route exact path="/labtechniciandashboard" component={Labtechniciandashboard} />
      <Route exact path="/registration" component={Registration} />
      <Route exact path="/patientdashboard" component={Patientdashboard} />
      <Route exact path="/doctordashboard" component={Doctordashboard} />

      
      
      
    </Switch>
 </div>
)
}

export default App;
