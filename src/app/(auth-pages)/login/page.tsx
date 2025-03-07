"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import Padding from "@/components/Padding";
import Link from "next/link";

export default function LoginPage() {
   const router = useRouter();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");

   const chekEmail = async (email) => {
      const response = await fetch('/api/chekEmail', {
         method: 'POST',
         body: JSON.stringify({ email }),
         headers: {
            'Content-Type': 'application/json'
         }
      })
   const { exists, user } = await response.json()
   console.log(exists, user)
   return {exists}
   }
   
   const handleLogin = async (e) => {
      e.preventDefault();
      const { exists } = await chekEmail(email);
      if (exists) {
         const formData = new FormData();
         formData.append('email', email);
         formData.append('password', password);
         const response = await fetch('/api/login', {
            method: 'POST',
            body: formData
         });
         const result = await response.json();
         console.log(result);
         if (!result) {
            setError("Error al iniciar sesion por favor verifica tus credenciales");
         } else {
            router.push('/game');
         }
      } else {
         setError("usted no esta registrado");
      }
   }
   return (
         <div>
            <Padding>
               <div className="pt-6 pl-5 text-6xl font-semibold text-unique-400">
                  <h1>
                     <Link href="/">
                        Advis
                     </Link>
                  </h1>
               </div>
               <div className=" flex justify-center">
                  <div>
                     <h2 className="font-semibold text-3xl py-5 text-unique-400 flex justify-center">
                        Inicia sesion
                     </h2>
                     <div className="p-7 bg-unique-500 rounded-xl w-96">
                        <div>
                           {error && (
                              <p className="font-bold break-normal break-words text-center">
                                 {error}
                              </p>
                           )}
                        </div>
                        <form onSubmit={handleLogin}>
                           <div>
                              <p className="font-medium text-lg pl-2 text-unique-900 p-2">
                                 Email
                              </p>
                              <label>
                                 <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="p-2 rounded-lg font-semibold text-unique-900 bg-unique-100 w-full"
                                 />
                              </label>
                           </div>
                           <div>
                              <p className="font-medium text-lg pl-2 text-unique-900 p-2">
                                 Contraseña
                              </p>
                              <label>
                                 <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="text-unique-900 p-2 rounded-lg bg-unique-100 w-full"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                 />
                              </label>
                           </div>
                           <div className="flex justify-center py-3">
                              <button
                                 type="submit"
                                 className="bg-unique-300 p-2 rounded-lg font-semibold text-unique-900 border-unique-850 hover:bg-unique-400 w-full"
                              >
                                 Iniciar sesion
                              </button>
                           </div>
                        </form>
                        <div className="flex justify-center">
                           <button
                              //onClick={handleLoginGoogle}
                              className="bg-unique-300 p-2 rounded-lg font-semibold text-unique-900 border-unique-850 hover:bg-unique-400 w-full"
                           >
                              Inicia con Google
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
               <p className="text-center font-bold text-unique-500 pt-4 underline">
                  <Link href="/register">
                     registrate
                  </Link>
               </p>
            </Padding>
         </div>
   )
}