import { createContext, useContext, useEffect, useState } from "react";

const JwtContext = createContext(null);

export const useJwt = () => {
  return useContext(JwtContext);
};



export const JwtProvider = ({ children }) => {
    
  
    
    const [jwt2,setJwt2]=useState()
  
    const getJwt=async()=>{
        const userName="foo1"
        const passWord="foofoo1"
        console.log(userName+"|"+passWord)

        const response=await fetch(`http://localhost:8080/api/users/authenticate`,
            {
                method:"POST",
                mode:"cors",
                headers: {
                   
                 'Content-Type': 'application/json',
                 
                },
                body:JSON.stringify({
                    username:userName,
                    password: passWord
                })
                
                
            }
        )
        console.log(response)
        const json1=await response.json()
        console.log(json1)
        const data1=json1.data.toString()
        console.log(data1)
        setJwt2(data1)
        localStorage.setItem("jwt2",data1)

    }

   
    const changeJwt = () => {
        getJwt();
    };
  
    useEffect(() => {

    
    }, []);
    return (
      <JwtContext.Provider value={{ changeJwt, jwt2 }}>
        {children}
      </JwtContext.Provider>
    );
  };

