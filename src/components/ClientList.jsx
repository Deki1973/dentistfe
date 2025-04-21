import ClientDetail2 from "./ClientDetail";

const ClientList = (prop) => {

    const clients=prop.clients
    
    return ( 
        <>
        <div>
    
            {clients && clients.map((item)=>{
                return(
                <div key={item.clientId}>
                    <ClientDetail2 item={item}/>
                </div>
                )
                
            })}
        </div>
        </>
     );
}
 
export default ClientList;