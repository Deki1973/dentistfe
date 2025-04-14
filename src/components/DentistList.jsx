import DentistDetail from "./DentistDetail";

const DentistList = (props) => {

    const dentists=props.dentists

    return ( <>
     <div>
    
    {dentists && dentists.map((item)=>{
        return(
        <div key={item.dentistId}>
            <DentistDetail item={item}/>
        </div>
        )
        
    })}
</div>
    </> );
}
 
export default DentistList;