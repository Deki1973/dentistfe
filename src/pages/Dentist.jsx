const Dentist = () => {

    const handleClick=()=>{
        console.log(localStorage.getItem("jwt1"))
    }

    return ( 
        <>
        <h1>Dentist page</h1>
        <button onClick={handleClick}>Click me</button>
        </>
     );
}
 
export default Dentist;