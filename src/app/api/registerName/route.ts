import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

interface IRegisterNameResponse {
   valid: boolean
   error?: string
}

async function registerName(uuid, name) {
   const supabase = await createClient()
   const {error} = await supabase
      .from('players')
      .update ({name: name})
      .eq ('player_id', uuid)
      .select()
   if (error) {
      return {success: !error, error}
   } else {
      const {error} = await supabase
         .from('attributes')
         .insert([{player_id: uuid}])
         .select()
         return {success: !error, error}
   }
}

export async function POST(req: Request): Promise<NextResponse<IRegisterNameResponse>> {
   const {uuid, name} = await req.json()
   const {success, error} = await registerName(uuid, name)
   if (!success) {
      console.log(error)
      return NextResponse.json (
         {valid: false, error: "Error Prueba en otro momento"},
         {status: 200}
      )
   } else {
      return NextResponse.json (
         {valid: true},
         {status: 200}
      )
   }
}