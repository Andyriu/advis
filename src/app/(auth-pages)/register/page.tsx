"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useCheckEmail from "@/hooks/useCheckEmail";
import useRegister from "@/hooks/useRegister";
import styles from "./page.module.css";
import Padding from "@/components/Padding/Padding";

export default function RegisterPage() {
   const router = useRouter();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const { checkEmail } = useCheckEmail();
   const { register } = useRegister();

   const handleRegister = async (e) => {
      e.preventDefault();
      const { exist } = await checkEmail(email);
      if (exist) {
         setError("Este correo ya esta registrado");
      } else {
         const { valid, error } = await register(email, password);
         if (!valid) {
            setError(error);
         } else {
            router.push("/game");
         }
      }
   };
   return (
      <Padding>
         <h1>
            <Link href="/" className={styles.title}>
               Advis
            </Link>
         </h1>
         <div className={styles.container}>
            <h2 className={styles.subtitle}>Regístrate</h2>
            <div>
               {error && <p className={styles.error}>{error}</p>}
               <form onSubmit={handleRegister}>
                  <div>
                     <p className={styles.text}>Correo Electrónico</p>
                     <input
                        type="email"
                        id="email"
                        className={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                     />
                  </div>

                  <div>
                     <p className={styles.text}>Contraseña</p>
                     <input
                        type="password"
                        id="password"
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                     />
                  </div>

                  <button type="submit" className={styles.button}>
                     Registrarse
                  </button>
               </form>
            </div>
         </div>
         <p className={styles.registerLink}>
            <Link href="/login">inicia sesion</Link>
         </p>
      </Padding>
   );
}
