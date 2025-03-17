import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

interface ILoginResponse {
   valid: boolean
   error?: string
}

async function Login (email, password) {
   const supabase = await createClient()
   const {error} = await supabase.auth.signInWithPassword({
      email,
      password
   })
   console.log(error)
   return {succes: !error, error}
}

export async function POST (req: Request): Promise<NextResponse<ILoginResponse>> {
   const {email, password} = await req.json()
   const { succes } = await Login(email, password)
   if (succes) {
      return NextResponse.json(
         { valid: true},
         { status: 200 }
      )
   } else {
      return NextResponse.json(
         {valid: false, error: 'credenciales incorrectas, verifica la informacion' }, 
         { status: 200 }
      )
   }
}