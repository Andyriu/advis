import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

// Función para registrar un jugador
async function registerPlayer(uuid: string, name: string) {
   const supabase = createClient();
   const { data, error } = await (await supabase)
      .from('player')
      .insert([{ user_id:uuid, name_player:name, life:100, defense:10, level: 1 }])
      .select();

   if (error) {
      console.log(error);
      console.error("Error al registrar el jugador:", error);
      return { success: false, error };
   }

   return { success: true, data };
}

// Endpoint POST
export async function POST(req: Request): Promise<NextResponse> {
   try {
      const { uuid, name } = await req.json();

      // Validar que uuid y name estén presentes
      if (!uuid || !name) {
         return NextResponse.json(
            { success: false, error: "Faltan datos obligatorios (uuid o name)" },
            { status: 400 }
         );
      }

      // Registrar el jugador
      const response = await registerPlayer(uuid, name);

      if (!response.success) {
         return NextResponse.json(
            { success: false, error: response.error },
            { status: 500 }
         );
      }

      // Éxito
      return NextResponse.json(
         { success: true, data: response.data },
         { status: 200 }
      );
   } catch (error) {
      console.error("Error en el endpoint POST:", error);
      return NextResponse.json(
         { success: false, error: "Error interno del servidor" },
         { status: 500 }
      );
   }
}