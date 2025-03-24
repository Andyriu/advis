import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

interface IData {
    object_id: number
    object_name: string
    object_price: number
}

interface IObjectResponse {
    exist: boolean
    data?: IData
    error?: string
}

const object = async (id_object: number): Promise<IObjectResponse> => {
    const supabase = await createClient();
    const {data, error} = await supabase
        .from('objects')
        .select("*")
        .eq('object_id', id_object)
    if (error) {
        return {exist: false, error: "El objeto no existe"}
    } else {
        const object = data [0]
        return {exist: true, data: {object_id: object.object_id, object_name: object.object_name, object_price: object.object_price}}
    }
}

export async function POST(req: Request): Promise<NextResponse<IObjectResponse>> {
    const {id_object} = await req.json()
    const {exist, data, error} = await object(id_object)
    if (!exist) {
        return NextResponse.json (
            {exist: exist, error: error},
            {status: 200}
        )
    } else {
        return NextResponse.json (
            {exist: exist, data: data},
            {status: 200}
        )
    }
}