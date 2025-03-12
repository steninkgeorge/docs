import {create} from 'zustand';

interface TitleState{
    title: string, 
    setTitle: (title:string)=> void
}

const titleStore= create<TitleState>((set)=>{
    return {
        title: 'Untitled Document',
        setTitle: (title:string)=>{set({title})}
    }
})
export default titleStore