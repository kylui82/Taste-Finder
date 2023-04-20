import { INCREMENT } from "../actiontypes/index";

var initialState = {
  count: 0
}


export default function (state = initialState, action){
  if (action.type == INCREMENT){
    return {...state,
        count: action.payload.count + 1
    };
  }
  return state;
}