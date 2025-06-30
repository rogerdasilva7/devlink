import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { useEffect, useState, type FormEvent } from "react";
import { db } from "../../services/firebaseConnection";
import {
    setDoc,
    doc,
    getDoc
} from "firebase/firestore";

export function Networks(){
    const [linkedin, setLinkedin] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [github, setGithub] = useState("");

    useEffect(() => {
        function loadLinks(){
            const docRef = doc(db, "social", "link")
            getDoc(docRef)
            .then((snapshot) => {
                if(snapshot.data() !== undefined){
                    setLinkedin(snapshot.data()?.linkedin)
                    setWhatsapp(snapshot.data()?.whatsapp)
                    setGithub(snapshot.data()?.github)
                }
            })
        }

        loadLinks()
    },[])
    
    function handleRegister(e: FormEvent){
        e.preventDefault()
        setDoc(doc(db, "social", "link"), {
            linkedin: linkedin,
            whatsapp: whatsapp,
            github: github
        })
        .then(() => {
            console.log("cadastrados com sucesso")
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return(
        <div className="flex items-center flex-col min-h-screen pb-7 pr-2 pl-2">
            <Header/>

            <h1 className="text-white text-2xl font-medium mt-8 mb-4">Minhas redes sociais</h1>

            <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister}>
                <label className="text-white font-medium mt-2 mb-2">Link do Linkedin</label>
                <Input type="url" placeholder="Digite a url do Linkedin..." value={linkedin} onChange={(e) => setLinkedin(e.target.value)}/>

                <label className="text-white font-medium mt-2 mb-2">Link do WhatsApp</label>
                <Input type="url" placeholder="Digite a url do WhatsApp..." value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)}/>

                <label className="text-white font-medium mt-2 mb-2">Link do GitHub</label>
                <Input type="url" placeholder="Digite a url do GitHub..." value={github} onChange={(e) => setGithub(e.target.value)}/>

                <button type="submit" className="text-white bg-blue-800 p-2 rounded-lg hover:bg-blue-600 transition duration-400 ease-in-out- cursor-pointer mb-7">Salvar links</button>
            </form>
        </div>
    )
};