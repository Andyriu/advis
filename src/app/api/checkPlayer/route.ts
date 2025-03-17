'use server'

import { createClient } from "@/utils/supabase/server"

export async function POST (req: Request): Promise<Response> {
   const supabase = await createClient()
   const {email} = await req.json()

   const {data, error} = await supabase
      .from('players')
      .select('*')
      .eq('email', email)
   
   if (error) {
      console.error ('Error en la base de datos', error)
      return new Response(
         JSON.stringify({ errror: 'Error mirando el correo' }),
         { status: 500 }
      )
   }
   
   const player = data[0];
   console.log(player, "pruba y erorr", player.name)
   if (data.length === 0) {
      return new Response(
         JSON.stringify({ exists: false }),
         { status: 200 }
      )
   } else {
      return new Response(
         JSON.stringify({ exists: true, player: {id: player.player_id, name: player.name} }),
         { status: 200 }
      )
   }
}