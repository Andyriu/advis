import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

interface IData {
   id: string
   name: string | null
}

interface IChecKPlayerResponse {
   valid: boolean
   data?: IData
   error?: string
}

export async function POST (req: Request): Promise<NextResponse<IChecKPlayerResponse>> {
   const supabase = await createClient()
   console.log(req)
   const {email} = await req.json()
   console.log(email, "esta mostrando alfo?")
   const {data, error} = await supabase
      .from('players')
      .select('*')
      .eq('email', email)
   
   if (error) {
      return NextResponse.json(
         { valid: false, errror: 'Error mirando el correo' },
         { status: 500 }
      )
   }
   
   const player = data[0];
   if (data.length === 0) {
      return NextResponse.json(
         { valid: false, error: "No esta registrado en player"},
         { status: 200 }
      )
   } else {
      return NextResponse.json(
         { valid: true, data: {id: player.player_id, name: player.name} },
         { status: 200 }
      )
   }
}