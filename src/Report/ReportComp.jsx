import React,{ Component } from 'react';
import {connect} from 'react-redux';
import {increment,decrement} from '../Store/actions';
import WithErrorHandler from '../HOC/withErrorHandler';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Header from '../Header/Header';

import { withStyles, withTheme  } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class Home extends Component {
    /* constructor(props) {
      super(props);
      this.state = {date: new Date()};
    } */
      
    state = {     
      counter:'',
      new_member_name:'',
      new_member_acc:'',
      referrer_name:'',
      referrer_acc:'',
      dateFrom:'',
      dateTo:'',
      branch:'',
      mergeDate:{
        fromDate:'',
        toDate:'',
      }
    }    

    componentDidMount() {

    const token = sessionStorage.getItem('token');
    const email = sessionStorage.getItem('email');
    const username = sessionStorage.getItem('username');   
      
   if( (!token&&!username&&!email) ){  this.props.history.replace('/login');  }

   this.tick();

   this.dateReport();

  }   

  setMergeDate(){

    // this.setState({mergeDate:{this.state.dateFrom}})
  }


  dateReport(){

    axios.post('http://localhost/member-referral/public/api/reports', this.state.mergeDate)                               
    .then(response => { 
        
        if(response.data.status === 1)
        {       
          console.log(response.data);
        }
                              
    }).catch(error => {                
                   console.log('date report Error', error)
     })

  }


    componentDidUpdate(){ }
  
    componentWillUnmount() { }

    tick() {
      var date = new Date(); // Or the date you'd like converted.
      var isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 10);      
      this.setState({ dateFrom: isoDateTime });
      this.setState({ dateTo: isoDateTime });
   }
  
    render() {
      
      const {classes} = this.props;
      let helperMemberACC = '';
      let helperReferrerACC = '';

     if( isNaN(this.state.new_member_acc)){ helperMemberACC = 'Incorrect entry, number required'}
     if( isNaN(this.state.referrer_acc)){ helperReferrerACC = 'Incorrect entry, number required'}

      return (  
        
      <div className={classes.root }>
        <Header />
      <Grid container  alignItems="center" justify="center" >

      <Grid item xs={12} md={10}  className="mt-4">
        <Card >
          <CardContent >

      {/* ***************************************************************** */}
      <Grid container alignItems="center" justify="center" >
      <Grid item xs={12} md={8}  >

          <form  autoComplete="off"> {/*noValidate */}
      
        <br/><br/>

      {/* -------------------------  Date --------------------- */}
<div style={{width:'50%', display:'inline'}} className="ml-5 mr-5 pr-5 w-50"> 
      <TextField
        id="dateFrom"
        label="From Date"
        type="date"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        value={this.state.dateFrom}
        onChange={(e) => this.setState({dateFrom: e.target.value})}
      />
      </div >

      <div style={{width:'50%', display:'inline'}} >
      <TextField
      
        id="dateTo"
        label="To Date"
        type="date"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        value={this.state.dateTo}
        onChange={(e) => this.setState({dateTo: e.target.value})}
      /></div>

  

        <br/><br/><br/>
     <Button size="medium" type="submit" className='bg-primary text-white float-right'>Download</Button>
    </form>
    </Grid></Grid>


    <h1>{this.state.customer_name}</h1>

    {/* ******************************************************************* */}
          </CardContent>

      {/* <CardActions className="float-right">
        <Button size="medium" className='bg-success text-white'>Submit</Button>
      </CardActions> */}


    </Card>
        </Grid>

  
      </Grid>

      {/*     <h1>Hello, world! </h1>
        <button onClick={() => this.props.decrement(14)}>
          Decrement
        </button>
          <h1>Redux Counter: {this.props.counter} </h1>
          <h1>Redux Counter: {this.props.counting} </h1>
  */}
          
        </div>
      );
    }
  }
  
  const mapStateToProps = state => ({
    counter: state.counter,
    counting: state.counting
  });

  const mapDispatchToProps = (dispatch) => {
    return {
      increment: (val) => dispatch(increment(val)),
       decrement:(val) => dispatch(decrement(val))
  
    };
  };

 export default connect(mapStateToProps,mapDispatchToProps )(withTheme(withStyles(styles)(WithErrorHandler(Home, axios))));