import React, { useState, useEffect } from 'react';
import WithErrorHandler from '../HOC/withErrorHandler';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

/* import {useSelector,useDispatch} from 'react-redux';
import {increment,decrement} from '../Store/actions';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx'; */

/* const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {   
    width: '100%',
  },
})); */

    const Login = (props) =>{

  // const classes = useStyles();
  let history = useHistory();
  const [postLogin, setpostLogin] = useState({
    username:'',
    password:'',
    ldap: 'everybody',
  });

  // const [logTimes, setLogTimes] = useState(0);   

  const [values, setValues] = React.useState({
   
    password: '',
    username: '',    
    showPassword: false    
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const submit = (event)=>{
    setpostLogin({...postLogin,password:values.password,username:values.username});
    // console.log(postLogin);
  }

  const [auth, setAuth] = useState('');
  const incorrect =
    <h4 className="text-center text-danger mt-4">{auth}</h4>;

  // --------------------------------------------------------------------------- // 

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
      // Update the document title using the browser API
     
      document.title = `Sign-in`;
      let mounted = true;

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('email');


      return new Promise((resolve, reject) => {        
        axios.post('http://localhost/intranet/public/api/userlogin', postLogin)                               
        .then(response => {  
            // resolve(response);   
            if(response.data.status === 1)
            { 
            sessionStorage.setItem('token', response.data.token);             
            sessionStorage.setItem('username', response.data.username);             
            sessionStorage.setItem('email', response.data.email);   
            history.replace('/');            
            }
            else{
              setAuth(response.data.status);
            }                      
            // localStorage.setItem('token', response.data.token);             
            // localStorage.setItem('username', response.data.username);             
        }).catch(error => {                
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('email');
            // localStorage.removeItem('token');
            // localStorage.removeItem('username');
            // reject(error);           
         })

        })
      

    },[postLogin,history]);
    // ------------------------- End useEffect ----------------------------- //
  
    return (
      <div>

<Grid container  alignItems="flex-end" justify="center" >

<Grid item xs={12} md={8}  className="mt-5 pt-5">
  <Card >
    <CardContent className=''>

  
{/* ------------------------------  Tilte ---------------------- */}

      <Grid container item xs={12} md={12} justify="center" alignItems="flex-end"   className="">

      <h1 className="text-primary text-center mb-5 mt-2">COK Member Referral</h1>

      </Grid>

{/* ------------------------------------------------------- */}   

<Grid container alignItems="center" justify="center" >
      <Grid item xs={12} md={6}  className="" >


{/* --------------------------- Username ---------------------------  */}
  

  <FormControl className="w-100 m-2"  variant="outlined">{/*className={clsx(classes.margin, classes.textField)}*/}
  <InputLabel htmlFor="outlined-adornment-password">Username</InputLabel>
          <OutlinedInput
            id="outlined-adornment-username"
            value={values.username}
            onChange={handleChange('username')}
            // endAdornment={<InputAdornment position="end">DeskTop Username</InputAdornment>}
            aria-describedby="outlined-username-helper-text"
            inputProps={{
              'aria-label': 'username',
            }}
            labelWidth={75}
          />
          {/* <FormHelperText id="outlined-username-helper-text">Username</FormHelperText> */}
        </FormControl>

{/* ---------------------------- Password Field ------------------------------ */}

<FormControl className="w-100 m-2 mt-3" variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={75}
          />
</FormControl>

</Grid></Grid>

{incorrect}

</CardContent>

<CardActions className="float-right">
{/* <Link to='/' style={{ textDecoration: 'none' }} > */}
  <Button onClick={submit} size="medium" className='bg-primary text-white'>
  login</Button>
  {/* </Link> */}
</CardActions>

</Card>
  </Grid>
 
</Grid>

      </div>
    );
  
} 

Login.defaultProps = {name: 'jonny'}

export default WithErrorHandler(Login, axios);

// export default connect(mapStateToProps,mapDispatchToProps )(withTheme(withStyles(styles)(WithErrorHandler(Login, axios))));






























// --- Declaration ---------------------------------- //

  
/* const counter = useSelector(state => state.counter);
const counting = useSelector(state => state.counting);
const dispatch = useDispatch();

const [count, setCount] = useState(0);
const [thing, setThing] = useState({}); */


// Place in useEffects ------------------------------------------------------//

/* // axios.get('http://localhost/agm-api.php') 
      axios.get('http://localhost/intranet/public/api/userlogin')
      .then(res =>{


        if(  logTimes === 0 && mounted){

          if(res.data.entries.length > 0){

            setThing(res.data);

            console.log(thing);

           setLogTimes(res.data.entries.length);

          //  console.log('logTimes ', logTimes);
          }    
        }
       
      }).catch( error =>{
          console.log('The ERRoR: ', error);
      })

  
    if(logTimes > 0){

      return () => { mounted = false };
    } */


// ------------------------------------------------------------------ //


    // Place in Render -------------------------------------------- //

    
       /*  <p>You clicked {count} times</p>

        <h1>{counter}</h1>
        <h1>{counting}</h1>
        
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
        <button onClick={() => dispatch(decrement(8))}>
          Decrement
        </button> */


        // ---------------------------------------------------- //

