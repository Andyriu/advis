'use server'

import { createClient } from "@/utils/supabase/server"

export async function POST (req: Request): Promise<Response> {
   const supabase = await createClient()
   const {uuid} = await req.json()

   const {data, error} = await supabase
      .from('player')
      .select('*')
      .eq('user_id', uuid)
   
   if (error) {
      console.error ('Error en la base de datos', error)
      return new Response(
         JSON.stringify({ errror: 'Error mirando el correo' }),
         { status: 500 }
      )
   }
   
   const player = data[0];
   if (data.length === 0) {
      return new Response(
         JSON.stringify({ exists: false }),
         { status: 200 }
      )
   } else {
      return new Response(
         JSON.stringify({ exists: true, player: {id: player.user_id, name: player.name_player, life: player.life, defense: player.defense} }),
         { status: 200 }
      )
   }
}