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

const useObject = () => {
    const object = async (id_object: number): Promise<IObjectResponse> => {
        const response = await fetch ('/api/object',{
            method: "POST",
            headers: {
            "content-Type": "application/json",
            },
            body: JSON.stringify({ id_object })
        })
        const {exist, data, error} = await response.json()
        if (!exist) {
            return {exist: exist, error: error}
        } else {
            return {exist: exist, data: data}
        }
    }

    return {object}
}

export default useObject