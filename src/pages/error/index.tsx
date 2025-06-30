import {Link} from "react-router";

export function Errorpage(){
    return(
        <div className="min-h-screen w-full flex justify-center items-center flex-col">
            <h1 className="text-6xl text-white font-bold">404</h1>
            <h1 className="text-4xl text-white font-bold mb-3">Página não encontrada</h1>
            <p className="italic text-white mb-3">Você caiu em uma página que não existe</p>
            <Link to={"/"} className="bg-gray-500/80 hover:bg-gray-500 transition duration-500 ease-in-out rounded-lg p-1.5 text-white">Página principal</Link>
        </div>
    )
}