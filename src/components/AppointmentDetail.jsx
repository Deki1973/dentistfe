const AppointmentDetail = (prop) => {
    const item=prop.item
    return ( <>
    <h3>Appointment detail</h3>
    <ul>
        <li>ID: {item.appointmentId}</li>
        <li>Description: {item.description}</li>
    </ul>
    </> );
}
 
export default AppointmentDetail;