import React,{useReducer, useState} from 'react'
import '../../styles/App.css'
import { slots } from '../data'

const InitialState = new Array(slots.length).fill(false);

const reducer = (state, {type,id}) => {
    switch (type) {
      case "CHANGE_VALUE":
        console.log(state)
        return state.map((item,index)=>{ return(index==id)?  true:false })
      default:
        return state;
    }
  };


const SlotRow = ({setSlotTime}) => {
  const [slotstate, dispatch] = useReducer(reducer, InitialState);
  

  const handelClick = (index,slot)=>{
    setSlotTime(slot)
    dispatch({type: "CHANGE_VALUE", id: index})
  }

  return (
    <div className='slot-row'>
    <h3>Select a Time slot</h3>
    {  
        
        slots.map((slot,index)=>(
            <div  onClick={()=>{handelClick(index,slot)}} key={index} className={`slot-column ${slotstate[index]? "slot-column-selected": ""}`} >{slot}</div>
            ))
    }
        
    </div>
  )
}

export default SlotRow