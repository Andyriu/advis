interface ILoginResponse{
   valid: boolean
   error?: string
}

const useLogin = () => {
   const Login = async (email: string, password: string): Promise<ILoginResponse> => {
      const response = await fetch('/api/Login', {
         method: 'POST',
         headers: {
            "content-Type": "application/json",
         },
         body: JSON.stringify({ email, password }),
      })
      const {valid, error} = await response.json()
      if (!valid) {
         return {valid: valid, error: error}
      } else {
         return {valid: valid}
      }
   }
   return {Login}
}

export default useLogin;