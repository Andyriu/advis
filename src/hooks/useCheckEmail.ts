import { useState } from "react";

interface ICheckEmailResponse {
   exist: boolean
   data?: object
}

const useCheckEmail = () => {
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState<string | null> (null)

   const checkEmail = async (email:string): Promise<ICheckEmailResponse> => {
      setLoading (true)
      setError (null)

      try {
         const response = await fetch('/api/chekEmail',{
            method: 'POST',
            headers: {
               "content-Type": "application/json"
            },
            body: JSON.stringify({email})
         })
         const { exists } = await response.json()
         console.log(exists, "soy sumamente estupido")
         if (!response.ok) {
            throw new Error("Error al verificar el correo electrónico")
         }
         return { exist: exists }
      } catch (err) {
         setError(err.message)
         return {exist: false}
      } finally {
         setLoading(false)
      }
   }
   return {checkEmail, loading, error  }
}

export default useCheckEmail