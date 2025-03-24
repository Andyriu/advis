import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

interface IBuyObjectResponse {
    success: boolean
    error?: string
}

const moneyReducer = async (moneyUp: number, uuid: string): Promise<IBuyObjectResponse> => {
    const supabase = await createClient()
    const {error} = await supabase
        .from('attributes')
        .update({money: moneyUp})
        .eq('player_id', uuid)
        .select()
    if (error) {
        return {success: false, error: "No se pudo actualizar el dinero del jugador"}
    } else {
        return {success: true}
    }
}

const bagObject = async (uuid: string, id_object: number, moneyUp: number): Promise<IBuyObjectResponse> => {
    const supabase = await createClient()
    const {error} = await supabase
        .from ('bag')
        .insert ([{player_id: uuid, object_id: id_object}])
        .select()
    if (error) {
        return {success: false, error: "No se pudo comprar el objeto"}
    } else {
        const {success, error} = await moneyReducer(moneyUp, uuid)
        if (success) {
            return {success: success}
        } else {
            return {success: success, error: error}
        }
    }
} 

export async function POST(req: Request): Promise<NextResponse<IBuyObjectResponse>> {
    const {uuid, object_id, moneyUp} = await req.json();
    const {success, error} = await bagObject(uuid, object_id, moneyUp)
    if (success) {
        return NextResponse.json (
            {success: success},
            {status: 200}
        )
    } else {
        return NextResponse.json (
            {success: success, error: error},
            {status: 200}
        )
    }
}