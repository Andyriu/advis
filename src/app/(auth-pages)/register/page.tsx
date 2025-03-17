"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage () {
   const router = useRouter()
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [error, setError] = useState("")
   
   const chekEmail = async (email) => {
      const response = await fetch ('/api/chekEmail', {
         method: 'POST',
         body: JSON.stringify({ email }),
         headers: {
            'Content-Type': 'application/json'
         }
      })
      const {exists} = await response.json()
      console.log(exists)
      return {exists}
   }

   const handleRegister = async (e) => {
      e.preventDefault()
      const {exists} = await chekEmail(email)
      if (exists) {
         setError("Este correo ya esta registrado")
      } else {
         const response = await fetch("/api/register", {
            method: "POST",
            body: JSON.stringify({ email, password })
         });
         const result = await response.json();
         console.log(result);
         if (!result) {
            setError("Error, por favor intentalo mas tarde");
         } else {
            router.push('/game')
         }
      }
   }
   return(
      <div className="flex justify-center items-center h-screen bg-unique-900">
         <div>
         <h2 className="font-semibold text-3xl py-5 text-unique-400 flex justify-center">Crear Cuenta</h2>
         <div className="bg-unique-500 p-8 rounded-xl shadow-md w-96">
            {error && <p className="text-unique-900 text-center mb-4">{error}</p>}
            <form onSubmit={handleRegister}>
               <div className="mb-4">
                  <label htmlFor="email" className="font-medium text-lg pl-2 text-unique-900 p-2">Correo Electrónico</label>
                  <input
                     type="email"
                     id="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="text-unique-900 p-2 rounded-lg bg-unique-100 w-full"
                     required
                  />
               </div>

               <div className="mb-4">
                  <label htmlFor="password" className="font-medium text-lg pl-2 text-unique-900 p-2">Contraseña</label>
                  <input
                     type="password"
                     id="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className="text-unique-900 p-2 rounded-lg bg-unique-100 w-full"
                     required
                  />
               </div>

               <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Registrarse
               </button>
            </form>
         </div>
         </div>
      </div>
   )
}
