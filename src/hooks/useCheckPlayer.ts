interface IData {
   id: string
   name: string | null
}

interface IChecKPlayerResponse {
   valid: boolean
   data?: IData
   error?: string
}

const useCheckPlayer = () => {
   const checkPlayer = async (email: string): Promise<IChecKPlayerResponse> => {
      const response = await fetch ('/api/checkPlayer',{
         method: "POST",
         headers: {
            "content-Type": "application/json",
         },
         body: JSON.stringify({ email }),
      })
      const {valid, data, error} = await response.json()
      if (!valid) {
         return {valid: valid, error: error}
      } else {
         return {valid: valid, data: data}
      }
   }
   return {checkPlayer}
}

export default useCheckPlayer