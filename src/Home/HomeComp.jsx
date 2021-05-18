import React,{ Component } from 'react';
import {connect} from 'react-redux';
import {increment,decrement} from '../Store/actions';
import WithErrorHandler from '../HOC/withErrorHandler';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Header from '../Header/Header';

// import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { withStyles, withTheme  } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


// const useStyles = makeStyles((theme) => ({

// Dynamic inline classes
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
      // date: new Date(),
      counter:'',
      new_member_name:'',
      new_member_acc:'',
      referrer_name:'',
      referrer_acc:'',
      date:'',
      branch:'',

    }

    componentDidMount() {
      // this.timerID = setInterval(
      //   () => this.tick(),
      //   1000
      // );

      
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() {
      this.setState({
        date: new Date()
        /* <h2>It is {this.state.date.toLocaleTimeString()}.</h2> */
      });
    }
  
    render() {

      // const classes = styles();
      const {classes} = this.props;

      return (  
        
      <div className={classes.root }>
        <Header />
      <Grid container  alignItems="center" justify="center" >

      <Grid item xs={10}  className="mt-4">
        <Card >
          <CardContent className=''>

      {/* ***************************************************************** */}
      <Grid container alignItems="center" justify="center" >
      <Grid item xs={8}  className="" >

          <form className={classes.root } noValidate autoComplete="off"> 


       {/* -------------------- Member Account Number ------------ */}

        <TextField fullWidth 
          error={false}
          id=""
          label="New Member Account#"
          // defaultValue="Hello World"
          // helperText="Incorrect entry."
          variant="outlined"
          // placeholder =""
          onChange={(e) => this.setState({new_member_acc: e.target.value})}          
          value={this.state.new_member_acc}
        />

        <br/><br/>

      
        {/* --------------------------- Member Name ------------------- */}
       

        <TextField fullWidth 
          error={false}
          id=""
          label="New Member Name"
          // defaultValue="Hello World"
          // helperText="Incorrect entry."
          variant="outlined"
          // placeholder =""
          onChange={(e) => this.setState({new_member_name: e.target.value})}          
          value={this.state.new_member_name}
        />
        <br/><br/>        


                
        {/* --------------------------- Referrer's Name ------------------- */}
       
        
        <TextField fullWidth 
          error={false}
          id=""
          label="Referrer's Name"
          // defaultValue="Hello World"
          // helperText="Incorrect entry."
          variant="outlined"
          // placeholder =""
          onChange={(e) => this.setState({referrer_name: e.target.value})}          
          value={this.state.referrer_name}
        />

        <br/><br/>



         {/* ---------------- Referrer's Account Number -----------------*/}

        <TextField fullWidth 
          error={false}
          id=""
          label="Referrer's Account#"
          // defaultValue="Hello World"
          // helperText="Incorrect entry."
          variant="outlined"
          // placeholder =""
          onChange={(e) => this.setState({referrer_acc: e.target.value})}          
          value={this.state.referrer_acc}
        />

        <br/><br/>

      {/* -------------------------------- Branch -------------------------- */}

        <TextField fullWidth 
          error={false}
          id=""
          label="Branch"
          // defaultValue="Hello World"
          // helperText="Incorrect entry."
          variant="outlined"
          // placeholder =""
          onChange={(e) => this.setState({branch: e.target.value})}          
          value={this.state.branch}
        />

        <br/><br/>

      {/* -------------------------  Date --------------------- */}
      
        <TextField fullWidth 
          error={false}
          id=""
          label="Date"
          // defaultValue="Hello World"
          // helperText="Incorrect entry."
          variant="outlined"
          // placeholder =""
          onChange={(e) => this.setState({date: e.target.value})}          
          value={this.state.date}
        />

        <br/><br/>
    
    </form>
    </Grid></Grid>


    <h1>{this.state.customer_name}</h1>

    {/* ******************************************************************* */}
          </CardContent>

      <CardActions className="float-right">
        <Button size="medium" className='bg-success text-white'>Submit</Button>
      </CardActions>
    </Card>
        </Grid>

        {/* <Grid item xs={5}  >
        <Card className=''>
      <CardContent>
        <p>This is a Card 2</p>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
        </Grid>
        */}
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