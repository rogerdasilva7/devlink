import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebaseConnection";
import { useState, useEffect } from "react";
import { Navigate } from "react-router";


export function Private({children}: any){
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if(user){
                const userData = {
                    uid: user?.uid,
                    email: user?.email
                }
                localStorage.setItem("@devlink", JSON.stringify(userData))
                setLoading(false);
                setSigned(true);
            }else{
                setLoading(false);
                setSigned(false);
            }
        })
        return () => {
            unsub();
        }
    },[])

    if(loading){
        return(
            <div>
                <h3 className="text-white flex items-center justify-center ">Carregando...</h3>
            </div>
        )
    }

    if(!signed){
        return <Navigate to={"/login"}/>
    }

    return children;
}