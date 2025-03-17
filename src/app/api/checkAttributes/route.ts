'use server'

import { createClient } from "@/utils/supabase/server"

export async function POST (req: Request): Promise<Response> {
   const supabase = await createClient()
   const {uuid} = await req.json()
   console.log (uuid, "Esto si funciona")
   const {data, error} = await supabase
      .from('attributes')
      .select('*')
      .eq('player_id', uuid)
   
   if (error) {
      console.error ('Error en la base de datos', error)
      return new Response(
         JSON.stringify({ errror: 'Error mirando atributos' }),
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
         JSON.stringify({ exists: true, player: {id: player.player_id, level: player.level, health: player.health, defense: player.defense, money: player.money, exp: player.exp} }),
         { status: 200 }
      )
   }
}