'use server'

import { createClient } from "@/utils/supabase/server"


async function register (formData) {
   const supabase = await createClient()
   const data = {
      email: formData.get('email'),
      password: formData.get('password')
   }
   const { error } = await supabase.auth.signUp(data)
   return { success: !error, error }
}

async function registerEmail (email) {
   const supabase = await createClient()
   const { error } = await supabase
      .from('users')
      .insert([{ email }])
      .select()
   console.log(error)
   return { success: !error, error }
}

export async function POST (req: Request): Promise<Response> {
   const formData = await req.formData()
   const response = await register(formData)
   const emailResponse = await registerEmail(formData.get('email'))
   console.log(response)
   return new Response(
      JSON.stringify({ ...response, emailResponse }), {
         headers: {
            'content-type': 'application/json'
         }
      }
   )
}