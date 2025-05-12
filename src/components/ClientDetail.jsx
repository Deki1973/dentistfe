import './styles/ClientStyle.scss'

const ClientDetail = (prop) => {
    const client=prop.item
    return (<div className='clientDetail'> 
    <p>Client Detail 1</p>
        <ul>
            <li>Client ID: {client.clientId}</li>
            <li>Full Name: {client.fullName}</li>
            <li>Contact: {client.contact}</li>
            <textarea placeholder="Note:" value={client.note} readOnly="true"></textarea>

        </ul>

    </div> );
}
 
export default ClientDetail;