"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { createClient } from "@/utils/supabase/client";

export default function GameInitialPage() {
   const [count, setCount] = useState(0);
   const [name , setName] = useState("");
   const [val, setVal] = useState(false);
   const [email, setEmail] = useState("");
   const [uuid, setUuid] = useState("");
   const [confirmation, setConfirmation] = useState(false);
   const router = useRouter();

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
         const fetchData = async (email) => {
            const response = await fetch("/api/checkUser", {
               method: "POST",
               body: JSON.stringify({ email }),
               headers: {
                  "content-type": "application/json",
               },
            });
            const { exists, user } = await response.json();
            console.log(exists, user);
            if (exists) {
               setUuid(user.id);
            }
         };
         fetchData(email);
      }
   }, [email]);

   useEffect(() => {
      if (uuid) {
         const fetchData = async (uuid) => {
            const response = await fetch("/api/checkPlayer", {
               method: "POST",
               body: JSON.stringify({ uuid }),
               headers: {
                  "content-type": "application/json",
               },
            });
            const { exists, player } = await response.json();
            console.log(exists, player);
            if (exists) {
               router.push("/game");
            }
         };
         fetchData(uuid);
      }
   }, [uuid, router]);

   useEffect(() => {
      if (confirmation){
         const fetchData = async (uuid, name) => {
            const response = await fetch("/api/registerPlayer", {
               method: "POST",
               body: JSON.stringify({ uuid, name }),
               headers: {
                  "content-type": "application/json",
               },
            });
            const result = await response.json();
            console.log(result)
            if (result) {
               router.push("/game");
            }
         };
         fetchData(uuid, name);
      }
   }, [confirmation, name, uuid, router]);

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
         <div className="flex items-center justify-center h-screen flex-col">
            <div className={styles.typewriter} key={count}>
               <div className="text-center">
                  <p className="text-2xl">{texts[count]}</p>
               </div>
            </div>
            <div className="flex flex-col items-center mt-4">
               <div className="fixed bottom-0 w-full text-center p-4 text-unique-100">
                  <p>Presiona Enter para continuar</p>
               </div>
            </div>
         </div>
      );
   }
   if (count === 5) {
      return (
         <div className="flex items-center justify-center h-screen flex-col">
            <div className={styles.typewriter}>
               <div className="text-center">
                  <p className="text-2xl">¡Hola {name}!</p>
               </div>
            </div>
            <input
               type="text"
               value={name}
               onChange={(event) => setName(event.target.value)}
               autoFocus // Enfocar automáticamente
               className="opacity-0 absolute"
               placeholder="Escribe tu nombre"
            />
            <div className="flex flex-col items-center mt-4">
               <div className="fixed bottom-0 w-full text-center p-4 text-unique-100">
                  {
                     val && <p>El nombre debe tener al menos 3 letras</p>
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
         <div className="flex items-center justify-center h-screen flex-col">
            <div className={styles.typewriter} key={count}>
               <div className="text-center">
                  <p className="text-2xl">¡Bienvenido {name} a este mundo, disfruta esta aventura!</p>
               </div>
            </div>
            <div className="flex flex-col items-center mt-4">
               <div className="fixed bottom-0 w-full text-center p-4 text-unique-100">
                  <p>Presiona Enter para continuar</p>
               </div>
            </div>
         </div>
      )
   }
}
