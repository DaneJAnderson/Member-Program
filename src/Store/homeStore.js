import { createStore, combineReducers } from 'redux';


// ACTIONS == create task names or vue mutation NAMES

const increment = (payload) => {

    return {
        type: 'INCREMENT', payload
    }
}

const decrement = (payload) => {

    return {
        type: 'DECREMENT', payload
    }
}



// REDUCER  Vue MUTATIONS === EXECUTE ACTIONS

const counter = (state = 0, action) =>{

    switch(action.type){

        case "INCREMENT":
            return state + 1
        case "DECREMENT":
            return state - 1;
        default: return 7;
    }
}

const counting = (state = 0, action) =>{

    switch(action.type){

        case "INCREMENT":
            return state + 1
        case "DECREMENT":
            return state - 1
            default: return 9;
    }
}

// Combine Reducers 

const allReducers = combineReducers({
    counter, counting
});


// CREATE STORE || Take a reducer (Mutation)

// let store = createStore(counter);
const store = createStore(allReducers);

// display 

store.subscribe(()=>console.log(store.getState()));


// DISPATCH === CALL an Action(task name or vue mutation NAME)

store.dispatch(increment());
store.dispatch(decrement());


export default store;


