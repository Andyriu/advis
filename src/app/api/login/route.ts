'use server'

import { createClient } from "@/utils/supabase/server"


async function Login (formData) {
   const supabase = await createClient()
   const data = {
      email : formData.get('email'),
      password : formData.get('password')
   }
   const {error} = await supabase.auth.signInWithPassword(data)
   console.log(error)
   return {succes: !error, error}
}

export async function POST (req: Request): Promise<Response> {
   try {
      const text = await req.formData()
      console.log(text)
      const response = await Login(text)
      return new Response(
         JSON.stringify(response), {
            headers: {
               'content-type': 'application/json'
            }
         }
      )
   } catch (error) {
      console.error('Error parsing JSON:', error)
      return new Response(
         JSON.stringify({ error: 'Invalid JSON' }), {
            status: 400,
            headers: {
               'content-type': 'application/json'
            }
         }
      )
   }
}