import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

export function Input(props: InputProps){
    return(
        <input type="text" className="bg-white text-black outline-0 p-2 rounded-lg mb-6" {...props}/>
    )
}