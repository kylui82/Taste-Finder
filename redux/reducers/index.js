import { ADD_TEXT, REMOVE_TEXT, MODIFY_TEXT } from "../actionTypes/index";



export function Add_text(item){
  return{
    type: ADD_TEXT,
    payload:{
      title: item
    }
  }
}

export function Remove_text(item){
  return{
    type:REMOVE_TEXT,
    payload:{
      title: item
    }
  }
}

export function Modify_text(item, value){
  return{
    type:MODIFY_TEXT,
    payload:{
      title: item,
      newValue: value
    }
  }
}
