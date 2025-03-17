import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

interface ICheckEmailResponse {
   exists: boolean;
   player?: object;
   error?: string;
}

export async function POST(
   req: Request,
): Promise<NextResponse<ICheckEmailResponse>> {
   const supabase = await createClient();
   const { email } = await req.json();
   if (email.length == 0) {
      return NextResponse.json(
         { exists: false, error: "Se debe proporcionar un correo" },
         { status: 200 },
      );
   } else {
      const { data, error } = await supabase
         .from("players")
         .select("*")
         .eq("email", email);
      console.log(data);

      if (error) {
         console.error("Error en la base de datos", error);
         return NextResponse.json(
            { exists: false, errror: "Error mirando el correo" },
            { status: 500 },
         );
      }
      const user = data[0];
      if (data.length === 0) {
         return NextResponse.json(
            { exists: false },
            { status: 200 },
         );
      } else {
         return NextResponse.json(
            { exists: true, user: { id: user.player_id, email: user.email } },
            { status: 200 },
         );
      }
   }
}
