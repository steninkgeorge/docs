import { Button } from "@/components/ui/button"
import Link from "next/link"
const Home=()=>{
  return(
    <div className="items-center flex justify-center min-h-screen">
      Click <Link href={'/documents/123'} >
        <span className="text-blue-400 underline">
          here
        </span>
      </Link> 

    </div>
  )
}

export default Home