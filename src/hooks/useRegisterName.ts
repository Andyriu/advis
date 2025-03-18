interface IRegisterNameResponse {
   valid: boolean
   error?: string
}

const useRegisterName = () => {
   const registerName = async (uuid: string, name: string): Promise<IRegisterNameResponse> => {
      const response = await fetch ('/api/registerName',{
         method: "POST",
         headers: {
            "content-Type": "application/json",
         },
         body: JSON.stringify({ uuid, name })
      })
      const {valid, error} = await response.json()
      if (!valid) {
         return {valid: false, error: error}
      } else {
         return {valid: true}
      }
   }
   return {registerName}
}

export default useRegisterName