"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import useCheckEmail from "@/hooks/useCheckEmail"
import useRegister from "@/hooks/useRegister"

export default function RegisterPage () {
   const router = useRouter()
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [error, setError] = useState("")
   const { checkEmail } = useCheckEmail();
   const { register } = useRegister();
   
   const handleRegister = async (e) => {
      e.preventDefault()
      const { exist } = await checkEmail(email)
      if (exist) {
         setError("Este correo ya esta registrado")
      } else {
         const {valid, error} = await register(email, password)
         if (!valid) {
            setError(error);
         } else {
            router.push('/game')
         }
      }
   }
   return(
      <div>
         <div>
         <h2>Crear Cuenta</h2>
         <div>
            {error && <p>{error}</p>}
            <form onSubmit={handleRegister}>
               <div>
                  <label htmlFor="email">Correo Electrónico</label>
                  <input
                     type="email"
                     id="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                  />
               </div>

               <div className="mb-4">
                  <label htmlFor="password">Contraseña</label>
                  <input
                     type="password"
                     id="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     required
                  />
               </div>

               <button type="submit">
                  Registrarse
               </button>
            </form>
         </div>
         </div>
      </div>
   )
}
