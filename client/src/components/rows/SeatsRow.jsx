import React,{useEffect, useReducer, useState} from 'react'
import '../../styles/App.css'
import { seats} from '../data'

let seatsObj = {}

for (let i =0;i<seats.length;i++){
  seatsObj[seats[i]] = 0
}

const InitialState = new Array(seats.length).fill(false);
const InitialSeatState = seatsObj;

const reducer = (state, {type,id}) => {
    switch (type) {
      case "CHANGE_VALUE":
        console.log(state)
        return state.map((item,index)=>{ return(index==id)?  true:false })
      default:
        return state;
    }
  };

  const seatReducer = (state, {type,num,seat}) => {
      switch (type) {
        case "CHANGE_VALUE":
          return {...state, [seat]:num}
        default:
          return state;
      }
    };

const SeatRow = ({seatState,seatDispatch}) => {

  const [state, dispatch] = useReducer(reducer, InitialState);

  
 
  

  return (
    <div className='seat-row'>
    <h3>Select a Time seat</h3>
    {  
        seats.map((seat,index)=>(
            <div  onClick={()=>{dispatch({type: "CHANGE_VALUE", id: index})}} key={index} className={`seat-column ${state[index]? "seat-column-selected": ""}`} >
              <div>{`Type ${seat}`}</div>
              <div style={{paddingTop: '1rem'}}>
                  <input min='0' value={seatState[seat]} onChange={(e)=>seatDispatch({type:"CHANGE_VALUE" ,num:e.target.value, seat:seat })} type='number' id={`seat-${seat}`}/>
              </div>
            </div>
            ))
    }
        
    </div>
  )
}

export default SeatRow