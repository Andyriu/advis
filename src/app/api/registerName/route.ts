'use server'

import { createClient } from "@/utils/supabase/server"

async function registerName(uuid, name) {
   const supabase = await createClient()
   const {error} = await supabase
      .from('players')
      .update ({name: name})
      .eq ('player_id', uuid)
      .select()
   return {success: !error, error}
}

   async function registerAttribute(uuid) {
      const supabase = await createClient()
      const {error} = await supabase
         .from('attributes')
         .insert([{player_id: uuid}])
         .select()
      return {success: !error, error}
   }

export async function POST(req: Request): Promise<Response> {
   const {uuid, name} = await req.json()
   const responseRegisterName = await registerName(uuid, name)
   console.log(responseRegisterName)
   if (responseRegisterName) {
      const responseRegisterAttribute = await registerAttribute(uuid)
      if (responseRegisterAttribute){
         return new Response(
            JSON.stringify({ correctRegister: true, responseRegisterName, responseRegisterAttribute}), {
               status: 200
            }
         )
      } else {
         return new Response(
            JSON.stringify({ correctRegister: false, responseRegisterName, responseRegisterAttribute }),
            { status: 500 }
         )
      }
   } else {
      return new Response(
         JSON.stringify({ correctRegister: false, responseRegisterName}),
         { status: 500 }
      )
   }
}