interface IRegisterResponse {
   valid: boolean,
   error?: string
}

const useRegister = () => {
   const register = async (email: string, password: string): Promise<IRegisterResponse> => {
      const response = await fetch ('/api/register',{
         method: "POST",
         headers: {
            "content-Type": "application/json",
         },
         body: JSON.stringify({ email, password }),
      })
      const {valid, error} = await response.json();
      if (!valid) {
         return {valid: valid, error: error}
      } else {
         return {valid: valid}
      }
   }
   return {register}
}

export default useRegister