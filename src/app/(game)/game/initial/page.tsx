"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function GameInitialPage() {
   const [count, setCount] = useState(0);
   const [name , setName] = useState("");
   const [val, setVal] = useState(false);

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
               <div className="fixed bottom-0 w-full text-center p-4 ">
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
               <div className="fixed bottom-0 w-full text-center p-4 ">
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

   if (name.length < 3 && count === 6) {
      setVal(true)
      setCount(5)
   }
   console.log(name)
   return (
      <div>
         <h1>presiona enter</h1>
         <p>Cada vez que presionas Enter , se detecta en la consola</p>
      </div>
   );
}
