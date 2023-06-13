import React, { useState,useReducer, useEffect} from "react";
import '../styles/App.css'
import '../styles/bootstrap.min.css'
import MovieRow from "./rows/movieRow";
import SlotRow from "./rows/SlotRow";
import SeatRow from "./rows/SeatsRow";
import { seats } from "./data";

let seatsObj = {}

for (let i =0;i<seats.length;i++){
  seatsObj[seats[i]] = 0
}


const InitialSeatState = seatsObj;


const seatReducer = (state, {type,num,seat}) => {
  switch (type) {
    case "CHANGE_VALUE":
      return {...state, [seat]: Number(num)}
    default:
      return state;
  }
};






const App = () =>{
    const [movieName,setMovieName] = useState(null)
    const [sloatTime,setSlotTime] = useState(null)
    const [seatState,seatDispatch] = useReducer(seatReducer,InitialSeatState);
    const [latestMovie,setLatestMovie] = useState({})
    const [latestSeats,setLatestSeats] = useState({})


    const  GetLatestBookedMovie = async () => {
      try{
        await fetch('api/booking/')
          .then((res) => res.json())
          .then(data => {
            setLatestMovie(data)
            setLatestSeats(data.seats)
          });
      }catch(error){
        console.log(error)
      }
      
  }


const PostLatestBookedMovie  = async () => {

  const postReq =  await fetch('api/booking/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({movie:  movieName,slot: sloatTime,  seats: seatState})
        })

        const status = postReq.status
        const postData =  await postReq.json()
        if(status === 200) {
          await GetLatestBookedMovie()
          window.location.reload();
        }else {
          alert(postData.error.message)
        }


}


    useEffect( async()=>{
       await GetLatestBookedMovie()
    },[])
    
    
    


    return (
        <React.Fragment>
            <h3>Book That Show</h3>
           
            <div style={{display:'flex' ,justifyContent: "space-evenly"}}>
                <div>
                   <MovieRow  setMovieName={setMovieName}/>
                   <SlotRow  setSlotTime={setSlotTime}/>
                   <SeatRow seatState={seatState} seatDispatch={seatDispatch}/>
                   <div className="book-button ">
                    <button onClick={()=>{PostLatestBookedMovie()}}>Book Now</button>
                  </div>
                </div>
                <div>
                   <div className="last-order">
                      <h1>LastBooking Detils</h1>
                      {
                        (latestMovie['message'])? 
                              <p>{latestMovie['message']}</p> 
                              : 
                              <React.Fragment>
                                <div>
                                <span><span style={{fontWeight: "bold"}}>seat:</span></span>
                                </div>
                                 
                                 {
                                    seats.map((seat,i)=>(
                                      <div key={i}>
                                         <span><span style={{fontWeight: "bold"}}>{seat}</span> {latestSeats[`${seat}`]}</span>
                                      </div>
                                    ))
                                 }
                                 
                                 <div>
                                        <span><span style={{fontWeight: "bold"}}>slot: </span>{latestMovie['slot']}</span>
                                 </div>

                                 <div>
                                 <span><span style={{fontWeight: "bold"}}>movie: </span>{latestMovie['movie']}</span>
                                 </div>
                                 
                              </React.Fragment>
                      }
                   </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default App