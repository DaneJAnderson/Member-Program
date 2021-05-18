
import React, { useState, useEffect } from 'react';
import WithErrorHandler from '../HOC/withErrorHandler';
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux';
import {increment,decrement} from '../Store/actions';


// function Login(){

    const Login = (props) =>{

    const counter = useSelector(state => state.counter);
    const counting = useSelector(state => state.counting);
    const dispatch = useDispatch();

    const [count, setCount] = useState(0);
    const [thing, setThing] = useState({});
    const [logTimes, setLogTimes] = useState(0);    

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
      // Update the document title using the browser API

      const login=()=>{

      document.title = `You clicked ${count} times`;

      axios.get('http://localhost/agm-api.php')
      .then(res =>{


        if(  logTimes === 0 ){

          if(res.data.entries.length > 0){

            setThing(res.data);

            console.log(thing);

           setLogTimes(res.data.entries.length);

           console.log('logTimes ', logTimes);
          }    
        }
       
      }).catch( error =>{
          console.log('The ERRoR: ', error);
      })
    }

    login();
      // eslint-disable-next-line react-hooks/exhaustive-deps

    },[thing,count,logTimes]);
  
    return (
      <div>
        <p>You clicked {count} times</p>

        <h1>{counter}</h1>
        <h1>{counting}</h1>
        
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
        <button onClick={() => dispatch(decrement(8))}>
          Decrement
        </button>
      </div>
    );
  
} 

Login.defaultProps = {name: 'jonny'}

export default WithErrorHandler(Login, axios);

// export default connect(mapStateToProps,mapDispatchToProps )(withTheme(withStyles(styles)(WithErrorHandler(Login, axios))));