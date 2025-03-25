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
         <nav>
            <div>
               <h1>
                  <Link href='/'>Advis</Link>
               </h1>
            </div>
            <div>
               <ul>
                  <li>
                     <Link href='/wiki'>Wiki</Link>
                  </li>
                  <div>
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