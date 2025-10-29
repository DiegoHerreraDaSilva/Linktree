import { type ReactNode, useEffect, useState } from "react";

import { auth } from "../services/firebaseconnection";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

interface PrivateProps{
  children: ReactNode; 
}

export function Private({ children}: PrivateProps): any{
  const [loading, setLoading] = useState(true)
  const [signed, setSigned] = useState(false);
 
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if(user){
        const userData = {
          uid: user?.uid,
          email: user?.email
        }

        localStorage.setItem("@reactlinkss", JSON.stringify(userData))
        setLoading(false);
        setSigned(true);

      }else{
        setLoading(false);
        setSigned(false);
      }
    })  

    return() => { // Para de monitorar a página ao sair do /admin
      unsub();
    }

  }, [])

  if(loading){
    return <div></div>
  }

  if(!signed){
    return <Navigate to="/login"></Navigate>
  }

  return children;
}