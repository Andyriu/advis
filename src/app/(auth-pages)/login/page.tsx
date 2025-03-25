"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Padding from "@/components/Padding";
import Link from "next/link";
import useCheckEmail from "@/hooks/useCheckEmail";
import useLogin from "@/hooks/useLogin";

export default function LoginPage() {
   const router = useRouter();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const { checkEmail } = useCheckEmail();
   const { login } = useLogin();

   const handleLogin = async (e) => {
      e.preventDefault();
      const { exist } = await checkEmail(email);
      if (exist) {
         const { valid, error } = await login(email, password);
         if (!valid) {
            setError(error);
         } else {
            router.push("/game");
         }
      } else {
         setError("usted no esta registrado");
      }
   };
   return (
      <div>
         <Padding>
            <div>
               <h1>
                  <Link href="/">
                     Advis
                  </Link>
               </h1>
            </div>
            <div>
               <div>
                  <h2>
                     Inicia sesion
                  </h2>
                  <div>
                     <div>
                        {error && (
                           <p>
                              {error}
                           </p>
                        )}
                     </div>
                     <form onSubmit={handleLogin}>
                        <div>
                           <p>
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
                              />
                           </label>
                        </div>
                        <div>
                           <p>
                              Contraseña
                           </p>
                           <label>
                              <input
                                 id="password"
                                 name="password"
                                 type="password"
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                                 required
                              />
                           </label>
                        </div>
                        <div>
                           <button
                              type="submit"
                           >
                              Iniciar sesion
                           </button>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
            <p>
               <Link href="/register">
                  registrate
               </Link>
            </p>
         </Padding>
      </div>
   );
}
