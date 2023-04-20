import { INCREMENT } from "../actiontypes/index";



export function Increment(c){
  return{
    type: INCREMENT,
    payload:{
        count: c
    }
  }
}