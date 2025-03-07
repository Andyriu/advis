'use server'

import { createClient } from "@/utils/supabase/server"

export async function POST (req: Request): Promise<Response> {
   const supabase = await createClient()
   const { email } = await req.json()
   
   const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)

   if (error) {
      console.error ('Error en la base de datos', error)
      return new Response(
         JSON.stringify({ errror: 'Error mirando el correo' }),
         { status: 500 }
      )
   }
   const user = data[0];
   if (data.length === 0) {
      return new Response(
         JSON.stringify({ exists: false }),
         { status: 200 }
      )
   } else {
      return new Response(
         JSON.stringify({ exists: true, user: {id: user.id, email: user.email} }),
         { status: 200 }
      )
   }
}