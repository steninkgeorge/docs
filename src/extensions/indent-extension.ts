import { Extension } from "@tiptap/core";

export const Tab =Extension.create({
    name:'tab', 

    addKeyboardShortcuts(){
        return{
            Tab:()=>{
                 return this.editor.commands.insertContent("\t");
            }, 
            "Shift-Tab":()=>{
                return false
            }
        }
    }
})