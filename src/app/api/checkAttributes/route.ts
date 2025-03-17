import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

interface IAttributes {
   level: number
   health: number
   defense: number
   money: number
   exp: number
}

interface ICheckAttributesResponse {
   valid: boolean
   data?: IAttributes
   error?: string
}

export async function POST (req: Request): Promise<NextResponse<ICheckAttributesResponse>> {
   const supabase = await createClient()
   const { uuid } = await req.json()
   const {data, error} = await supabase
      .from('attributes')
      .select('*')
      .eq('player_id', uuid)
   
   if (error) {
      return NextResponse.json(
         { valid: false, errror: 'Error mirando atributos' },
         { status: 500 }
      )
   }
   
   const player = data[0];
   if (data.length === 0) {
      return NextResponse.json(
         { valid: false, error: "No se encontraron attributes"},
         { status: 200 }
      )
   } else {
      return NextResponse.json(
         { valid: true, data: { level: player.level, health: player.health, defense: player.defense, money: player.money, exp: player.exp} },
         { status: 200 }
      )
   }
}