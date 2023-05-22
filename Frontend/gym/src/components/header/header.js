
import "../header/header.css"
import { IoMdNotifications } from "react-icons/io";
import { GoCalendar } from "react-icons/go";
import { useEffect } from "react";


let datenow = new Date()
let month = ["January","February" , "March" ,"April" , "May" , "June" , "July" , "August" , "September" , "October","November","December"]

 const getmonth = ()=>{
    return month[datenow.getMonth()]
 }
 function gethours(){
    return datenow.getHours()
}
function getminutes(){
    return datenow.getMinutes()
}

function Header () {

    useEffect(()=>{
        gethours()
        getminutes()
    },[])
    return (  
    <div className="header"> 
        <div className="Not_Time">
        <div className="time_date">
                <div className="clock">
                <GoCalendar style={{color:"#393A3C"}}/>
                </div>
                <div className="time">
                <span> {datenow.getDate()} {getmonth()} {datenow.getFullYear()}  </span>
                </div>
            </div>
            <div className="not" >
            <IoMdNotifications style={{color:"#393A3C"}}/>
            </div>
       
        </div>
    </div>
    );
}

export default Header;