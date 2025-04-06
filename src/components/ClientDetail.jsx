const ClientDetail = (prop) => {
    const client=prop.item
    return (<> 
        <ul>
            <li>Client ID: {client.clientId}</li>
            <li>Full Name: {client.fullName}</li>
            <li>Contact: {client.contact}</li>
            <textarea placeholder="Note:" value={client.note} readOnly="true"></textarea>

        </ul>

    </> );
}
 
export default ClientDetail;