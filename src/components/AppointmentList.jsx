import AppointmentDetail from "./AppointmentDetail";

const AppointmentList = (prop) => {

    const appointments=prop.appointments
    const done=prop.done    // biramo sve, zavrsene i nezavrsene intervencije
    return ( 
        <>
         <div>
    
    {done!==null && appointments && appointments.filter((item)=>item.completed===done).map((item)=>{
        return(
        <div key={item.appointmentId}>
            <AppointmentDetail item={item}/>
        </div>
        )
        
    })}
    {done===null && appointments && appointments.map((item)=>{
        return(
            <div key={item.appointmentId}>
                <AppointmentDetail item={item}/>
            </div>
            )
    })}
</div>
        </>
     );
}
 
export default AppointmentList;