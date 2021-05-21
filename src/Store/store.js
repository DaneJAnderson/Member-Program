import { createStore, combineReducers } from 'redux';
import {counter,counting} from './reducer';
import {increment, decrement} from './actions';


// Combine Reducers 
const allReducers = combineReducers({
    counter, counting
});


// let store = createStore(counter);
const store = createStore(allReducers);

// Display State in console
// store.subscribe(()=>console.log(store.getState()));

// DISPATCH === CALL an Action(task name or vue mutation NAME)
store.dispatch(increment());
store.dispatch(decrement());

export default store;