export const counter = (state = 0, action) =>{

    switch(action.type){

        case "INCREMENT":
            return state + 1
        case "DECREMENT":
            return state - 1;
        default: return state;
    }
}

export const counting = (state = 0, action) =>{

    switch(action.type){

        case "INCREMENT":
            return state + 1
        case "DECREMENT":
            return state + action.payload;
            default: return state;
    }
}

