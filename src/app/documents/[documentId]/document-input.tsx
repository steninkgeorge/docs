import {BsCloudCheck} from 'react-icons/bs'
export const DocumentInput = ()=>{
    return (
        <div className="flex items-center gap-2">
            <div className="text-lg px-1 truncate cursor-pointer">Untitled document</div>
            <BsCloudCheck className=" w-5 h-5 text-neutral-500" />
        </div>
    )
}