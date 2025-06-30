import { useState, useEffect } from "react";
import { FaLinkedin, FaWhatsapp, FaGithub} from "react-icons/fa";
import { Social } from "../../components/Social";
import { db } from "../../services/firebaseConnection";
import {
    getDocs,
    collection,
    orderBy,
    query,
    doc,
    getDoc
} from "firebase/firestore";


interface LinkProps {
    id: string,
    name: string,
    url: string,
    bg: string,
    color: string
}

interface SocialLinksProps {
    linkedin: string,
    whatsapp: string, 
    github: string
}

export function Home(){
    const [links, setLinks] = useState<LinkProps[]>([]);
    const [socialLinks, setSocialLinks] = useState<SocialLinksProps | undefined>();

    useEffect(() => {
         function loadSocialLinks(){
            const docRef = doc(db, "social", "link")
            getDoc(docRef)
            .then((snapshot) => {
                if(snapshot.data() !== undefined){
                    setSocialLinks({
                        linkedin: snapshot.data()?.linkedin,
                        whatsapp: snapshot.data()?.whatsapp,
                        github: snapshot.data()?.github,
    
                    })
                }
            })
        }
        loadSocialLinks()
    },[])



    useEffect(() => {
        function loadLinks(){
            const linksRef = collection(db, "links");
            const queryRef = query(linksRef, orderBy("created", "asc"));
            getDocs(queryRef)
            .then((snapshot) => {
                let lista = [] as LinkProps[];
                snapshot.forEach((link) => {
                    lista.push({
                        id: link.id,
                        name: link.data()?.name,
                        url: link.data()?.url,
                        bg: link.data()?.bg,
                        color: link.data()?.color
                    })
                })
                setLinks(lista)
            })
        }
        loadLinks();
    },[])

    return(
        <div className="flex flex-col w-full pt-4 pb-4 items-center justify-center">
            <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">Roger Anacleto da Silva</h1>
            <span className="text-gray-50 mb-5 mt-3">Veja meus links 👇</span>
            <main className="flex flex-col w-11/12 max-w-xl text-center">
                {links.map((link) => (
                <section 
                key={link.id}
                className="mb-4 w-full pt-2 pb-2 rounded-lg transition-transform hover:scale-105 cursor-pointer"
                style={{backgroundColor: link.bg}}
                >
                    <a href={link.url}>
                        <p className="text-base md:text-lg" style={{color: link.color}}>{link.name}</p>
                    </a>
                </section>
                ))}
                {socialLinks && Object.keys(socialLinks).length > 0 && (
                    <footer className="flex justify-center gap-3 mt-4 mb-4">
                    <Social url={socialLinks?.linkedin}>   
                        <FaLinkedin font-size={35} color="#fff"></FaLinkedin>
                    </Social>

                    <Social url={socialLinks?.whatsapp}>   
                        <FaWhatsapp font-size={35} color="#fff"></FaWhatsapp>
                    </Social>    
                    
                    <Social url={socialLinks?.github}>   
                        <FaGithub font-size={35} color="#fff"></FaGithub>
                    </Social>                  
                </footer>
                )}
            </main>
        </div>
    )
};