const ClientDetail = (prop) => {
    const client=prop.item
    return (<> 
        <ul>
            <li>Client ID: {client.clientId}</li>
            <li>Full Name: {client.fullName}</li>
            <li>Contact: {client.fullName}</li>
            <textarea placeholder="Note:" defaultValueKs={client.note} readOnly="true"></textarea>

        </ul>

    </> );
}
 
export default ClientDetail;