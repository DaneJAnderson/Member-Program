import React,{ Component } from 'react';
import {connect} from 'react-redux';
import {increment,decrement} from '../Store/actions';
import WithErrorHandler from '../HOC/withErrorHandler';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Header from '../Header/Header';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// import { withStyles, withTheme  } from '@material-ui/core/styles';

// import Paper from '@material-ui/core/Paper';

// import CardActions from '@material-ui/core/CardActions';

// import Typography from '@material-ui/core/Typography';


/* const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}); */

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
      date:'',
      branch:'',
      auth:0
    }    

    componentDidMount() {
    const token = sessionStorage.getItem('token');
    const email = sessionStorage.getItem('email');
    const username = sessionStorage.getItem('username'); 
      
   if( (!token&&!username&&!email) ){  this.props.history.replace('/login');  }

   this.tick();    

   this.handleSubmit = this.handleSubmit.bind(this);
  }   

 handleSubmit(event) {
    
   event.preventDefault();
   this.postData();
  
  this.setState({     
    counter:'',
    new_member_name:'',
    new_member_acc:'',
    referrer_name:'',
    referrer_acc:'',
    // date:'',
    branch:'',
    auth:0
    } );

    
  }

// ----------- Submit New user Data from Form ----------------- //

postData= ()=>{  

    axios.post('http://localhost/member-referral/public/api/post-data', this.state)                               
    .then(response => {         
     
        if(response.data.status === 1)
        {  
          // console.log(response.data);
          this.getReferrer(response.data.new_member_id);
        }
                              
    }).catch(error => {                
                   console.log('date report Error', error)
     })
  }

//  ------------------ Get  Referrer's compliant info Chris ------------------- //
getReferrer = (newMemberId)=>{  

    axios.post('http://localhost/member-referral/public/api/get-referrer', {account_number: this.state.referrer_acc})                               
    .then(response => { 
        

        if(response.data.status === 1)
        {  
          let data = {
            account_number: response.data.account_number,            
            compliance_status: response.data.compliance_status, 
            account_status: response.data.account_status, 
            as_at_date: response.data.as_at_date, 
            new_member_id: newMemberId,
            new_member_acc: this.state.new_member_acc,
          }
         this.postReferrer(data);
          // console.log(response.data, data);
        }
                              
    }).catch(error => {                
                   console.log('date report Error', error)
     })

  }

  //  ------------------ Update Member Referrer Database with compliant info ------------------- //

postReferrer = (data)=>{  

    axios.post('http://localhost/member-referral/public/api/post-referrer', data)                               
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
      this.setState({ date: isoDateTime });
   }
  
    render() {
      
      const {classes} = this.props;
      let helperMemberACC = '';
      let helperReferrerACC = '';

     if( isNaN(this.state.new_member_acc)){ helperMemberACC = 'Incorrect entry, number required'}
     if( isNaN(this.state.referrer_acc)){ helperReferrerACC = 'Incorrect entry, number required'}

      return (  
        
      <div style={{flexGrow:1,}}>    {/*className={classes.root }*/}
        <Header />
      <Grid container  alignItems="center" justify="center" >

      <Grid item xs={12} md={10}  className="mt-4">
        <Card >
          <CardContent className=''>

      {/* ***************************************************************** */}
      <Grid container alignItems="center" justify="center" >
      <Grid item xs={12} md={7} lg={6} className="" >

          <form style={{flexGrow:'1'}}  onSubmit={this.handleSubmit}  autoComplete="off"> {/*noValidate className={classes.root }*/}


       {/* -------------------- Member Account Number ------------ */}

        <TextField fullWidth 
          error={isNaN(this.state.new_member_acc)}
          id=""
          label="New Member Account #"
          // defaultValue="Hello World"
          helperText={helperMemberACC}
          variant="outlined"
          // placeholder =""
          onChange={(e) => this.setState({new_member_acc: e.target.value})}          
          value={this.state.new_member_acc}
          required
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
          required
        />
        <br/><br/>
                
        {/* --------------------------- Referrer's Name ------------------- */}
       
        
        <TextField fullWidth 
          error={false}
          id=""
          label="Referrer's Name"
          // defaultValue="Hello World"
          // helperText=""
          variant="outlined"
          // placeholder =""
          onChange={(e) => this.setState({referrer_name: e.target.value})}          
          value={this.state.referrer_name}
          required
        />

        <br/><br/>

         {/* ---------------- Referrer's Account Number -----------------*/}

        <TextField fullWidth 
          error={isNaN(this.state.referrer_acc)}
          id=""
          label="Referrer's Account #"
          // defaultValue="Hello World"
          helperText={helperReferrerACC}
          variant="outlined"
          // placeholder =""
          onChange={(e) => this.setState({referrer_acc: e.target.value})}          
          value={this.state.referrer_acc}
          required
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
          required
        />

        <br/><br/>

      {/* -------------------------  Date --------------------- */}

      <TextField
        id="date"
        label="Date"
        type="date"
        // defaultValue="2017-05-24"
        // defaultValue={this.state.date}
        // className={classes.textField}
        helperText="mm / dd / yyyy"
        InputLabelProps={{
          shrink: true,
        }}
        value={this.state.date}
        onChange={(e) => this.setState({date: e.target.value})}
      />

        {/* <TextField fullWidth 
          error={false}
          id=""
          label="Date"
          // defaultValue="Hello World"
          // helperText="Incorrect entry."
          variant="outlined"
          // placeholder =""
          onChange={(e) => this.setState({date: e.target.value})}          
          value={this.state.date}
          required
        /> */}

        <br/><br/><br/>
     <Button size="medium" type="submit" className='bg-success text-white float-right'>Submit</Button> {/*onClick={this.postData} */}
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

 export default connect(mapStateToProps,mapDispatchToProps )(WithErrorHandler(Home, axios));
//  export default connect(mapStateToProps,mapDispatchToProps )(withTheme(withStyles(styles)(WithErrorHandler(Home, axios))));