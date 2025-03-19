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

const useCheckAttributes = () => {
   const checkAttributes = async (uuid: string): Promise<ICheckAttributesResponse> => {
      const response = await fetch ('/api/checkAttributes',{
         method: "POST",
         headers: {
            "content-Type": "application/json",
         },
         body: JSON.stringify({ uuid })
      })
      const {valid, data, error} = await response.json();
      if (!valid) {
         return {valid: valid, error: error}
      } else {
         return {valid: valid, data: data}
      }
   }
   return { checkAttributes }
}

export default useCheckAttributes