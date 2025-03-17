'use server'

import { createClient } from "@/utils/supabase/server"


async function Login (email, password) {
   const supabase = await createClient()
   const {error} = await supabase.auth.signInWithPassword({
      email,
      password
   })
   console.log(error)
   return {succes: !error, error}
}

export async function POST (req: Request): Promise<Response> {
   const {email, password} = await req.json()
   const response = await Login(email, password)
   if (response) {
      return new Response(
         JSON.stringify(response), {
            status: 200
         }
      )
   } else {
      return new Response(
         JSON.stringify({ error: 'No se pudo iniciar sesion' }), {
            status: 406,
         }
      )
   }
}