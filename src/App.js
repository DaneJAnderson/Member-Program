import React,{ Component, Suspense } from 'react';
// import logo from './logo.svg';
import './App.css';
import Home from './Home/HomeComp';
// import Login from './Login/LoginComp';

// import asyncComponent from './HOC/asyncComponent';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  // useRouteMatch,
  // useParams,  
 
} from "react-router-dom";


/* const asyncLogin = asyncComponent(() => 
{
  return import('./Login/LoginComp');
}); */


const OtherComponent = React.lazy(() => import('./Login/LoginComp'));

class App extends Component{


  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
  

render() {
  

  return (
    <Router>
    <div className="App">
     
      <Switch>
        {/* <Route path="/login" component={Login} />        */}
        {/* <Route path="/login" component={asyncLogin} />   */}
        <Suspense fallback={<div>Loading...</div>}>
        <Route path="/login" component={OtherComponent} /> 


       <Route exact path="/"><Home/></Route>
        </Suspense>     
      </Switch>
    </div>
    </Router>
  );
}
}

export default App;
