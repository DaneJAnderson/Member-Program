import React,{ Component } from 'react';
import {connect} from 'react-redux';
import {increment,decrement} from '../Store/actions';


class Home extends Component {
    /* constructor(props) {
      super(props);
      this.state = {date: new Date()};
    } */

    
  
    state = {
      date: new Date(),
      counter:0,
    }

    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() {
      this.setState({
        date: new Date()
      });
    }
  
    render() {
      
      return (
        <div>
          <h1>Hello, world! </h1>
          <button onClick={() => this.props.decrement(14)}>
          Decrement
        </button>
          <h1>Redux Counter: {this.props.counter} </h1>
          <h1>Redux Counter: {this.props.counting} </h1>
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
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

 export default connect(mapStateToProps,mapDispatchToProps )(Home);