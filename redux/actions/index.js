import {ADD_ITEM, REMOVE_ITEM, MODIFY_ITEM} from "../actionTypes/index";

export function Add_item(item){
    return{
        type:ADD_ITEM,
        payload:{
            title:item
        }
    }
}

export function Remove_item(item){
    return{
        type:REMOVE_ITEM,
        payload:{
            title:item
        }
    }
}

export function Modify_item(item){
    return{
        type:MODIFY_ITEM,
        payload:{
            title:item
        }
    }
}