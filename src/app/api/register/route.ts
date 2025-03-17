'use server'

import { createClient } from "@/utils/supabase/server"


async function register (email, password) {
   const supabase = await createClient()
   const { error } = await supabase.auth.signUp({
      email, 
      password
   })
   return { success: !error, error }
}

async function registerEmail (email) {
   const supabase = await createClient()
   const { error } = await supabase
      .from('players')
      .insert([{ email: email }])
      .select()
   console.log(error)
   return { success: !error, error }
}

export async function POST (req: Request): Promise<Response> {
   const {email, password} = await req.json()
   const response = await register(email, password)
   const emailResponse = await registerEmail(email)
   console.log(response)
   return new Response(
      JSON.stringify({ ...response, emailResponse }), {
         headers: {
            'content-type': 'application/json'
         }
      }
   )
}