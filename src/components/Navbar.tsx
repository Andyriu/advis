import Link from "next/link"
import { createClient } from "@/utils/supabase/server"

export default async function Navbar () {
   const supabase = await createClient()
   const {data, error} = await supabase.auth.getUser()
   console.log(data)
   let session
   if (error || !data?.user) {
      session = true
   }
   return (
      <div>
         <nav className="flex justify-between p-6 items-center">
            <div className="text-6xl font-semibold text-unique-500 pl-24 pr-8">
               <h1>
                  <Link href='/'>Advis</Link>
               </h1>
            </div>
            <div>
               <ul className="flex text-xl pr-24 text-unique-100 ">
                  <li className="pr-8 hover:text-unique-400">
                     <Link href='/wiki'>Wiki</Link>
                  </li>
                  <div className="hover:text-unique-400">
                  {
                     session ? (
                        <li>
                           <Link href='/login'>Iniciar sesion</Link>
                        </li>
                     ) : (
                        <li>
                           <Link href='/game'>Comienza a jugar</Link>
                        </li>
                     )
                  }
                  </div>
               </ul>
            </div>
         </nav>
      </div>
   )
}