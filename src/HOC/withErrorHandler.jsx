import React from 'react';
// import axios from 'axios';

function WithErrorHandler(WrappedComponent, axios) {
    return class extends React.Component {

     /*  constructor(props){

        super(props);

      } */

        state ={ 
            error:null
        }

      componentDidUpdate(prevProps) {
        console.log('Current props: ', this.props);
        console.log('Previous props: ', prevProps);
      }

      componentWillUnmount(){

        axios.interceptors.request.eject(this.intReq);
        axios.interceptors.response.eject(this.intRes);
      }

      componentDidMount() {

        this.intReq = axios.interceptors.request.use(req =>{
            this.setState({error: null});
            return req;
        })
        this.intRes = axios.interceptors.response.use(res => res, error =>{
            this.setState({error: error});
        });
      }
      render() {
        // Wraps the input component in a container, without mutating it. Good!
        let error;
        if(this.state.error){
              error = <h1>We Have Errors ???</h1>
        }
        else {
            error = <h1>We are Good !!!</h1>
        }
        return(            
            <div >
                {/* {error} */}
                
                <WrappedComponent {...this.props} />
            </div>
        ) ;
      }
    }
  }

  export default WithErrorHandler;