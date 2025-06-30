import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";

export function Header(){

    async function handleLogout(){
        await signOut(auth);
    }

    return(
        <header className="w-full max-w-2xl mt-4 pr-2 pl-2">
            <nav className="w-full bg-white h-12 flex items-center justify-between pl-3 pr-3 rounded-lg">
                <div className="flex gap-4 font-medium">
                    <Link to={"/"}>
                        Home
                    </Link>
                    <Link to={"/admin"}>
                        Links
                    </Link>
                    <Link to={"/admin/social"}>
                        Redes sociais
                    </Link>
                </div>
                <button onClick={handleLogout}>
                    <BiLogOut size={30} color="#db2629" cursor={"pointer"}/>
                </button>
            </nav>
        </header>
    )
};