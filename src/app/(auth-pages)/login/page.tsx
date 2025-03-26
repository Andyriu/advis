"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Padding from "@/components/Padding/Padding";
import Link from "next/link";
import useCheckEmail from "@/hooks/useCheckEmail";
import useLogin from "@/hooks/useLogin";
import styles from "./page.module.css";

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
      <Padding>
         <div>
            <h1>
               <Link href="/" className={styles.title}>
                  Advis
               </Link>
            </h1>
            <div className={styles.container}>
               <h2 className={styles.subtitle}>Inicia sesión</h2>
               {error && <p className={styles.error}>{error}</p>}
               <form onSubmit={handleLogin}>
                  <div>
                     <p className={styles.text}>Correo electronico</p>
                     <input
                        id="email"
                        type="email"
                        className={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                     />
                  </div>
                  <div>
                     <p className={styles.text}>Contraseña</p>
                     <input
                        id="password"
                        type="password"
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                     />
                  </div>
                  <button type="submit" className={styles.button}>
                     Iniciar sesión
                  </button>
               </form>
            </div>
            <p className={styles.registerLink}>
               <Link href="/register">Regístrate</Link>
            </p>
         </div>
      </Padding>
   );
}
