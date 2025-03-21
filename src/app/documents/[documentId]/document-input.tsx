import {BsCloudCheck} from 'react-icons/bs'
import { Input } from "@/components/ui/input";
import titleStore from '@/store/title-store';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { FormEvent, useEffect } from 'react';



export const DocumentInput = ({docId}: any)=>{

     const { title, setTitle } = titleStore();
  const renameDocument = useMutation(api.document.renameDocument);

     const handleChange = (e:any) => {
       setTitle(e.target.value);
     };

    
     const handleSubmit = async (
       e: FormEvent<HTMLFormElement>, 
      title: string
       
     ) => {
       e.preventDefault();
       try {
         await renameDocument({ id: docId, title: title }).then(()=>setTitle(title))
       } catch (error) {
         console.log(`Error:${error}`);
       }
     };

    

    return (
      <div className="flex items-center gap-2 ">
        <form onBlur={(e)=>handleSubmit(e, title)} >
          <Input
            className=" border-none text-2xl font-semibold"
            value={title}
            onChange={handleChange}
          />
        </form>

        <BsCloudCheck className=" w-5 h-5 text-neutral-500" />
      </div>
    );
}