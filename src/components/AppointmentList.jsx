import AppointmentDetail from "./AppointmentDetail";

const AppointmentList = (prop) => {

    const appointments=prop.appointments
    return ( 
        <>
         <div>
    
    {appointments && appointments.map((item)=>{
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