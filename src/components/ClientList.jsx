import ClientDetail from "./ClientDetail";

const ClientList = (prop) => {

    const clients=prop.clients
    
    return ( 
        <>
        <h1>All clients list:</h1>
        <div>
    
            {clients && clients.map((item)=>{
                return(
                <div key={item.clientId}>
                    <ClientDetail item={item}/>
                </div>
                )
                
            })}
        </div>
        </>
     );
}
 
export default ClientList;