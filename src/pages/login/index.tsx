import { Link, useNavigate } from "react-router";
import { Input } from "../../components/Input";
import { useState, type FormEvent } from "react";
import { auth } from "../../services/firebaseConnection"
import { signInWithEmailAndPassword } from "firebase/auth";


export function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    function captureInfo(e: FormEvent){
        e.preventDefault()
        if(email === "" || password === ""){
            alert("Preencha os campos email e senha")
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            console.log("logado com sucesso!")
            navigate("/admin", {replace: true})
        }).catch((error) => {
            console.log("ocorreu um erro inesperado!")
            console.log(error)
        })
    }

    return(
        <div className="flex w-full h-screen items-center justify-center flex-col">
            <Link to={"/"}>
                <h1 className="text-white mt-11 mb-7 font-bold text-5xl">Dev 
                    <span className="bg-gradient-to-r from-blue-800 to-purple-900 bg-clip-text text-transparent">Link</span>
                </h1>
            </Link>

            <form className="w-full max-w-xl flex flex-col" onSubmit={captureInfo}>
                <Input placeholder="Digite seu email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <Input placeholder="***********" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button className="text-white bg-blue-800 p-2 rounded-lg hover:bg-blue-600 transition duration-400 ease-in-out- cursor-pointer" type="submit">Acessar</button>
            </form>
        </div>
    )
}; 