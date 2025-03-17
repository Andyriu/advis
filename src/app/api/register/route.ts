import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

interface ILoginResponse {
   valid: boolean;
   error?: string;
}

async function register(email, password) {
   const supabase = await createClient();
   const { error } = await supabase.auth.signUp({
      email,
      password,
   });
   if (error) {
      return { success: !error, error };
   } else {
      const { error } = await supabase
         .from("players")
         .insert([{ email: email }])
         .select();
      if (error) {
         return { success: !error, error };
      } else {
         return { success: !error, error };
      }
   }
}

export async function POST( req: Request ): Promise<NextResponse<ILoginResponse>> {
   const { email, password } = await req.json();
   const { success } = await register(email, password);
   console.log(success);
   if (!success) {
      return NextResponse.json(
         { valid: false, error: "Error, prueba otra vez en otro momento" },
         { status: 200 },
      );
   } else {
      return NextResponse.json(
         { valid: true },
         { status: 200 },
      );
   }
}
