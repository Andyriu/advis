"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { createClient } from "@/utils/supabase/client";
import useCheckPlayer from "@/hooks/useCheckPlayer";
import useRegisterName from "@/hooks/useRegisterName";

export default function GameInitialPage() {
   const router = useRouter();

   const [count, setCount] = useState(0);
   const [name , setName] = useState("");
   const [val, setVal] = useState(false);
   const [email, setEmail] = useState("");
   const [uuid, setUuid] = useState("");
   const [confirmation, setConfirmation] = useState(false);
   const [error, setError] = useState("")
   const {checkPlayer} = useCheckPlayer();
   const {registerName} = useRegisterName();

   useEffect(() => {
      const fetchData = async () => {
         const supabase = createClient();
         const { data, error } = await supabase.auth.getUser();
         if (error || !data?.user) {
            router.push("/login");
         } else {
            setEmail(data.user.email);
         }
      };
      fetchData();
   }, [router]);

   useEffect(() => {
      if (email) {
         const fetchData = async (email: string) => {
            const {valid, data, error} = await checkPlayer(email)
            if (!valid) {
               console.log(error)
               router.push('/game/initial')
            } else {
               if (data.name) {
                  router.push('/game')
               } else {
                  setUuid(data.id)
               }
            }
         };
         fetchData(email);
      }
   }, [email, checkPlayer, router]);

   useEffect(() => {
      if (confirmation){
         const fetchData = async (uuid, name) => {
            const {valid, error} = await registerName(uuid, name)
            if (!valid) {
               setError(error + "Recargue esta pagina")
            } else {
               router.push('/game')
            }
         };
         fetchData(uuid, name);
      }
   }, [confirmation, name, uuid, registerName, router]);

   useEffect(() => {
      const key = (event) => {
         if (event.key === "Enter") {
            setCount((prevCount) => prevCount + 1);
         }
      };
      document.addEventListener("keydown", key);
      return () => {
         document.removeEventListener("keydown", key);
      };
   }, []);

   useEffect(() => {
      if (count ===6 && name.length < 3) {
         setVal(true)
         setCount(5)
      }
   }, [count, name]);

   useEffect(() => {
      if (count === 7){
         setConfirmation(true)
      }
   }, [count]);

   const texts = [
      "Bienvenido a advis un juego rpg por comandos",
      "En el cual podras tomar tus propias decisiones",
      "conviertete en el mas grande de este mundo",
      "Bienvenido a Advis",
      "primero que todo cuentame un poco de ti, ¿como te llamas?"
   ];

   if (count < texts.length) {
      return (
         <div>
            <div className={styles.typewriter} key={count}>
               <div>
                  <p >{texts[count]}</p>
               </div>
            </div>
            <div>
               <div>
                  <p>Presiona Enter para continuar</p>
               </div>
            </div>
         </div>
      );
   }
   if (count === 5) {
      return (
         <div>
            <div className={styles.typewriter}>
               <div>
                  <p>¡Hola {name}!</p>
               </div>
            </div>
            <input
               type="text"
               value={name}
               onChange={(event) => setName(event.target.value)}
               autoFocus
               placeholder="Escribe tu nombre"
            />
            <div>
               <div>
                  {
                     val && <p>El nombre debe tener al menos 3 letras</p>
                  }
                  {
                     error && <p>{error}</p>
                  }
                  <p>Escribe el nombre que quieres para tu personaje (minimo 3 letras)</p>
                  <p>Presiona Enter para continuar</p>
               </div>
            </div>
         </div>
      )
   }


   if (name.length >= 3 && count === 6) {
      return (
         <div>
            <div className={styles.typewriter} key={count}>
               <div>
                  <p>¡Bienvenido {name} a este mundo, disfruta esta aventura!</p>
               </div>
            </div>
            <div>
               <div>
                  <p>Presiona Enter para continuar</p>
               </div>
            </div>
         </div>
      )
   }
}
