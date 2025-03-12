import {BsCloudCheck} from 'react-icons/bs'
import { Input } from "@/components/ui/input";
import titleStore from '@/store/title-store';



export const DocumentInput = ()=>{

     const { title, setTitle } = titleStore();

     const handleChange = (e:any) => {
       setTitle(e.target.value);
     };

    return (
      <div className="flex items-center gap-2 ">
      
          <Input
            className=" border-none text-2xl font-semibold"
            value={title}
            onChange={handleChange}
          />
      
        <BsCloudCheck className=" w-5 h-5 text-neutral-500" />
      </div>
    );
}