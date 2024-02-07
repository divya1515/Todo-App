import { useContext,createContext } from "react";

export const todocontext=createContext({
    todos:[
        {
            id:1,
            todo:"todomsg",
            completed:false,
        }
    ],
    addtodo:(todo)=>{},
    updatedtodo:(id,todo)=>{},
    deletetodo:(id,todo)=>{},
    toggleComplete:(id)=>{},

})

export const TodoProvider=todocontext.Provider

export const usetodo=()=>{
    return useContext(todocontext)
}