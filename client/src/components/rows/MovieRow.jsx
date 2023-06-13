import React,{useReducer, useState} from 'react'
import '../../styles/App.css'
import { movies } from '../data'


const InitialState = new Array(movies.length).fill(false);
const movieReducer = (state, {type,id}) => {
    switch (type) {
      case "CHANGE_VALUE":
        console.log(state)
        return state.map((item,index)=>{ return(index==id)?  true:false })
      default:
        return state;
    }
  };


const MovieRow = ({setMovieName}) => {
  const [movieState, dispatch] = useReducer(movieReducer, InitialState);


  const handelClick = (index,movie)=>{
    setMovieName(movie)
    dispatch({type: "CHANGE_VALUE", id: index})
  }

  return (
    <div className='movie-row'>
    <h3>Select A Movie</h3>
    {  
        
        movies.map((movie,index)=>(
            <div  onClick={()=>{handelClick(index,movie)}} key={index} className={`movie-column ${movieState[index]? "movie-column-selected": ""}`} >{movie}</div>
            ))
    }
        
    </div>
  )
}

export default MovieRow