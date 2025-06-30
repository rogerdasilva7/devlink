import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { useEffect, useState, type FormEvent } from "react";
import { FiTrash } from "react-icons/fi"
import { db } from "../../services/firebaseConnection"
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    doc,
    deleteDoc,
} from "firebase/firestore";

interface LinkProps {
    id: string,
    name: string,
    url: string,
    bg: string,
    color: string
}

export function Admin(){
    const [nameInput, setNameInput] = useState("");
    const [urlInput, setUrlInput] = useState("")
    const [textColorInput, setTextColorInput] = useState("#fff");
    const [backgroundColorInput, setBackgroundColorInput] = useState("#000");
    const [links, setLinks] = useState<LinkProps[]>()

    useEffect(() => {
        const linksRef = collection(db, "links");
        const queryRef = query(linksRef, orderBy("created", "asc"))

        const unsub = onSnapshot(queryRef, (snapshot) => {
            let lista = [] as LinkProps[];
            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color
                })
            })

            setLinks(lista)
        })

        return () => {
            unsub();
        }
    },[])

    async function handleRegister(e: FormEvent){
        e.preventDefault()
        if(nameInput === "" || urlInput === ""){
            alert("Preencha os campos antes de cadastrar um link")
            return;
        }
        addDoc(collection(db, "links"), {
            name: nameInput,
            url: urlInput,
            bg: backgroundColorInput,
            color: textColorInput,
            created: new Date()
        })
        .then(() => {
            setNameInput("")
            setUrlInput("")
        }).catch((error) => {
            alert(`Ocorreu um erro inesperado ${error}`)
        })
    }


        function handleDeleteLink(id: string){
            const docRef = doc(db, "links", id);
            deleteDoc(docRef);
        }
    return(
        <div className="flex items-center flex-col min-h-screen pb-7 pl-2 pr-2">
            <Header/>
            <form className="flex flex-col mt-3 mb-3 w-full max-w-xl" onSubmit={handleRegister}>
                <label className="text-white font-medium mt-2 mb-2">Nome do link</label>
                <Input placeholder="Digite o nome do link..." value={nameInput} onChange={(e) => setNameInput(e.target.value)}/>

                <label className="text-white font-medium mt-2 mb-2">Url do link</label>
                <Input type="url" placeholder="Digite a url do link..." value={urlInput} onChange={(e) => setUrlInput(e.target.value)}/>


                <section className="flex mt-4 mb-4 gap-5">
                    <div className="flex gap-2">
                        <label className="text-white font-medium mt-2 mb-2">Fundo do link</label>
                        <input type="color" value={backgroundColorInput} onChange={(e) => setBackgroundColorInput(e.target.value)}/>
                    </div>
                    <div className="flex gap-2">
                        <label className="text-white font-medium mt-2 mb-2">Cor do link</label>
                        <input type="color" value={textColorInput} onChange={(e) => setTextColorInput(e.target.value)}/>
                    </div>
                </section>

                {nameInput !== "" && (
                    <div className="flex items-center justify-start flex-col mb-1 p-1 border-gray-100/25 border rounded-md">
                    <label className="text-white font-medium mt-2 mb-2">Veja como está ficando</label>
                    <article 
                    className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded pl-1 pr-1 pb-2 pt-2"
                    style={{marginBottom: 8, marginTop: 8, backgroundColor: backgroundColorInput}}
                    >
                        <p style={{color: textColorInput}}>{nameInput}</p>
                    </article>
                    </div>
                )}
                <button type="submit" className="mb-7 bg-blue-800 hover:bg-blue-600 transition duration-400 ease-in-out- cursor-pointer h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center">
                    Cadastrar
                </button>
            </form>
            
            <h2 className="font-bold text-white mb-4 text-2xl">Meus links</h2>

                {links?.map((link) => (
                    <article 
                    key={link.id}
                    className="flex items-center justify-between w-full max-w-xl rounded pr-3 pl-3 pt-2 pb-2 mb-1 select-none"
                    style={{backgroundColor: link.bg, color: link.color}}
                    >
                        <p>{link.name}</p>
                        <div>
                            <button onClick={() => handleDeleteLink(link.id)}className="border border-dashed p-1 rounded hover:bg-red-700 transition duration-400 ease-in-out cursor-pointer">
                                <FiTrash size={18} color="#fff"></FiTrash>
                            </button>
                        </div>
                    </article>
                ))}
        </div>
    )
};